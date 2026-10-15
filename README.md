# 🩺 MediLink — Smart Health Records with AI-Based Clinical Risk Detection

[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-7.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-24.20-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express-5.2-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Gemini AI](https://img.shields.io/badge/Google_Gemini-AI_Assistant-8E75C2?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)

> **MediLink** is a modern, full-stack healthcare platform engineered to digitize medical records, forecast clinical health risks using intelligent machine learning, and provide authorized emergency doctors with instantaneous, life-saving patient data when seconds count.

---

## 🌟 Key Features

### 👤 1. Patient Portal
* **Comprehensive Clinical History**: Digitize vital signs (blood pressure, heart rate, fasting glucose, hemoglobin), blood group, and pre-existing chronic conditions.
* **Smart Digital Prescriptions**: Upload prescription images with OCR processing and archival.
* **Physician-Ready PDF Export**: Generate official, downloadable clinical summary PDFs in one click.

### 🩺 2. Doctor Emergency Station
* **Instant Emergency Lookup**: Search patients by registered mobile number or Patient ID to retrieve blood group, allergies, medications, and recent vitals in under 3 seconds.
* **Clinical Triage Review**: Rapid review of high-risk conditions before emergency procedures.
* **OTP-Verified Access**: Protected access with full audit trails for legal and regulatory compliance.

### 🤖 3. AI Predictive Risk Detection
* **Clinical Multi-Factor Model**: Evaluates 11+ clinical features (systolic/diastolic BP, glucose, hemoglobin, age, disease categories, lifestyle factors).
* **Urgency Stratification**: Classifies patient status into **Routine** (Low Risk), **Soon** (Moderate Risk), and **Immediate** (Critical / Hypertensive Crisis).
* **Actionable Next Steps**: Delivers clear clinical explanations and physician consultation recommendations.

### 💬 4. 24/7 AI Health Assistant
* **Medical Guidance**: Answers queries regarding normal lab ranges, vitals interpretations, and health risk scores.
* **Emergency Symptom Triage**: Detects acute emergency symptoms (e.g. chest pain, stroke signs) and directs users to emergency care.
* **Dual-Engine Architecture**: Integrated with Google Gemini AI with a resilient, built-in offline medical knowledge base fallback.

### 🛡️ 5. Medical Administration & Governance
* **Audit Logging**: Every login, lookup, password reset, and record update is permanently recorded.
* **Role-Based Access Control (RBAC)**: Distinct permissions for Patients, Licensed Doctors, and Hospital Admins.

---

## 🏗️ System Architecture

```
                       ┌────────────────────────┐
                       │   React 19 + Vite UI   │
                       │   (Tailored Dashboards)│
                       └───────────┬────────────┘
                                   │ HTTP / JSON
                                   ▼
                       ┌────────────────────────┐
                       │   Node.js / Express    │
                       │   REST API (Port 5050) │
                       └─────┬────────────┬─────┘
                             │            │
            ┌────────────────┴──┐      ┌──┴────────────────┐
            ▼                   ▼      ▼                   ▼
    ┌───────────────┐   ┌────────────┐ ┌───────────────┐ ┌────────────────┐
    │  MongoDB      │   │  AI Risk   │ │ Google Gemini │ │   PDFKit OCR   │
    │  (In-Memory/  │   │  Engine    │ │ & Local Med   │ │   Prescription │
    │   Atlas)      │   │  (11-feat) │ │ Knowledge     │ │   Generator    │
    └───────────────┘   └────────────┘ └───────────────┘ └────────────────┘
```

---

## 💻 Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 19, TypeScript, Vite 7, Lucide Icons, React Router 7, Phone Input |
| **Backend** | Node.js 24, Express 5, Mongoose 8/9, Multer, bcryptjs, PDFKit, cors |
| **AI / ML** | JavaScript Clinical Inference Engine, Python (Scikit-Learn training script), Google GenAI SDK |
| **Database** | MongoDB (with automatic in-memory zero-setup fallback) |
| **Security** | JWT Authentication, OTP Verification, Password Hashing, Audit Trails |

---

## 🚀 Quick Start Guide

### Option A: One-Click Launch (Windows)
Double-click [`start.bat`](start.bat) in the project directory. It will automatically start:
1. Backend Server on `http://localhost:5050`
2. Frontend Vite Server on `http://localhost:5173`
3. Automatically open `http://localhost:5173` in your default browser!

---

### Option B: Manual Setup

#### 1. Prerequisites
* [Node.js](https://nodejs.org/) (v18 or higher, v24 recommended)
* `npm` (v10 or higher)

#### 2. Backend Setup
```bash
cd backend
npm install
node server.js
```
> **Note**: If `MONGO_URI` is not set in `backend/.env`, an **in-memory MongoDB** server automatically starts for zero-setup local development!

#### 3. Frontend Setup
In a new terminal window:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory (refer to [`backend/.env.example`](backend/.env.example)):

```env
# Server Port
PORT=5050

# Optional: External MongoDB Atlas Connection (if omitted, in-memory MongoDB is used)
# MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/medilink

# Optional: Google Gemini API key for advanced conversational chatbot
# GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 📁 Repository Structure

```
MediLink/
├── backend/
│   ├── data/                 # Clinical training samples (CSV & JSON)
│   ├── ml/                   # Machine learning training scripts (Python)
│   ├── models/               # Mongoose schemas (Patient, Doctor, AuditLog, Otp)
│   ├── routes/               # API route handlers (auth, patients, doctors, admin, chat)
│   ├── services/             # Health Risk Prediction Model & PDF Generator
│   ├── uploads/              # Uploaded prescription records
│   ├── .env.example          # Sample environment configuration
│   ├── package.json          # Backend dependencies
│   └── server.js             # Express application entry point
├── public/                   # Static web assets
├── src/
│   ├── components/           # Reusable UI widgets & AI ChatBot
│   ├── Data/                 # Disease classifications & medical catalogs
│   ├── lib/                  # API client configuration
│   ├── Pages/                # LandingPage, Login, Patient/Doctor/Admin Portals
│   ├── Styles/               # Modern responsive styling & design tokens
│   ├── utils/                # Validation utilities
│   ├── App.tsx               # Client routes & application shell
│   ├── index.css             # Design system & typography hierarchy
│   └── main.tsx              # React mounting root
├── index.html                # HTML entry point
├── package.json              # Frontend dependencies
├── start.bat                 # 1-Click Windows Launcher
└── vite.config.ts            # Vite configuration
```

---

## 🔒 Security & Privacy Notice

* **Emergency Safety**: In-application AI recommendations provide predictive clinical risk insights and do not replace licensed physician diagnosis.
* **Audit Trails**: All record views and modifications are permanently timestamped.

---

## 📄 License

This project is licensed under the **ISC License**.
