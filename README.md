# Here is How to Run the Project
### PowerShell‑only commands (no Git Bash)

#### 1) One‑time backend setup

In **PowerShell**:

```powershell
cd C:\Users\niket\Documents\GitHub\Falcons-02\backend

python -m venv .venv
.\.venv\Scripts\Activate.ps1

pip install -r .\requirements.txt
```

You only need to create the `.venv` and run `pip install` once (or when dependencies change).

---

#### 2) Every time you start the project

Open **two PowerShell windows**.

- **Window 1 – Backend API**

```powershell
cd C:\Users\niket\Documents\GitHub\Falcons-02\backend
.\.venv\Scripts\Activate.ps1
python .\app.py
```

Leave this window running. Backend will be at `http://localhost:5000`.

- **Window 2 – Frontend (Vite + React)**

```powershell
cd C:\Users\niket\Documents\GitHub\Falcons-02
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173`) in your browser.

---

#### 3) Stopping things

- To stop backend or frontend: press `Ctrl + C` in that PowerShell window.
- To leave the virtualenv: type `deactivate` in the backend PowerShell window.

# 🏥 HealthHub — AI-Powered Health Management Platform

A bold, colorful, and interactive health management dashboard with AI-powered insights using Gemini. Built for both patients and doctors.

---

## 🎨 Design & Theme
- Bold, vibrant health-themed color palette (teals, purples, warm accents)
- Gradient backgrounds, smooth animations, and micro-interactions
- Card-based dashboard layout with charts and progress indicators
- Responsive design — works on desktop and mobile

---

## 📄 Pages & Features

### 1. **Landing / Dashboard**
- Welcome overview with health summary cards (upcoming appointments, active prescriptions, recent reports)
- Quick-action buttons for adding records
- Health score widget powered by AI
- Animated stats and visual indicators

### 2. **Medical Reports**
- Upload and store medical reports (PDFs, images)
- List view with filters by date, type, doctor
- **AI Report Summarizer** — Upload a report and get a plain-language AI summary via Gemini

### 3. **Medicines & Prescriptions**
- Track current medications (name, dosage, frequency, duration)
- Doctor prescription history with details
- **AI Medicine Reminder Suggestions** — Gemini suggests optimal schedules based on your prescriptions
- Visual pill tracker / adherence chart

### 4. **Doctor Appointments**
- Calendar view of upcoming and past appointments
- Add/edit appointments with doctor name, specialty, location, notes
- Status badges (upcoming, completed, cancelled)
- Reminder notifications

### 5. **Health Tracker**
- Track vitals: weight, blood pressure, heart rate, blood sugar, sleep
- Interactive charts (line/bar) showing trends over time using Recharts
- Goal setting and progress indicators

### 6. **AI Health Assistant (Chatbot)**
- Floating chat widget available on all pages
- Ask questions about symptoms, medications, health tips
- Streaming responses from Gemini for real-time interaction
- Conversation history within the session

---

## 🤖 AI Integration (Gemini 2.5 Flash)
- **Report Summarizer** — Summarize uploaded medical documents
- **Health Chatbot** — Conversational health assistant
- **Medicine Schedule Suggestions** — Smart reminders based on prescriptions
- All AI calls go through a Supabase Edge Function for security

---

## 🔧 Backend (Supabase + Lovable Cloud)
- **Database tables** for reports, medicines, prescriptions, appointments, health vitals
- **Edge Functions** for AI calls to Gemini API
- **Storage** for uploaded medical report files
- No authentication for easy hackathon demo — open access

---

## 🧭 Navigation
- Colorful sidebar with icons for each section
- Collapsible for mobile
- Active route highlighting
