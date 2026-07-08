import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function VerifyOtp() {
  const [otp, setOtp] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/verify-otp", {
        email,
        otp,
      });

      alert("OTP Verified Successfully");

      navigate("/reset-password", {
        state: { email },
      });

    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">

        <h3 className="text-center mb-4">
          Verify OTP
        </h3>

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            className="form-control mb-3"
            placeholder="Enter 6-digit OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            required
          />

          <button
            className="btn btn-success w-100"
            type="submit"
          >
            Verify OTP
          </button>

        </form>

      </div>
    </div>
  );
}

export default VerifyOtp;