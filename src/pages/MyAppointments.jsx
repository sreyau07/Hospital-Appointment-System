import { useEffect, useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
const [newTime, setNewTime] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    axios
      .get(`http://localhost:5000/api/appointments/patient/${user._id}`)
      .then((res) => setAppointments(res.data))
      .catch((err) => console.log(err));
  }, []);

  const downloadReceipt = (app) => {
  const doc = new jsPDF();

  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("HospitalCare", 70, 20);

  doc.setFontSize(16);
  doc.text("Appointment Receipt", 60, 35);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);

  doc.text(`Patient Name : ${app.patient?.name}`, 20, 55);
  doc.text(`Doctor Name : ${app.doctor?.name}`, 20, 70);
  doc.text(`Date : ${app.date?.substring(0, 10)}`, 20, 85);
  doc.text(`Time : ${app.time}`, 20, 100);
  doc.text(`Status : ${app.status}`, 20, 115);

  doc.line(20, 125, 190, 125);

  doc.text("Thank you for choosing HospitalCare.", 20, 140);
  doc.text("Get Well Soon!", 20, 155);

  doc.save(`Appointment_${app._id}.pdf`);
};

const cancelAppointment = async (id) => {
  const confirmCancel = window.confirm(
    "Are you sure you want to cancel this appointment?"
  );

  if (!confirmCancel) return;

  try {
    await axios.delete(
      `http://localhost:5000/api/appointments/${id}`
    );

    alert("Appointment Cancelled Successfully");

    setAppointments(
      appointments.filter((app) => app._id !== id)
    );
  } catch (err) {
    alert("Failed to cancel appointment");
  }
};

const rescheduleAppointment = async (id) => {
  if (!newDate || !newTime) {
    alert("Please select a new date and time");
    return;
  }

  try {
    const res = await axios.put(
      `http://localhost:5000/api/appointments/reschedule/${id}`,
      {
        date: newDate,
        time: newTime,
      }
    );

    alert(res.data.message);

    window.location.reload();
  } catch (err) {
    alert(err.response?.data?.message || "Reschedule Failed");
  }
};

const payNow = async (appointment) => {
  try {
    // Create Razorpay Order
    const { data } = await axios.post(
      "http://localhost:5000/api/payment/create-order",
      {
        amount: appointment.doctor?.fees || 500,
      }
    );

    const options = {
      key: "rzp_test_TAeLhfsDkXpsOC", // Replace with your Test Key ID
      amount: data.amount,
      currency: data.currency,
      name: "HospitalCare",
      description: "Doctor Consultation Fee",
      order_id: data.id,
      
      handler: async function (response) {
  await axios.put(
    `http://localhost:5000/api/payment/success/${appointment._id}`,
    {
      paymentId: response.razorpay_payment_id,
    }
  );

  alert("Payment Successful");

  window.location.reload();
},

      prefill: {
        name: appointment.patient?.name,
        email: appointment.patient?.email,
      },

      theme: {
        color: "#3399cc",
      },
    };

    const razor = new window.Razorpay(options);
    razor.open();

  } catch (err) {
    console.log(err);
    alert("Payment Failed");
  }
};
  return (
    <div>
      <h2>My Appointments</h2>

      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        appointments.map((app) => (
  <div key={app._id}>
    <p><strong>Doctor:</strong> {app.doctor?.name}</p>
    <p><strong>Date:</strong> {app.date?.substring(0, 10)}</p>
    <p><strong>Time:</strong> {app.time}</p>
    <p><strong>Status:</strong> {app.status}</p>

   <div className="d-flex flex-wrap gap-2 justify-content-center mt-3">

  <button
    className="btn btn-primary"
    onClick={() => downloadPDF(app)}
  >
    📄 Download PDF
  </button>

  {app.paymentStatus !== "Paid" && (
    <button
      className="btn btn-success"
      onClick={() => handlePayment(app)}
    >
      💳 Pay Now
    </button>
  )}

  {app.status === "Pending" && (
    <button
      className="btn btn-danger"
      onClick={() => cancelAppointment(app._id)}
    >
      ❌ Cancel Appointment
    </button>
  )}

  <button
    className="btn btn-warning text-dark"
    onClick={() => rescheduleAppointment(app._id)}
  >
    🔄 Reschedule
  </button>

</div>
<br /><br />

<input
  type="date"
  className="form-control mb-2"
  value={newDate}
  onChange={(e) => setNewDate(e.target.value)}
/>

<input
  type="time"
  className="form-control mb-2"
  value={newTime}
  onChange={(e) => setNewTime(e.target.value)}
/>



<hr />
  </div>
))
      )}
    </div>
  );
}