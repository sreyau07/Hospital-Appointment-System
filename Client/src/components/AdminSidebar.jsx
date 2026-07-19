import { Link } from "react-router-dom";

function AdminSidebar() {
  return (
    <div
      className="flex-shrink-0"
      style={{
        background: "linear-gradient(180deg,#0d6efd,#4f8cff)",
        color: "white",
        padding: "20px",
        boxShadow: "3px 0 10px rgba(0,0,0,0.2)",
      }}
    >
      <h2 className="text-center fw-bold mb-4">
        🏥 Admin
      </h2>

      <hr style={{ borderColor: "white" }} />

      <div className="d-flex flex-column">

        <Link to="/admin" className="btn btn-light w-100 mb-3">
          📊 Dashboard
        </Link>

        <Link to="/doctors" className="btn btn-light w-100 mb-3">
          👨‍⚕️ Doctors
        </Link>

        <Link to="/myAppointments" className="btn btn-light w-100 mb-3">
          📅 Appointments
        </Link>

        <Link
          to="/"
          className="btn btn-danger w-100 mt-3"
          onClick={() => localStorage.clear()}
        >
          🚪 Logout
        </Link>

      </div>
    </div>
  );
}

export default AdminSidebar;