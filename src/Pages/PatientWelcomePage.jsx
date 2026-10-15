import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HeartPulse,
  User,
  Activity,
  FileText,
  ShieldCheck,
  LogOut,
  ChevronRight,
  Sparkles,
  Calendar,
  AlertCircle,
  FileDown
} from "lucide-react";
import "../Styles/PatientWelcome.css";

const PatientWelcomePage = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const storedPatient = localStorage.getItem("patientData");
    try {
      if (storedPatient && storedPatient !== "undefined") {
        const parsed = JSON.parse(storedPatient);
        setPatientData(parsed);
        if (parsed?.name?.trim()) {
          setUserName(parsed.name.trim());
        }
      }
    } catch (e) {
      console.error("Error parsing patient data", e);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("patientToken");
    localStorage.removeItem("patientId");
    localStorage.removeItem("patientData");
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
          <div className="dash-brand" onClick={() => navigate("/patient-welcome")}>
            <div className="dash-brand-icon">
              <HeartPulse size={22} />
            </div>
            <span className="dash-brand-name">
              Medi<span className="brand-accent">link</span>
            </span>
            <span className="dash-role-badge">Patient Portal</span>
          </div>

          <div className="dash-nav-actions">
            <button
              className="dash-nav-link"
              onClick={() => navigate("/patientdetails")}
            >
              <FileText size={16} />
              <span>My Records</span>
            </button>
            <button
              className="dash-nav-link"
              onClick={() => navigate("/patient-health-risk")}
            >
              <Activity size={16} />
              <span>AI Health Risk</span>
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
        <section className="dash-hero-banner">
          <div className="banner-left">
            <div className="banner-date">
              <Calendar size={14} />
              <span>{currentDate}</span>
            </div>
            <h1 className="banner-title">
              Hello, <span className="banner-highlight">{userName}</span> 👋
            </h1>
            <p className="banner-desc">
              Welcome to your personal Medilink dashboard. Your clinical records are encrypted, 
              synced with authorized doctors, and continuously monitored by AI predictive models.
            </p>

            <div className="banner-chips">
              <div className="banner-chip">
                <ShieldCheck size={14} className="chip-icon--success" />
                <span>Verified Patient Account</span>
              </div>
              <div className="banner-chip">
                <Sparkles size={14} className="chip-icon--primary" />
                <span>AI Clinical Monitoring Active</span>
              </div>
            </div>
          </div>

          <div className="banner-right">
            <div className="profile-quick-card">
              <div className="profile-avatar">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="profile-info">
                <div className="profile-name">{userName}</div>
                <div className="profile-meta">
                  {patientData?.gender || "Patient"} {patientData?.age ? `• ${patientData.age} Yrs` : ""}
                </div>
                {patientData?.bloodGroup && (
                  <div className="profile-blood-tag">Blood Group: {patientData.bloodGroup}</div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Quick Action Grid */}
        <section className="dash-section">
          <h2 className="dash-section-title">Quick Actions & Health Tools</h2>
          <div className="dash-action-grid">
            {/* Action 1: Records */}
            <div
              className="action-card"
              onClick={() => navigate("/patientdetails")}
            >
              <div className="action-card-header">
                <div className="action-icon-box action-icon-box--primary">
                  <FileText size={24} />
                </div>
                <ChevronRight size={18} className="action-arrow" />
              </div>
              <h3 className="action-title">My Medical Records</h3>
              <p className="action-desc">
                Review your complete clinical profile, vitals history, pre-existing conditions, and registered medications.
              </p>
              <div className="action-footer">
                <span>View Full Record</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Action 2: AI Health Risk */}
            <div
              className="action-card action-card--featured"
              onClick={() => navigate("/patient-health-risk")}
            >
              <div className="action-card-header">
                <div className="action-icon-box action-icon-box--ai">
                  <Activity size={24} />
                </div>
                <div className="featured-badge">AI Powered</div>
              </div>
              <h3 className="action-title">AI Health Risk Analysis</h3>
              <p className="action-desc">
                Run automated predictive algorithms over your vitals to identify cardiovascular, glucose, and hypertension risks early.
              </p>
              <div className="action-footer">
                <span>Check Risk Status</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Action 3: Prescriptions */}
            <div
              className="action-card"
              onClick={() => navigate("/patientdetails")}
            >
              <div className="action-card-header">
                <div className="action-icon-box action-icon-box--success">
                  <FileDown size={24} />
                </div>
                <ChevronRight size={18} className="action-arrow" />
              </div>
              <h3 className="action-title">Download PDF Summary</h3>
              <p className="action-desc">
                Generate an official, physician-ready PDF summary of your health records to share with specialists or clinics.
              </p>
              <div className="action-footer">
                <span>Open Export Center</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </section>

        {/* Health Advisory & Emergency Card */}
        <section className="dash-bottom-grid">
          <div className="advisory-card">
            <div className="advisory-icon-box">
              <Sparkles size={20} />
            </div>
            <div>
              <h4 className="advisory-title">24/7 AI Medical Assistant Available</h4>
              <p className="advisory-desc">
                Have questions about your blood pressure readings, diet, or symptoms? Click the chat bubble in the bottom right corner anytime to consult your personal AI health guide.
              </p>
            </div>
          </div>

          <div className="emergency-notice-card">
            <div className="emergency-icon-box">
              <AlertCircle size={20} />
            </div>
            <div>
              <h4 className="emergency-title">Emergency Preparedness</h4>
              <p className="emergency-desc">
                In a critical situation, authorized emergency medical teams can retrieve your allergy list and blood type immediately via your phone number.
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="dash-footer">
        <div className="dash-footer-container">
          <span>© {new Date().getFullYear()} Medilink Healthcare. All rights reserved.</span>
          <span>Encrypted Patient Portal • HIPAA & Privacy Compliant</span>
        </div>
      </footer>
    </div>
  );
};

export default PatientWelcomePage;
