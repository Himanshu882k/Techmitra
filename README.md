# TechMitra Solutions – Production Setup

This folder contains a **production-ready** setup for TechMitra Solutions:

- A Flask + SQLAlchemy backend (with SQLite + email notifications + JWT admin auth)
- A React + TypeScript + Vite + Tailwind frontend

The recommended structure for the GitHub repository is:

- Use the `backend/` folder as the **Render Web Service root**
- Use the `frontend/` folder only for local UI development; build output can be copied into `backend/static/`

---

## 1. Backend (Flask)

### Local setup

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env  # then edit values
python app.py
```

The API will run on `http://localhost:5000`.

### Important endpoints

- `GET /api/health` – health check
- `POST /api/inquiries` – public endpoint to create a new inquiry
- `POST /api/admin/login` – admin login (check `ADMIN_PASSWORD` in `.env`)
- `GET /api/admin/inquiries` – list all inquiries (requires Bearer token)
- `PATCH /api/admin/inquiries/<id>` – update inquiry status

### Database

By default this uses:

```text
DATABASE_URL=sqlite:///data.db
```

So a local file `data.db` will be created in `backend/`. You can point this to PostgreSQL in production.

### Email

Configure these in `.env`:

```text
SMTP_HOST=...
SMTP_PORT=587
SMTP_USER=...
SMTP_PASS=...
WORK_EMAIL=techmitrasolutions1@gmail.com
```

If they are missing, the backend will silently **skip** email sending, but still save inquiries.

### Render deployment

Create a **Web Service** on Render and connect the repo.

- **Root directory**: `backend`
- **Build command**: `pip install -r requirements.txt`
- **Start command**: `gunicorn app:app`
- **Environment**:
  - `PYTHON_VERSION=3.12.0` (or use the `runtime.txt` already included)
  - All `.env` variables from `.env.example`

To serve the React app, make sure a production build exists in `backend/static/` (see section below).

---

## 2. Frontend (React + Vite + Tailwind)

### Local development

```bash
cd frontend
npm install
npm run dev
```

The app will run on `http://localhost:5173` by default (Vite).

The frontend expects the backend at `http://localhost:5000`. You can change the base URL in `frontend/src/services/storageService.ts` if needed.

### Build for production

```bash
cd frontend
npm run build
```

This creates `frontend/dist/`.

Copy the contents into the backend:

```bash
# from the repo root:
cp -r frontend/dist/* backend/static/
```

Now the Flask backend can serve the compiled React app from `/`.

---

## 3. Repository structure

- `backend/`
  - `app.py` – Flask app + API + static serving
  - `models.py` – SQLAlchemy models
  - `emailer.py` – SMTP email helper
  - `requirements.txt`
  - `runtime.txt`
  - `.env.example`
  - `static/` – **(created by you)** – compiled frontend build

- `frontend/`
  - `index.html`
  - `package.json`
  - `tsconfig.json`
  - `vite.config.ts`
  - `postcss.config.cjs`
  - `tailwind.config.js`
  - `src/` – React + TS source code

---

You can now initialize a new GitHub repository in this folder and deploy the backend folder to Render.
