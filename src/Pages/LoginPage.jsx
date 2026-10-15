import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import {
  HeartPulse,
  User,
  Stethoscope,
  Lock,
  Eye,
  EyeOff,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Loader2
} from "lucide-react";
import "../Styles/LoginPage.css";
import { apiUrl } from "../lib/api";

const Login = () => {
  const [role, setRole] = useState("patient");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    if (e) e.preventDefault();
    setErrorMessage("");

    if (!mobile || !password) {
      setErrorMessage("Please enter both mobile number and password.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role,
          phone: mobile,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Invalid credentials. Please try again.");
        return;
      }

      // Store role
      localStorage.setItem("role", role);

      // ================= PATIENT =================
      if (role === "patient") {
        if (!data.patient || !data.patient._id) {
          navigate("/register/patient", { state: { phone: mobile } });
          return;
        }

        localStorage.setItem("patientToken", "true");
        localStorage.setItem("patientId", data.patient._id);
        localStorage.setItem("patientData", JSON.stringify(data.patient));
        navigate("/patient-welcome");
      }

      // ================= DOCTOR =================
      else {
        if (!data.doctor || !data.doctor._id) {
          navigate("/register/doctor", { state: { phone: mobile } });
          return;
        }

        localStorage.setItem("doctorToken", "true");
        localStorage.setItem("doctorId", data.doctor._id);
        localStorage.setItem("doctorData", JSON.stringify(data.doctor));
        navigate("/doctor-welcome");
      }
    } catch (error) {
      setErrorMessage("Network or server connection failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Back to Home Button */}
      <div className="login-top-bar">
        <button className="back-home-btn" onClick={() => navigate("/")}>
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </button>
      </div>

      <div className="login-card-container">
        <div className="login-card">
          {/* Logo & Header */}
          <div className="login-header">
            <div className="login-brand-icon">
              <HeartPulse size={26} />
            </div>
            <h2 className="login-title">Welcome to Medilink</h2>
            <p className="login-subtitle">
              Sign in to access your records, clinical data, and AI insights.
            </p>
          </div>

          {/* Role Selector Tabs */}
          <div className="login-role-tabs">
            <button
              type="button"
              className={`role-tab ${role === "patient" ? "role-tab--active" : ""}`}
              onClick={() => {
                setRole("patient");
                setErrorMessage("");
              }}
            >
              <User size={18} />
              <span>Patient</span>
            </button>
            <button
              type="button"
              className={`role-tab ${role === "doctor" ? "role-tab--active" : ""}`}
              onClick={() => {
                setRole("doctor");
                setErrorMessage("");
              }}
            >
              <Stethoscope size={18} />
              <span>Doctor</span>
            </button>
          </div>

          {/* Error Message Box */}
          {errorMessage && (
            <div className="login-error-alert">
              <ShieldAlert size={18} className="error-icon" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="login-form">
            {/* Mobile Number Field */}
            <div className="login-field-group">
              <label className="field-label">Mobile Number</label>
              <div className="phone-input-wrapper">
                <PhoneInput
                  international
                  defaultCountry="IN"
                  value={mobile}
                  onChange={setMobile}
                  placeholder="Enter registered mobile"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-field-group">
              <div className="field-label-row">
                <label className="field-label">Password</label>
                <span
                  className="field-link"
                  onClick={() => navigate("/forgot-password", { state: { role } })}
                >
                  Forgot password?
                </span>
              </div>
              <div className="password-input-wrapper">
                <Lock size={18} className="input-leading-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={loading || !mobile || !password}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner-icon" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <span>Sign In as {role === "patient" ? "Patient" : "Doctor"}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Footer Navigation */}
          <div className="login-footer">
            <p className="register-prompt">
              Don't have an account yet?{" "}
              <span
                className="register-link"
                onClick={() =>
                  navigate("/register/password", {
                    state: { role },
                  })
                }
              >
                Register Now
              </span>
            </p>

            <div className="admin-shortcut">
              <span>Healthcare Administrator?</span>{" "}
              <span
                className="admin-link"
                onClick={() => navigate("/admin/login")}
              >
                Admin Portal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
