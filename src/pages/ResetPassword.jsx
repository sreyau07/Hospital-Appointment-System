import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function ResetPassword() {
  const [password, setPassword] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/reset-password", {
        email,
        password,
      });

      alert("Password Reset Successfully");

      navigate("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "450px" }}>
      <div className="card shadow p-4">

        <h3 className="text-center mb-4">
          Reset Password
        </h3>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            className="form-control mb-3"
            placeholder="Enter New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Reset Password
          </button>

        </form>

      </div>
    </div>
  );
}

export default ResetPassword;