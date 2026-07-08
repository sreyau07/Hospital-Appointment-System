import { useState, useEffect } from "react";
import API from "../services/api";

function BookAppointment() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [form, setForm] = useState({
    patient: user._id,
    doctor: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    API.get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    if (name === "doctor") {
      const doctor = doctors.find((d) => d._id === value);
      console.log(doctor);
      setSelectedDoctor(doctor);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(user);
      console.log(form);

      const res = await API.post("/appointments", form);

      alert(res.data.message);

      // Reset form
      setForm({
        patient: user._id,
        doctor: "",
        date: "",
        time: "",
      });

      setSelectedDoctor(null);
    } catch (err) {
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Book Appointment</h2>

      <form onSubmit={handleSubmit}>
        {/* Select Doctor */}
        <div className="mb-3">
          <label className="form-label">Select Doctor</label>

          <select
            className="form-control"
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            required
          >
            <option value="">Select Doctor</option>

            {doctors.map((doctor) => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.name}
              </option>
            ))}
          </select>
        </div>

        {/* Available Days */}
        {selectedDoctor && (
          <div className="alert alert-info">
            <h5>Available Days</h5>

            <p>
              {selectedDoctor.availableDays?.length > 0
                ? selectedDoctor.availableDays.join(", ")
                : "No days available"}
            </p>
          </div>
        )}

        {/* Date */}
        <div className="mb-3">
          <label className="form-label">Date</label>

          <input
            type="date"
            className="form-control"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />
        </div>

        {/* Available Time Slots */}
        {selectedDoctor && (
          <div className="mb-3">
            <label className="form-label">Available Time Slots</label>

            <select
              className="form-control"
              name="time"
              value={form.time}
              onChange={handleChange}
              required
            >
              <option value="">Select Time</option>

              {selectedDoctor.availableSlots?.map((slot) => (
                <option key={slot} value={slot}>
                  {slot}
                </option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Book Appointment
        </button>
      </form>
    </div>
  );
}

export default BookAppointment;