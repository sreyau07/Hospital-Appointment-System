import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import API from "../services/api";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      if (user.role === "patient") {
        navigate("/myAppointments");
      } else if (user.role === "doctor") {
        navigate("/doctor");
      } else if (user.role === "admin") {
        navigate("/admin");
      }
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
      const res = await API.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert(res.data.message);

      const role = res.data.user.role;

      if (role === "patient") {
        navigate("/myAppointments");
      } else if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "admin") {
        navigate("/admin");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="container-fluid login-bg d-flex justify-content-center align-items-center vh-100">
      <div className="card login-card shadow-lg border-0 p-5">

        <div className="text-center mb-4">
          <h1 className="text-primary">🏥</h1>
          <h2 className="fw-bold">HospitalCare</h2>
          <p className="text-muted">
            Hospital Appointment System
          </p>
        </div>

        <h4 className="text-center mb-4">Login</h4>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Enter Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            type="password"
            name="password"
            className="form-control mb-4"
            placeholder="Enter Password"
            value={form.password}
            onChange={handleChange}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>
          <div className="text-end mt-2">
  <a href="/forgot-password" className="text-decoration-none">
    Forgot Password?
  </a>
</div>

        </form>

        <p className="text-center mt-4">
          Don't have an account?{" "}
          <span
            style={{
              color: "#0d6efd",
              cursor: "pointer",
              fontWeight: "bold",
            }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;