"""
Very small helper to send inquiry notifications via SMTP.

Configure these env vars in production:

- SMTP_HOST
- SMTP_PORT (e.g. 587)
- SMTP_USER
- SMTP_PASS
- WORK_EMAIL  (destination address)
"""

import os
import smtplib
from email.message import EmailMessage


def send_inquiry_email(payload: dict) -> None:
    host = os.getenv("SMTP_HOST")
    port = int(os.getenv("SMTP_PORT", "587"))
    user = os.getenv("SMTP_USER")
    password = os.getenv("SMTP_PASS")
    work_email = os.getenv("WORK_EMAIL","techmitrasolutions1@gmail.com")

    if not (host and user and password and work_email):
        # Email disabled; nothing to do
        return

    msg = EmailMessage()
    msg["Subject"] = f"New TechMitra Inquiry – {payload.get('service_name')}"
    msg["From"] = user
    msg["To"] = work_email

    body_lines = [
        "New inquiry received:",
        "",
        f"Service: {payload.get('service_name')}",
        f"Customer: {payload.get('customer_name')}",
        f"Phone: {payload.get('customer_phone')}",
    ]
    if payload.get("message"):
        body_lines.append(f"Notes: {payload.get('message')}")
    if payload.get("timestamp"):
        body_lines.append(f"Time (UTC): {payload.get('timestamp')}")

    msg.set_content("\n".join(body_lines))

    with smtplib.SMTP(host, port) as server:
        server.starttls()
        server.login(user, password)
        server.send_message(msg)
