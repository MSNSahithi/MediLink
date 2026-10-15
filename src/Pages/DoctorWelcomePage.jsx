import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  Stethoscope,
  Search,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Sparkles,
  Calendar,
  AlertCircle,
  Users,
  Clock
} from "lucide-react";
import "../Styles/PatientWelcome.css";

const DoctorWelcomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("Doctor");
  const [doctorData, setDoctorData] = useState(null);

  useEffect(() => {
    const storedDoctor = localStorage.getItem("doctorData");
    try {
      if (storedDoctor && storedDoctor !== "undefined") {
        const parsed = JSON.parse(storedDoctor);
        setDoctorData(parsed);
        if (parsed?.name?.trim()) {
          setUserName(parsed.name.trim());
        }
      }
    } catch {
      setUserName("Doctor");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("doctorToken");
    localStorage.removeItem("doctorId");
    localStorage.removeItem("doctorData");
    localStorage.removeItem("role");
    navigate("/");
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="dash-wrapper">
      {/* Top Navbar */}
      <header className="dash-navbar">
        <div className="dash-nav-container">
          <div className="dash-brand" onClick={() => navigate("/doctor-welcome")}>
            <div className="dash-brand-icon dash-brand-icon--doctor">
              <Stethoscope size={22} />
            </div>
            <span className="dash-brand-name">
              Medi<span className="brand-accent">link</span>
            </span>
            <span className="dash-role-badge dash-role-badge--doctor">Doctor Portal</span>
          </div>

          <div className="dash-nav-actions">
            <button
              className="dash-nav-link"
              onClick={() => navigate("/doctor/patient-details")}
            >
              <Search size={16} />
              <span>Lookup Patient</span>
            </button>
            <button className="dash-logout-btn" onClick={handleLogout}>
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dash-main">
        {/* Hero Greeting Banner */}
        <section className="dash-hero-banner dash-hero-banner--doctor">
          <div className="banner-left">
            <div className="banner-date">
              <Calendar size={14} />
              <span>{currentDate}</span>
            </div>
            <h1 className="banner-title">
              Welcome, Dr. <span className="banner-highlight">{userName}</span> 🩺
            </h1>
            <p className="banner-desc">
              Your clinical workspace for emergency record lookups, prescription analysis, 
              and AI-driven health risk assessment for triage and care planning.
            </p>

            <div className="banner-chips">
              <div className="banner-chip">
                <ShieldCheck size={14} className="chip-icon--success" />
                <span>Licensed Healthcare Provider</span>
              </div>
              {doctorData?.hospital && (
                <div className="banner-chip">
                  <HeartPulse size={14} className="chip-icon--primary" />
                  <span>{doctorData.hospital}</span>
                </div>
              )}
            </div>
          </div>

          <div className="banner-right">
            <div className="profile-quick-card">
              <div className="profile-avatar profile-avatar--doctor">
                Dr
              </div>
              <div className="profile-info">
                <div className="profile-name">Dr. {userName}</div>
                <div className="profile-meta">
                  {doctorData?.hospital || "Hospital Staff"}
                </div>
                {doctorData?.doctorId && (
                  <div className="profile-blood-tag">Doctor ID: {doctorData.doctorId}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Doctor Action Grid */}
        <section className="dash-section">
          <h2 className="dash-section-title">Clinical Workspace Actions</h2>
          <div className="dash-action-grid">
            {/* Action 1: Search Patient */}
            <div
              className="action-card action-card--featured"
              onClick={() => navigate("/doctor/patient-details")}
            >
              <div className="action-card-header">
                <div className="action-icon-box action-icon-box--primary">
                  <Search size={24} />
                </div>
                <div className="featured-badge">Primary Workflow</div>
              </div>
              <h3 className="action-title">Search & Lookup Patient</h3>
              <p className="action-desc">
                Find patient medical profiles instantly by Mobile Number or Patient ID to access allergies, vitals, and surgical history.
              </p>
              <div className="action-footer">
                <span>Start Patient Lookup</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Action 2: Emergency Access */}
            <div
              className="action-card"
              onClick={() => navigate("/doctor/patient-details")}
            >
              <div className="action-card-header">
                <div className="action-icon-box action-icon-box--ai">
                  <AlertCircle size={24} />
                </div>
                <ChevronRight size={18} className="action-arrow" />
              </div>
              <h3 className="action-title">Emergency ER Fast Track</h3>
              <p className="action-desc">
                Access critical emergency details with one-time verification during urgent care triage and trauma admissions.
              </p>
              <div className="action-footer">
                <span>Emergency Access</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Action 3: AI Clinical Insights */}
            <div
              className="action-card"
              onClick={() => navigate("/doctor/patient-details")}
            >
              <div className="action-card-header">
                <div className="action-icon-box action-icon-box--success">
                  <FileText size={24} />
                </div>
                <ChevronRight size={18} className="action-arrow" />
              </div>
              <h3 className="action-title">Clinical PDF Summaries</h3>
              <p className="action-desc">
                Review machine-generated diagnostic reports, risk indicators, and prescriptions with downloadable summary sheets.
              </p>
              <div className="action-footer">
                <span>Open Summaries</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* Clinical Protocol Information */}
        <section className="dash-bottom-grid">
          <div className="advisory-card">
            <div className="advisory-icon-box">
              <ShieldCheck size={20} />
            </div>
            <div>
              <h4 className="advisory-title">Audited Medical Lookups</h4>
              <p className="advisory-desc">
                Every patient lookup performed under your credentials is logged for medical safety and legal compliance. Only access files for patients under active consultation.
              </p>
            </div>
          </div>

          <div className="emergency-notice-card">
            <div className="emergency-icon-box">
              <Clock size={20} />
            </div>
            <div>
              <h4 className="emergency-title">Real-Time Risk Triage</h4>
              <p className="emergency-desc">
                Patients flagged with "Immediate" or "Hypertensive Crisis" require immediate blood pressure and vitals stabilization prior to discharge.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dash-footer">
        <div className="dash-footer-container">
          <span>© {new Date().getFullYear()} Medilink Healthcare Systems. Doctor Station v2.0</span>
          <span>Verified Clinical Environment • Audited & Protected</span>
        </div>
      </footer>
    </div>
  );
};

export default DoctorWelcomePage;
