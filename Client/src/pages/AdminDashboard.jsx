import { useEffect, useState } from "react";
import API from "../services/api";
import DashboardCard from "../components/DashboardCard";
import AdminSidebar from "../components/AdminSidebar";
import AdminCharts from "../components/AdminCharts";


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

const loadData = async () => {
  try {
    const userRes = await API.get("/admin/users");
    const appRes = await API.get("/appointments");

    setUsers(userRes.data);
    setAppointments(appRes.data);
  } catch (err) {
    console.log(err);
  }
};
    
  const deleteUser = async (id) => {
  if (!window.confirm("Delete this user?")) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(
      `/admin/users/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("User deleted successfully");
    loadData();

  } catch (err) {
    console.log(err);
    alert("Failed to delete user");
  }
};

const deleteAppointment = async (id) => {
  if (!window.confirm("Delete this appointment?")) return;

  try {
    const token = localStorage.getItem("token");

    await API.delete(
      `/appointments/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Appointment deleted successfully");

    loadData();

  } catch (err) {
    console.log(err);
    alert("Failed to delete appointment");
  }
};
  

  const doctors = users.filter((u) => u.role === "doctor");
  const patients = users.filter((u) => u.role === "patient");

  return (
  <div className="d-flex bg-light">

    <AdminSidebar />

    <div
      className="container-fluid p-4"
      style={{
        flex: 1,
        minHeight: "100vh",
      }}
    >
      <h1 className="fw-bold mb-4">
        Admin Dashboard
      </h1>

      <div className="row g-4">

        <div className="col-lg-4 col-md-6">
          <DashboardCard
            title="Doctors"
            value={doctors.length}
            color="#0d6efd"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <DashboardCard
            title="Patients"
            value={patients.length}
            color="#198754"
          />
        </div>

        <div className="col-lg-4 col-md-6">
          <DashboardCard
            title="Appointments"
            value={appointments.length}
            color="#dc3545"
          />
        </div>

      </div>

      <div className="card shadow border-0 mt-4 p-4">

        <AdminCharts
          appointments={appointments}
        />

      </div>

      <hr className="my-5" />

      <h2 className="fw-bold mb-3">
        Doctors
      </h2>

      <div className="table-responsive">

        <table className="table table-bordered table-hover shadow">

          <thead className="table-primary">

            <tr>

              <th>Name</th>

              <th>Email</th>

              <th>Action</th>

            </tr>

          </thead>

          <tbody>

            {doctors.map((doctor) => (

              <tr key={doctor._id}>

                <td>{doctor.name}</td>

                <td>{doctor.email}</td>

                <td>

                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteUser(doctor._id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      <hr className="my-5" />
      <h2 className="fw-bold mb-3">Patients</h2>

<div className="table-responsive">

  <table className="table table-bordered table-hover shadow">

    <thead className="table-success">

      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>

    </thead>

    <tbody>

      {patients.map((patient) => (

        <tr key={patient._id}>

          <td>{patient.name}</td>

          <td>{patient.email}</td>

          <td>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => deleteUser(patient._id)}
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

<hr className="my-5" />

<h2 className="fw-bold mb-3">
  Appointments
</h2>

<div className="table-responsive">

  <table className="table table-bordered table-hover shadow">

    <thead className="table-danger">

      <tr>

        <th>Patient</th>

        <th>Doctor</th>

        <th>Date</th>

        <th>Time</th>

        <th>Status</th>

        <th>Action</th>

      </tr>

    </thead>

    <tbody>

      {appointments.map((app) => (

        <tr key={app._id}>

          <td>{app.patient?.name}</td>

          <td>{app.doctor?.name}</td>

          <td>{app.date}</td>

          <td>{app.time}</td>

          <td>

            <span
              className={`badge ${
                app.status === "Approved"
                  ? "bg-success"
                  : app.status === "Rejected"
                  ? "bg-danger"
                  : app.status === "Completed"
                  ? "bg-primary"
                  : "bg-warning text-dark"
              }`}
            >
              {app.status}
            </span>

          </td>

          <td>

            <button
              className="btn btn-danger btn-sm"
              onClick={() =>
                deleteAppointment(app._id)
              }
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

    </tbody>

  </table>

</div>

</div>

</div>


);
}
export default AdminDashboard;
  