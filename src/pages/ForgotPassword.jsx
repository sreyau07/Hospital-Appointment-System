import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  
const navigate = useNavigate();

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await API.post(
      "/auth/forgot-password",
      { email }
    );

    alert(res.data.message);

    navigate("/verify-otp", {
      state: { email },
    });

  } catch (err) {
    alert(err.response?.data?.message);
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