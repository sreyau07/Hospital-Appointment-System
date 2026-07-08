import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";




function Navbar() {
  const navigate = useNavigate();
  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-secondary shadow">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          🏥 HospitalCare
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-center">
            <button
  className="btn btn-outline-light ms-3"
  onClick={toggleTheme}
>
  {darkMode ? "☀ Light" : "🌙 Dark"}
</button>

            {/* Guest */}
            {!user && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">
                    Doctors
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            )}

            {/* Patient */}
            {user?.role === "patient" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/doctors">
                    Doctors
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/book">
                    Book Appointment
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/myappointments">
                    My Appointments
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/notifications">
                    🔔 Notifications
                  </Link>
                </li>
                 
                 <li className="nav-item">
  <Link className="nav-link" to="/profile">
    My Profile
  </Link>
</li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Doctor */}
            {user?.role === "doctor" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/doctor">
                    Doctor Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/notifications">
                    🔔 Notifications
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

            {/* Admin */}
            {user?.role === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/admin">
                    Admin Dashboard
                  </Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/notifications">
                    🔔 Notifications
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={logout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;