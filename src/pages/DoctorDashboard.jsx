import { useEffect, useState } from "react";
import axios from "axios";

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
    console.log("User:", user);

    const res = await axios.put(
      `https://hospital-appointment-system-4x21.onrender.com0/api/doctors/${user._id}/availability`,
      {
        availableDays,
        availableSlots: availableSlots
          .split(",")
          .map((slot) => slot.trim())
          .filter((slot) => slot !== ""),
      }
    );

    console.log(res.data);
    alert("Availability Updated Successfully");
  } catch (err) {
    console.log("Error:", err);
    console.log("Response:", err.response?.data);

    alert(err.response?.data?.message || "Failed to update availability");
  }
};

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchAppointments = () => {
    axios
      .get(`https://hospital-appointment-system-4x21.onrender.com0/api/appointments/doctor/${user._id}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `https://hospital-appointment-system-4x21.onrender.com0/api/appointments/${id}`,
        { status }
      );

      alert(res.data.message);
      fetchAppointments();
    } catch (err) {
      console.log(err);
      alert("Failed to update appointment");
    }
  };
  const uploadPhoto = async () => {
  if (!photo) {
    alert("Please select an image");
    return;
  }

  const formData = new FormData();
  formData.append("photo", photo);

  try {
    await axios.put(
      `https://hospital-appointment-system-4x21.onrender.com0/api/doctors/${user._id}/photo`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    alert("Photo uploaded successfully");
  } catch (err) {
    console.log(err);
    alert("Upload failed");
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
            user.photo
              ? `https://hospital-appointment-system-4x21.onrender.com0/uploads/${user.photo}`
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

                  {app.status === "Pending" ? (

                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() =>
                          updateStatus(app._id, "Approved")
                        }
                      >
                        ✅ Approve
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() =>
                          updateStatus(app._id, "Rejected")
                        }
                      >
                        ❌ Reject
                      </button>
                    </>

                  ) : app.status === "Approved" ? (

                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        updateStatus(app._id, "Completed")
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