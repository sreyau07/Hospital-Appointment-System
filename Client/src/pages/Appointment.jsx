
import { useEffect, useState } from "react";
import API from "../services/api";

export default function Appointment() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    API
      .get("/doctors")
      .then((res) => setDoctors(res.data))
      .catch((err) => console.log(err));
  }, []);

  const bookAppointment = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("Please login first");
        return;
      }

      if (!selectedDoctor || !date || !time) {
        alert("Please fill all fields");
        return;
      }

      const res = await API.post(
        "/appointments",
        {
          patient: user._id,
          doctor: selectedDoctor,
          date,
          time,
        }
      );

      alert(res.data.message);

      setSelectedDoctor("");
      setDate("");
      setTime("");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Booking Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Book Appointment</h2>

      <br />

      <select
        value={selectedDoctor}
        onChange={(e) => setSelectedDoctor(e.target.value)}
      >
        <option value="">Select Doctor</option>

        {doctors.map((doctor) => (
          <option key={doctor._id} value={doctor._id}>
            {doctor.name}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <br />
      <br />

      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
      />

      <br />
      <br />

      <button onClick={bookAppointment}>
        Book Appointment
      </button>
    </div>
  );
}