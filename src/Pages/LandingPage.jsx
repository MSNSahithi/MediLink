import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Activity,
  ShieldCheck,
  HeartPulse,
  FileText,
  Lock,
  Stethoscope,
  UserCheck,
  Zap,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  QrCode
} from "lucide-react";
import "../Styles/LandingPage.css";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-wrapper">
      {/* ===== NAVBAR ===== */}
      <nav className="landing-nav">
        <div className="nav-container">
          <div className="nav-brand" onClick={() => navigate("/")}>
            <div className="brand-icon-wrapper">
              <HeartPulse className="brand-icon" size={24} />
            </div>
            <span className="brand-name">
              Medi<span className="brand-accent">link</span>
            </span>
          </div>

          <div className="nav-links">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#portals" className="nav-link">Portals</a>
            <span 
              className="nav-link nav-link--admin"
              onClick={() => navigate("/admin/login")}
            >
              Admin
            </span>
          </div>

          <div className="nav-actions">
            <button
              className="btn btn--outline"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
            <button
              className="btn btn--primary"
              onClick={() => navigate("/login")}
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <Sparkles size={14} className="hero-badge-icon" />
              <span>Next-Gen Healthcare Intelligence</span>
            </div>

            <h1 className="hero-title">
              Smart Health Records with <br />
              <span className="hero-title-gradient">AI-Based Clinical Risk</span> Detection
            </h1>

            <p className="hero-subtitle">
              A secure, full-stack healthcare ecosystem that stores medical records digitally, 
              forecasts health risks using intelligent machine learning, and gives authorized doctors 
              instant life-saving access during critical emergencies.
            </p>

            <div className="hero-cta-group">
              <button
                className="btn btn--primary btn--lg"
                onClick={() => navigate("/login")}
              >
                <span>Enter Patient Portal</span>
                <ArrowRight size={18} />
              </button>

              <button
                className="btn btn--secondary btn--lg"
                onClick={() => navigate("/login")}
              >
                <Stethoscope size={18} />
                <span>Doctor Portal</span>
              </button>
            </div>

            {/* Trust badges */}
            <div className="hero-trust-bar">
              <div className="trust-item">
                <CheckCircle2 size={16} className="trust-icon" />
                <span>End-to-End Encrypted</span>
              </div>
              <div className="trust-item">
                <Zap size={16} className="trust-icon" />
                <span>Instant Emergency Lookup</span>
              </div>
              <div className="trust-item">
                <Activity size={16} className="trust-icon" />
                <span>AI Clinical Scoring</span>
              </div>
            </div>
          </div>

          {/* Interactive Floating Preview Card */}
          <div className="hero-preview">
            <div className="preview-glow"></div>
            <div className="preview-card">
              <div className="preview-header">
                <div className="preview-patient">
                  <div className="patient-avatar">SJ</div>
                  <div>
                    <div className="patient-name">Sarah Jenkins</div>
                    <div className="patient-meta">Female • 48 Yrs • Blood: O+</div>
                  </div>
                </div>
                <div className="preview-status-pill">
                  <span className="status-dot"></span>
                  Active Record
                </div>
              </div>

              <div className="preview-vitals-grid">
                <div className="vital-box">
                  <div className="vital-label">Blood Pressure</div>
                  <div className="vital-value">118 / 78 <span className="vital-unit">mmHg</span></div>
                  <div className="vital-badge vital-badge--good">Optimal</div>
                </div>
                <div className="vital-box">
                  <div className="vital-label">Heart Rate</div>
                  <div className="vital-value">72 <span className="vital-unit">BPM</span></div>
                  <div className="vital-badge vital-badge--good">Normal</div>
                </div>
                <div className="vital-box">
                  <div className="vital-label">Blood Sugar</div>
                  <div className="vital-value">94 <span className="vital-unit">mg/dL</span></div>
                  <div className="vital-badge vital-badge--good">Healthy</div>
                </div>
                <div className="vital-box">
                  <div className="vital-label">Hemoglobin</div>
                  <div className="vital-value">13.8 <span className="vital-unit">g/dL</span></div>
                  <div className="vital-badge vital-badge--good">Normal</div>
                </div>
              </div>

              {/* AI Risk Score Mockup */}
              <div className="preview-ai-box">
                <div className="ai-box-top">
                  <div className="ai-box-title">
                    <Activity size={18} className="ai-icon" />
                    <span>AI Health Risk Forecast</span>
                  </div>
                  <span className="ai-risk-tag ai-risk-tag--routine">
                    Routine • Low Risk
                  </span>
                </div>
                <p className="ai-box-desc">
                  Algorithm evaluated 11 clinical features. Vitals and disease history indicate stable cardiovascular profile.
                </p>
                <div className="ai-progress-track">
                  <div className="ai-progress-fill" style={{ width: "24%" }}></div>
                </div>
              </div>

              {/* Quick Action Footer inside Card */}
              <div className="preview-footer">
                <div className="qr-badge">
                  <QrCode size={16} />
                  <span>Emergency Pass: Verified</span>
                </div>
                <div className="preview-timestamp">Updated Just Now</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">100%</div>
            <div className="stat-label">Paperless Digital Records</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">11+</div>
            <div className="stat-label">Clinical Features Analyzed</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">&lt; 3s</div>
            <div className="stat-label">Emergency Record Retrieval</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">24/7</div>
            <div className="stat-label">AI Health Assistant Access</div>
          </div>
        </div>
      </section>

      {/* ===== KEY FEATURES ===== */}
      <section id="features" className="features-section">
        <div className="section-header">
          <div className="section-badge">Platform Capabilities</div>
          <h2 className="section-title">Designed for Fast, Accurate Healthcare</h2>
          <p className="section-subtitle">
            Medilink bridges patients, doctors, and hospitals with cutting-edge digital infrastructure and intelligence.
          </p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon--primary">
              <Activity size={24} />
            </div>
            <h3 className="feature-title">AI Predictive Risk Detection</h3>
            <p className="feature-desc">
              Analyzes glucose, blood pressure, lifestyle factors, and history using an advanced diagnostic model to alert on potential health hazards before they become emergencies.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon--accent">
              <Zap size={24} />
            </div>
            <h3 className="feature-title">Emergency Doctor Access</h3>
            <p className="feature-desc">
              When seconds count, authorized ER doctors can instantly lookup vital patient details, allergies, and blood group using secure OTP or registered credentials.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon--success">
              <FileText size={24} />
            </div>
            <h3 className="feature-title">Smart Digital Prescriptions</h3>
            <p className="feature-desc">
              Store, scan, and manage prescription records with OCR technology and generate one-click clinical PDF summaries for specialist consultations.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon-wrapper feature-icon--security">
              <Lock size={24} />
            </div>
            <h3 className="feature-title">Enterprise-Grade Security</h3>
            <p className="feature-desc">
              Role-based access control with JWT authentication, encrypted medical storage, and complete audit logging for regulatory compliance and patient privacy.
            </p>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section id="how-it-works" className="how-section">
        <div className="section-header">
          <div className="section-badge">Simple 3-Step Process</div>
          <h2 className="section-title">How Medilink Works</h2>
          <p className="section-subtitle">
            A frictionless workflow designed for both patients and healthcare professionals.
          </p>
        </div>

        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3 className="step-title">Create Health Profile</h3>
            <p className="step-desc">
              Patients securely sign up and record their medical history, current vitals, and upload previous prescriptions.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">02</div>
            <h3 className="step-title">AI Analyzes & Forecasts</h3>
            <p className="step-desc">
              The AI engine assesses your data against clinical risk models to produce urgency scores and proactive health tips.
            </p>
          </div>

          <div className="step-card">
            <div className="step-number">03</div>
            <h3 className="step-title">Instant Doctor Access</h3>
            <p className="step-desc">
              During hospital visits or emergencies, licensed doctors access your verified records instantly with full audit trails.
            </p>
          </div>
        </div>
      </section>

      {/* ===== PORTALS / WHO IS IT FOR ===== */}
      <section id="portals" className="portals-section">
        <div className="section-header">
          <div className="section-badge">Dedicated Portals</div>
          <h2 className="section-title">Built for Everyone in the Care Chain</h2>
        </div>

        <div className="portals-grid">
          <div className="portal-card">
            <div className="portal-icon">
              <UserCheck size={32} />
            </div>
            <h3 className="portal-title">Patient Portal</h3>
            <p className="portal-desc">
              View complete health records, monitor AI risk scores, ask the 24/7 AI Health Chatbot questions, and manage prescriptions.
            </p>
            <button
              className="btn btn--outline btn--block"
              onClick={() => navigate("/login")}
            >
              Sign In as Patient
            </button>
          </div>

          <div className="portal-card portal-card--highlighted">
            <div className="portal-icon">
              <Stethoscope size={32} />
            </div>
            <h3 className="portal-title">Doctor Portal</h3>
            <p className="portal-desc">
              Rapid patient lookup, emergency health file retrieval, prescription history review, and automated PDF clinical summaries.
            </p>
            <button
              className="btn btn--primary btn--block"
              onClick={() => navigate("/login")}
            >
              Sign In as Doctor
            </button>
          </div>

          <div className="portal-card">
            <div className="portal-icon">
              <ShieldCheck size={32} />
            </div>
            <h3 className="portal-title">Admin Console</h3>
            <p className="portal-desc">
              Oversee hospital audit logs, manage doctor registrations, monitor platform safety, and enforce regulatory healthcare compliance.
            </p>
            <button
              className="btn btn--outline btn--block"
              onClick={() => navigate("/admin/login")}
            >
              Access Admin Console
            </button>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <div className="nav-brand">
                <div className="brand-icon-wrapper">
                  <HeartPulse className="brand-icon" size={20} />
                </div>
                <span className="brand-name">
                  Medi<span className="brand-accent">link</span>
                </span>
              </div>
              <p className="footer-tagline">
                Smart health records with real-time AI-based clinical risk detection. Built for modern emergency and digital medicine.
              </p>
            </div>

            <div className="footer-links-group">
              <div className="footer-col">
                <div className="footer-col-title">Platform</div>
                <span className="footer-link" onClick={() => navigate("/login")}>Patient Login</span>
                <span className="footer-link" onClick={() => navigate("/login")}>Doctor Access</span>
                <span className="footer-link" onClick={() => navigate("/admin/login")}>Admin Portal</span>
              </div>
              <div className="footer-col">
                <div className="footer-col-title">Features</div>
                <a href="#features" className="footer-link">AI Risk Detection</a>
                <a href="#features" className="footer-link">Emergency Lookup</a>
                <a href="#features" className="footer-link">Digital Prescriptions</a>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <div>© {new Date().getFullYear()} Medilink Healthcare Platform. All rights reserved.</div>
            <div className="footer-disclaimer">
              Notice: Medilink's AI risk detection provides predictive guidance and does not substitute professional medical diagnosis.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
