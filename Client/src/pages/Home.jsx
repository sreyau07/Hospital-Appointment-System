import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";
import { ThemeContext } from "../context/ThemeContext";

function Home() {
  const {darkMode}=useContext(ThemeContext);
  return (
    
      <div className={darkMode ? "dark-theme" : "light-theme"}>
      <div
  className="w-100 d-flex align-items-center text-center"
  style={{
    minHeight: "90vh",
    width: "100%",
    background: darkMode
      ? "linear-gradient(135deg,#1a1a1a,#333)"
      : "linear-gradient(135deg,#ffffff,#d9d9d9)",
  }}
>
  <div className="container">
    <h1 className="display-3 fw-bold text-white">
      Hospital Appointment System
    </h1>

    <p className="lead text-white mt-3">
      Book appointments with experienced doctors quickly,
      securely, and easily.
    </p>

    <div className="mt-4">
      <Link
        to="/register"
        className="btn btn-warning btn-lg me-3"
      >
        Get Started
      </Link>

      <Link
        to="/login"
        className="btn btn-outline-light btn-lg"
      >
        Login
      </Link>
    </div>
  </div>
</div>

      {/* Features */}
      <div className="container py-5">

        <h2 className="text-center mb-5">
          Why Choose HospitalCare?
        </h2>

        

        <div className="row">

          <div className="col-md-4">
            <div className="card shadow p-4 text-center">
              <h1>👨‍⚕️</h1>
              <h4>Expert Doctors</h4>
              <p>Consult experienced specialists.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4 text-center">
              <h1>📅</h1>
              <h4>Easy Booking</h4>
              <p>Book appointments anytime.</p>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow p-4 text-center">
              <h1>💳</h1>
              <h4>Secure Payment</h4>
              <p>Pay safely using Razorpay.</p>
            </div>
          </div>

        </div>
      </div>
{/* Our Services */}
<div className="container py-5">
  <h2 className="text-center fw-bold mb-5">Our Services</h2>

  <div className="row g-4">

    <div className="col-md-3">
      <div className="card shadow border-0 text-center p-4 h-100">
        <h1>🩺</h1>
        <h4>General Checkup</h4>
        <p>Routine health checkups for all age groups.</p>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow border-0 text-center p-4 h-100">
        <h1>❤️</h1>
        <h4>Cardiology</h4>
        <p>Expert heart care and cardiac treatment.</p>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow border-0 text-center p-4 h-100">
        <h1>🦴</h1>
        <h4>Orthopedics</h4>
        <p>Bone and joint specialists.</p>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow border-0 text-center p-4 h-100">
        <h1>👶</h1>
        <h4>Pediatrics</h4>
        <p>Special care for infants and children.</p>
      </div>
    </div>

  </div>
</div>
{/* Statistics */}
<div className="container py-5">
  <div className="row text-center g-4">

    <div className="col-md-3">
      <div className="card shadow border-0 p-4">
        <h1 className="text-primary">👨‍⚕️</h1>
        <h2 className="fw-bold text-primary">100+</h2>
        <p className="text-muted mb-0">Expert Doctors</p>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow border-0 p-4">
        <h1 className="text-success">😊</h1>
        <h2 className="fw-bold text-success">5000+</h2>
        <p className="text-muted mb-0">Happy Patients</p>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow border-0 p-4">
        <h1 className="text-danger">🏥</h1>
        <h2 className="fw-bold text-danger">24×7</h2>
        <p className="text-muted mb-0">Emergency Service</p>
      </div>
    </div>

    <div className="col-md-3">
      <div className="card shadow border-0 p-4">
        <h1 className="text-warning">💊</h1>
        <h2 className="fw-bold text-warning">15+</h2>
        <p className="text-muted mb-0">Departments</p>
      </div>
    </div>

  </div>
</div>
<div className="container py-5">
  <h2 className="text-center fw-bold mb-4">
    Contact Us
  </h2>

  <div className="text-center">

    <h5>🏥 HospitalCare</h5>

    <p>Coimbatore, Tamil Nadu</p>

    <p>📞 +91 9876543210</p>

    <p>✉ hospitalcare@gmail.com</p>

  </div>
</div>
      
    </div>
  );
}


export default Home;