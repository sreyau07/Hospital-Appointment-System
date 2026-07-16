import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "patient") navigate("/myAppointments");
      else if (user.role === "doctor") navigate("/doctor");
      else if (user.role === "admin") navigate("/admin");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/register", form);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="register-bg">

      <div className="register-card shadow-lg">

        <div className="text-center mb-4">

          <div className="logo">🏥</div>

          <h2 className="text-primary fw-bold">
            HospitalCare
          </h2>

          <p className="text-muted">
            Create Your Account
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            className="form-control mb-3"
            placeholder="👤 Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="📧 Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="🔒 Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <select
            name="role"
            className="form-select mb-4"
            value={form.role}
            onChange={handleChange}
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
          </select>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-register"
          >
            Register
          </button>

        </form>

        <p className="text-center mt-4">

          Already have an account?

          <Link
            to="/login"
            className="text-decoration-none fw-bold"
          >
            {" "}Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;