# AgriSense

> **AgriSense (a.k.a. GreenLens)** — an integrated agriculture assistant combining AI-powered plant disease detection, market price insights & forecasts, soil analysis, a task manager, and a voice/text chat assistant for farmers.

> **Short**: Frontend is a Vite + React + TypeScript app. Backend is a FastAPI service using TensorFlow for image-based plant disease detection and a chat endpoint that forwards to an LLM provider. The frontend persists user tasks to Supabase and handles authentication via Supabase Auth.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Repository layout](#repository-layout)
- [Quick start (local development)](#quick-start-local-development)
  - [Backend setup (FastAPI + TensorFlow)](#backend-setup-fastapi--tensorflow)
  - [Frontend setup (Vite + React + Supabase)](#frontend-setup-vite--react--supabase)
  - [Supabase DB setup (Tasks table)](#supabase-db-setup-tasks-table)
- [API reference](#api-reference)
- [Important notes & security](#important-notes--security)
- [Recommended improvements & roadmap](#recommended-improvements--roadmap)
- [Troubleshooting / FAQ](#troubleshooting--faq)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **Plant disease detection**: Upload a leaf image and receive predicted disease class + confidence and treatment suggestions.
- **Crop price board & forecasting UI**: Historical price charts and a short forecast example (client-side sample data).
- **Soil analysis UI**: N-P-K sliders and automated fertilizer recommendations (UI logic).
- **Task manager**: User-specific tasks stored in Supabase (create, update status, delete, filter, simple stats).
- **KrishiMitra chat**: Voice-enabled chat widget with speech-to-text and text-to-speech that calls the backend LLM endpoint.
- **Authentication**: Supabase Auth for sign-up / sign-in and per-user task data.

---

## Tech stack

- **Frontend**: React + TypeScript (Vite starter), Tailwind CSS, Framer Motion, Recharts, Lucide icons, Supabase JS client.
- **Backend**: FastAPI (Python) serving two primary endpoints: `/predict` (image) and `/chat` (LLM proxy). Uses TensorFlow for the model.
- **Database / Auth**: Supabase (Postgres + Auth) for user accounts and the `tasks` table.
- **Model**: A TensorFlow Keras model expected in the backend (e.g. `trained_model.h5` or similar).

---

## Repository layout (high level)

```
AgriSense/
├─ frontend/          # Vite + React + TypeScript frontend
│  ├─ src/components/ # All UI components (DiseaseDetection, CropPrices, SoilAnalysis, TaskManager, KrishiMitra, etc.)
│  ├─ src/lib/        # supabase client wrapper (reads env vars)
│  └─ package.json
├─ backend/           # FastAPI app, model & dependencies
│  ├─ main.py         # API endpoints and model loading
│  └─ requirements.txt
├─ LICENSE            # MIT
└─ .gitattributes
```

(See `frontend/package.json` and `backend/main.py` for exact dependencies and endpoints.)

---

## Quick start (local development)

> The following steps assume you are developing locally. Use a separate terminal/window for frontend and backend.

### Prerequisites

- Node >= 18 (or compatible) and npm / pnpm / yarn for the frontend.
- Python 3.8–3.10 recommended (TensorFlow 2.10 is pinned in `backend/requirements.txt`).
- Git to clone the repo.
- Optional: Supabase account (free tier) to provision auth and the tasks table.

### 1) Clone the repo

```bash
git clone https://github.com/manojmalipatil/AgriSense.git
cd AgriSense
```

### 2) Backend setup (FastAPI + TensorFlow)

1. Create a Python virtual environment and activate it:

```bash
python -m venv .venv
source .venv/bin/activate   # Linux / macOS
.venv\Scripts\activate     # Windows (PowerShell)
```

2. Install dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Place the trained TensorFlow model file in the `backend/` folder and name it `trained_model.h5` (or update the path inside `main.py` where the model is loaded).

> Note: the repository uses `tf.keras.models.load_model('trained_model.h5')` at startup — make sure the filename/path matches.

4. Create a `.env` (recommended) for backend sensitive values. Example `.env` keys your backend may expect:

```
GROQ_API_KEY=your_llm_provider_key_here
MODEL_PATH=trained_model.h5   # optional if you change the path in code
```

5. Run the backend (development):

```bash
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

The API should be available at `http://localhost:8000/`.

### 3) Frontend setup (Vite + React + Supabase)

1. Copy environment variables for Supabase into `frontend/.env` (Vite expects `VITE_` prefix):

```
VITE_SUPABASE_URL=https://your-supabase-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

2. Install and run the frontend:

```bash
cd frontend
npm install
npm run dev
```

Open the dev URL printed by Vite (usually `http://localhost:5173/`).

> The frontend expects the backend at `http://localhost:8000/` for:
>
> - image analysis: POST to `/predict` (multipart/form-data with `file` field)
> - chat: POST to `/chat` with JSON `{"message":"..."}`

---

## Supabase DB setup (Tasks table)

The TaskManager uses a Supabase table named `tasks`. Example SQL to create a compatible table in your Supabase project:

```sql
create table public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  title text not null,
  description text,
  priority text default 'medium',
  status text default 'pending',
  due_date date,
  category text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- index for faster user lookups
create index on public.tasks (user_id);
```

Also configure Row Level Security (RLS) policies so users can only read/write their own tasks (Supabase docs provide examples).

---

## API reference (short)

### `GET /` — health

Returns a small JSON message confirming the backend is up.

### `POST /predict` — image upload

- **Content-type**: `multipart/form-data`
- **Form field**: `file` — the image file

**Response**:

```json
{ "class": "Tomato___Early_blight", "confidence": 0.87 }
```

**Sample curl**:

```bash
curl -X POST -F "file=@/path/to/leaf.jpg" http://localhost:8000/predict
```

### `POST /chat` — LLM proxy (KrishiMitra)

- **Content-type**: `application/json`
- **Body**: `{ "message": "How do I treat blight?" }`

**Response**:

```json
{ "reply": "Short, helpful answer from the LLM" }
```

**Sample curl**:

```bash
curl -X POST -H "Content-Type: application/json" -d '{"message":"hello"}' http://localhost:8000/chat
```

---

## Important notes & security

- **Sensitive keys**: Your backend should load any third-party API keys (LLM provider keys) from environment variables — do NOT commit them. There is a default API key placeholder in the backend code; ensure you rotate & remove any embedded secrets.

- **Model binary**: Large Keras/TensorFlow weights should either be stored via Git LFS or hosted externally (S3, Google Cloud Storage) and downloaded in CI / at runtime. Do not commit very large binary files to git unless using LFS.

- **CORS**: The backend currently allows `*` for CORS in dev — restrict this in production to your frontend origin.

- **Input validation & rate limiting**: Validate uploads and add rate limiting in production to avoid abuse.

- **Deployment tip**: Serving TensorFlow models in a production environment should consider model server runtimes (TF Serving, Triton, TorchServe) or containerized GPU instances depending on throughput and latency requirements.

---

## Recommended improvements & roadmap

- Move the LLM provider key from code to an env var and implement server-side rate limiting.
- Add Docker & docker-compose files to simplify local dev (create a `docker-compose` with backend, frontend and a simple Postgres/Supabase emulator or instructions to use Supabase cloud).
- Add Git LFS or external hosting for the TF model; include a script to download the model during deployment.
- Implement proper RLS policies for the `tasks` table and add migration scripts.
- Add unit/integration tests for backend endpoints and frontend components.
- Add CI (GitHub Actions) to lint, run tests, and build a production frontend bundle.
- Add monitoring/metrics and authentication for the `/chat` endpoint (so it cannot be abused via the LLM key).

---

## Troubleshooting & FAQ

**Q:** `model not found` at backend startup

**A:** Ensure the model file exists in `backend/` and that the filename matches the path used in `main.py`. If your model is large, prefer storing it in S3 and download it during container start.

**Q:** Supabase errors while fetching tasks

**A:** Make sure `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are correct and that the `tasks` table exists and the authenticated user has permission to query/insert rows.

**Q:** Browser CORS errors when calling `http://localhost:8000` from the frontend

**A:** Confirm backend is running at port `8000` and CORS is enabled in backend. In production, tighten allowed origins instead of `*`.

---

## Contributing

Contributions are welcome! Please open issues or PRs for bug fixes and feature requests. Use descriptive PR titles and include screenshots/tests where possible.

A suggested contribution workflow:

1. Fork the repo
2. Create a descriptive branch `feature/<short-description>`
3. Implement changes and add tests
4. PR to `main` with a clear description

---

## License

This project is licensed under the **MIT License** — see the `LICENSE` file.

---

*If you want, I can also:*

- add a `docker-compose.yml` and `Dockerfile` for the backend + frontend
- create a small GitHub Action that builds the frontend and runs a linter
- generate the SQL & Supabase RLS policy files and include a `supabase` folder

---

*Generated by ChatGPT after analyzing the repository structure and key files.*

