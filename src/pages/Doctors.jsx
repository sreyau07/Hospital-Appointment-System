import { useEffect, useState } from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

function Doctors() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const text = search.toLowerCase();

    return (
      doctor.name.toLowerCase().includes(text) ||
      (doctor.specialization || "")
        .toLowerCase()
        .includes(text)
    );
  });

 return (
  <div
    className="container-fluid py-5"
    style={{ background: "#f4f9ff", minHeight: "100vh" }}
  >
    {/* Heading */}
    <div className="text-center mb-5">
      <h1 className="fw-bold text-primary display-5">
        👨‍⚕️ Our Expert Doctors
      </h1>

      <p className="text-muted fs-5">
        Meet our experienced specialists dedicated to your health.
      </p>
    </div>

    {/* Search */}
    <div className="row justify-content-center mb-5">
      <div className="col-md-6">
        <input
          type="text"
          className="form-control form-control-lg shadow-sm"
          placeholder="🔍 Search Doctor or Specialization..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>

    {/* Doctors */}
    <div className="row">
      {filteredDoctors.map((doctor) => (
        <div className="col-lg-4 col-md-6 mb-4" key={doctor._id}>
          <div
            className="card border-0 shadow-lg h-100"
            style={{
              borderRadius: "20px",
              transition: "0.3s",
            }}
          >
            <div className="card-body text-center">

              <img
                src={
                  doctor.photo
                    ? `http://localhost:5000/uploads/${doctor.photo}`
                    : "https://via.placeholder.com/150"
                }
                alt="Doctor"
                className="rounded-circle mb-3"
                style={{
                  width: "130px",
                  height: "130px",
                  objectFit: "cover",
                  border: "5px solid #0d6efd",
                }}
              />

              <h3 className="fw-bold">
                {doctor.name}
              </h3>

              <span className="badge bg-primary mb-3">
                {doctor.specialization || "General Physician"}
              </span>

              <p>
                ⭐ <b>4.9 Rating</b>
              </p>

              <p>
                💼 <b>{doctor.experience || 0} Years Experience</b>
              </p>

              <p>
                💰 <b>₹{doctor.fees}</b>
              </p>

              <p>
                📞 {doctor.phone || "Not Available"}
              </p>

              <p>
                📅{" "}
                {doctor.availableDays?.length
                  ? doctor.availableDays.join(", ")
                  : "Not Available"}
              </p>

              <p>
                🕒{" "}
                {doctor.availableSlots?.length
                  ? doctor.availableSlots.join(", ")
                  : "Not Available"}
              </p>

              <button
  className="btn btn-primary w-100 rounded-pill mt-2"
  onClick={() => navigate(`/book/${doctor._id}`)}
>
  📅 Book Appointment
</button>

            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}

export default Doctors;