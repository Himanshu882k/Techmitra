import os
import uuid
import datetime as dt

from dotenv import load_dotenv
from flask import Flask, jsonify, request, send_from_directory
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, scoped_session

from models import Base, Inquiry, InquiryStatus
from emailer import send_inquiry_email

load_dotenv()

# -----------------------------------------------------------------------------
# Config
# -----------------------------------------------------------------------------
JWT_SECRET = os.getenv("JWT_SECRET") or os.getenv("FLASK_SECRET_KEY") or "CHANGE_ME"
JWT_EXP_SECONDS = int(os.getenv("JWT_EXP_SECONDS", "86400"))
ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
DATABASE_URL = os.getenv("DATABASE_URL")

app = Flask(__name__, static_folder="static", static_url_path="")
CORS(app)

# -----------------------------------------------------------------------------
# DB setup
# -----------------------------------------------------------------------------
engine = create_engine(DATABASE_URL)

SessionLocal = scoped_session(sessionmaker(bind=engine))
Base.metadata.create_all(bind=engine)


def create_token():
    import jwt

    payload = {
        "iat": dt.datetime.utcnow(),
        "exp": dt.datetime.utcnow() + dt.timedelta(seconds=JWT_EXP_SECONDS),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")


def verify_token(token: str) -> bool:
    import jwt

    try:
        jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return True
    except Exception:
        return False


def require_auth():
    auth = request.headers.get("Authorization", "")
    if not auth.startswith("Bearer "):
        return False
    token = auth.split(" ", 1)[1]
    return verify_token(token)


# -----------------------------------------------------------------------------
# Public endpoints
# -----------------------------------------------------------------------------
@app.route("/api/health", methods=["GET"])
def health():
    return jsonify({"ok": True, "service": "techmitra-backend"})


@app.route("/api/inquiries", methods=["POST"])
def create_inquiry():
    data = request.json or {}

    name = (data.get("name") or "").strip()
    phone = (data.get("phone") or "").strip()
    service_name = (data.get("serviceName") or data.get("service_name") or "").strip()
    notes = (data.get("notes") or data.get("message") or "") or None

    if not (name and phone and service_name):
        return jsonify({"ok": False, "message": "Missing required fields"}), 400

    if len(phone) < 10:
        return jsonify({"ok": False, "message": "Invalid phone number"}), 400

    db = SessionLocal()
    try:
        new_id = str(uuid.uuid4())
        inquiry = Inquiry(
            id=new_id,
            service_name=service_name,
            customer_name=name,
            customer_phone=phone,
            message=notes,
            timestamp=dt.datetime.utcnow(),
            status=InquiryStatus.pending,
        )
        db.add(inquiry)
        db.commit()

        # fire-and-forget email
        try:
            send_inquiry_email(
                {
                    "id": new_id,
                    "service_name": service_name,
                    "customer_name": name,
                    "customer_phone": phone,
                    "message": notes,
                    "timestamp": inquiry.timestamp.isoformat(),
                }
            )
        except Exception as e:
            # Do not fail the request if email fails
            app.logger.warning(f"Email sending failed: {e}")

        return jsonify({"ok": True, "id": new_id})
    except Exception as e:
        db.rollback()
        app.logger.exception("Error while creating inquiry")
        return jsonify({"ok": False, "message": "Internal server error"}), 500
    finally:
        db.close()


# -----------------------------------------------------------------------------
# Admin endpoints
# -----------------------------------------------------------------------------
@app.route("/api/admin/login", methods=["POST"])
def admin_login():
    data = request.json or {}
    password = (data.get("password") or "").strip()
    if password != ADMIN_PASSWORD:
        return jsonify({"ok": False, "message": "Invalid credentials"}), 401
    token = create_token()
    return jsonify({"ok": True, "token": token})


@app.route("/api/admin/inquiries", methods=["GET"])
def admin_list_inquiries():
    if not require_auth():
        return jsonify({"ok": False, "message": "Unauthorized"}), 401

    db = SessionLocal()
    try:
        items = db.query(Inquiry).order_by(Inquiry.timestamp.desc()).all()
        result = []
        for i in items:
            result.append(
                {
                    "id": i.id,
                    "service_name": i.service_name,
                    "customer_name": i.customer_name,
                    "customer_phone": i.customer_phone,
                    "message": i.message,
                    "timestamp": i.timestamp.isoformat(),
                    "status": i.status.value,
                }
            )
        return jsonify({"ok": True, "inquiries": result})
    finally:
        db.close()


@app.route("/api/admin/inquiries/<inq_id>", methods=["PATCH"])
def admin_update_status(inq_id: str):
    if not require_auth():
        return jsonify({"ok": False, "message": "Unauthorized"}), 401

    data = request.json or {}
    new_status = data.get("status")
    if new_status not in [s.value for s in InquiryStatus]:
        return jsonify({"ok": False, "message": "Invalid status"}), 400

    db = SessionLocal()
    try:
        inquiry = db.query(Inquiry).filter(Inquiry.id == inq_id).first()
        if not inquiry:
            return jsonify({"ok": False, "message": "Inquiry not found"}), 404
        inquiry.status = InquiryStatus(new_status)
        db.commit()
        return jsonify({"ok": True})
    finally:
        db.close()


# -----------------------------------------------------------------------------
# Static frontend
# -----------------------------------------------------------------------------
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path: str):
    """
    Serve the built React app from ./static.

    Build command from the frontend folder (once):
        npm install
        npm run build
    Then copy dist/* into backend/static/.
    """
    if path and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)

    index_path = os.path.join(app.static_folder, "index.html")
    if os.path.exists(index_path):
        return send_from_directory(app.static_folder, "index.html")

    # Fallback if static build is missing
    return jsonify(
        {
            "ok": True,
            "message": "Backend running. Static frontend not found in ./static.",
        }
    )


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5000"))
    app.run(host="0.0.0.0", port=port, debug=os.getenv("FLASK_ENV") != "production")
