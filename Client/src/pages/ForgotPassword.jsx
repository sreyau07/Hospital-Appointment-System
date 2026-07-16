import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import axios from "axios";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    console.log("Sending request...");

    const res = await API.post("/auth/forgot-password", { email });

    console.log("Response:", res.data);

    localStorage.setItem("resetEmail", email);

    navigate("/verify-otp");

  } catch (err) {
    console.log("Error:", err);
    console.log("Response:", err.response);
    alert(err.response?.data?.message || err.message);
  }
};
  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Forgot Password</h3>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            className="form-control mb-3"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="btn btn-primary w-100"
            type="submit"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;