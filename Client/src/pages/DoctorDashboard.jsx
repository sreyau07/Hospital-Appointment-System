import { useEffect, useState } from "react";
import API from "../services/api";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [availableDays, setAvailableDays] = useState([]);
const [availableSlots, setAvailableSlots] = useState("");
const [photo, setPhoto]= useState(null);
const toggleDay = (day) => {
  if (availableDays.includes(day)) {
    setAvailableDays(availableDays.filter((d) => d !== day));
  } else {
    setAvailableDays([...availableDays, day]);
  }
};

const saveAvailability = async () => {
  try {
    const token = localStorage.getItem("token");

    await API.put(
      "/doctors/availability",
      {
        availableDays,
        availableSlots: availableSlots
          .split(",")
          .map((slot) => slot.trim())
          .filter(Boolean),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    alert("Availability Updated Successfully");

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Failed");
  }
};

  const user = JSON.parse(localStorage.getItem("user"));

const fetchAppointments = async () => {
  try {
    const token = localStorage.getItem("token");

    const res = await API.get(
      "/doctors/appointments",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAppointments(res.data);

  } catch (err) {
    console.log(err);
  }
};

useEffect(()=>{
  fetchAppointments();
},[]);

const updateStatus = async (id, status) => {
  try {

    const token = localStorage.getItem("token");

    await API.put(
      `/doctors/appointment/${id}`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    fetchAppointments();
    

  } catch (err) {
    console.log(err);
  }
};

const uploadPhoto = async () => {
  if (!photo) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("profilePhoto", photo);

  try {
    const res = await API.put(
      `/doctors/${user._id}/photo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const updatedUser = {
      ...user,
      profilePhoto: res.data.profilePhoto,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    alert("Photo uploaded successfully");

    window.location.reload();

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Upload failed");
  }
};
  
  

return (
  <div className="container-fluid p-4 bg-light" style={{ minHeight: "100vh" }}>

    <h2 className="fw-bold mb-4 text-primary">
      👨‍⚕️ Doctor Dashboard
    </h2>

    {/* Doctor Profile */}
    <div className="card shadow border-0 mb-4">
      <div className="card-body d-flex align-items-center">

        <img
          src={
            user.profilePhoto
              ? user.profilePhoto
              : "https://via.placeholder.com/120"
          }
          alt="Doctor"
          className="rounded-circle border border-3 border-primary"
          style={{
            width: "120px",
            height: "120px",
            objectFit: "cover",
          }}
        />

        <div className="ms-4">
          <h3>Dr. {user.name}</h3>
          <p className="mb-1">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-0">
            Welcome to your dashboard.
          </p>
        </div>

      </div>
    </div>

    {/* Upload Photo */}
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <h4 className="mb-3">
          📷 Profile Photo
        </h4>

        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={(e) => setPhoto(e.target.files[0])}
        />

        <button
          className="btn btn-success mt-3"
          onClick={uploadPhoto}
        >
          Upload Photo
        </button>

      </div>
    </div>

    {/* Availability */}
    <div className="card shadow border-0 mb-4">
      <div className="card-body">

        <h4 className="mb-4">
          📅 Doctor Availability
        </h4>

        <div className="mb-3">

          <label className="fw-bold">
            Available Days
          </label>

          <div className="mt-2">

            {[
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ].map((day) => (
              <label
                key={day}
                className="me-3"
              >
                <input
                  type="checkbox"
                  checked={availableDays.includes(day)}
                  onChange={() => toggleDay(day)}
                />{" "}
                {day}
              </label>
            ))}

          </div>

        </div>

        <div className="mb-3">

          <label className="fw-bold">
            Available Time Slots
          </label>

          <input
            type="text"
            className="form-control"
            placeholder="09:00 AM, 10:00 AM, 11:00 AM"
            value={availableSlots}
            onChange={(e) =>
              setAvailableSlots(e.target.value)
            }
          />

        </div>

        <button
          className="btn btn-primary"
          onClick={saveAvailability}
        >
          Save Availability
        </button>

      </div>
    </div>
     {appointments.length === 0 ? (

  <div className="alert alert-info shadow">
    <h5>No Appointments Found</h5>
  </div>

) : (

  <div className="card shadow border-0">

    <div className="card-header bg-primary text-white">
      <h4 className="mb-0">📋 Appointment Requests</h4>
    </div>

    <div className="card-body">

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Patient</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Action</th>
            </tr>

          </thead>

          <tbody>

            {appointments.map((app) => (

              <tr key={app._id}>

                <td>
                  👤 {app.patient?.name}
                </td>

                <td>{app.appointmentDate}</td>

                <td>{app.appointmentTime}</td>

                <td>

                  <span
                    className={`badge ${
                      app.status === "approved"
                        ? "bg-success"
                        : app.status === "rejected"
                        ? "bg-danger"
                        : app.status === "completed"
                        ? "bg-primary"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {app.status}
                  </span>

                </td>

                <td>

                  {app.status === "pending" ? (

                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          updateStatus(app._id, "approved")
                        }
                      >
                        ✅ Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          updateStatus(app._id, "rejected")
                        }
                      >
                        ❌ Reject
                      </button>
                    </>

                  ) : app.status === "approved" ? (

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        updateStatus(app._id, "completed")
                      }
                    >
                      ✔ Complete
                    </button>

                  ) : (

                    <span className="text-success fw-bold">
                      Finished
                    </span>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  </div>

)}

</div>
);
}

export default DoctorDashboard;