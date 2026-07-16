function PatientDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={{ padding: "30px" }}>
      <h1>Patient Dashboard</h1>

      <h3>Welcome, {user?.name}</h3>

      <hr />

      <h2>Your Details</h2>

      <p><strong>Name:</strong> {user?.name}</p>
      <p><strong>Email:</strong> {user?.email}</p>
      <p><strong>Role:</strong> {user?.role}</p>

      <br />

      <button>Book Appointment</button>

      <br /><br />

      <button>My Appointments</button>

      <br /><br />

      <button
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default PatientDashboard;