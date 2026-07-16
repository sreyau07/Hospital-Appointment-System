import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      style={{
        width: "260px",
        minHeight: "100vh",
        background: "linear-gradient(180deg,#0d6efd,#4f8cff)",
        color: "white",
        padding: "20px",
        boxShadow: "3px 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "30px",
          fontWeight: "bold",
        }}
      >
        🏥 Admin
      </h2>

      <hr style={{ borderColor: "white" }} />

      <Link
        to="/admin"
        className="btn btn-light w-100 mb-3"
      >
        📊 Dashboard
      </Link>

      <Link
        to="/doctors"
        className="btn btn-light w-100 mb-3"
      >
        👨‍⚕️ Doctors
      </Link>

      <Link
        to="/myAppointments"
        className="btn btn-light w-100 mb-3"
      >
        📅 Appointments
      </Link>

      <Link
        to="/"
        className="btn btn-danger w-100 mt-5"
        onClick={() => {
          localStorage.clear();
        }}
      >
        🚪 Logout
      </Link>
    </div>
  );
}

export default AdminSidebar;