import { useEffect, useState } from "react";
import API from "../services/api";
import jsPDF from "jspdf";

export default function MyAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get(
        "/appointments/my",
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

  const downloadReceipt = (app) => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("HospitalCare", 70, 20);

    doc.setFontSize(16);
    doc.text("Appointment Receipt", 60, 35);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);

    doc.text(`Patient : ${app.patient?.name}`, 20, 55);
    doc.text(`Doctor : ${app.doctor?.name}`, 20, 70);
    doc.text(
      `Date : ${app.appointmentDate?.substring(0, 10)}`,
      20,
      85
    );
    doc.text(
      `Time : ${app.appointmentTime}`,
      20,
      100
    );
    doc.text(
      `Status : ${app.status}`,
      20,
      115
    );

    doc.line(20, 125, 190, 125);

    doc.text(
      "Thank you for choosing HospitalCare",
      20,
      145
    );

    doc.save(`Appointment_${app._id}.pdf`);
  };

  const cancelAppointment = async (id) => {
    if (!window.confirm("Cancel Appointment?")) return;

    try {
      await API.put(
        `/appointments/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Appointment Cancelled");

      fetchAppointments();

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Cancel Failed"
      );
    }
  };

  const rescheduleAppointment = async (id) => {
    if (!newDate || !newTime) {
      alert("Select Date & Time");
      return;
    }

    try {
      const res = await API.put(
        `/appointments/reschedule/${id}`,
        {
          appointmentDate: newDate,
          appointmentTime: newTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(res.data.message);

      setNewDate("");
      setNewTime("");

      fetchAppointments();

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Reschedule Failed"
      );
    }
  };

  const payNow = async (appointment) => {
    try {
      const { data } = await API.post(
        "/payment/create-order",
        {
          amount: appointment.doctor?.fees || 500,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const options = {
        key: "rzp_test_TDjkp8AJeZnZ8X",

        amount: data.amount,

        currency: data.currency,

        order_id: data.id,

        name: "HospitalCare",

        description: "Doctor Consultation",

        handler: async function (response) {

          await API.put(
            `/payment/success/${appointment._id}`,
            {
              paymentId:
                response.razorpay_payment_id,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          alert("Payment Successful");

          fetchAppointments();
        },

        prefill: {
          name: appointment.patient?.name,
          email: appointment.patient?.email,
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay =
        new window.Razorpay(options);

      razorpay.open();

    } catch (err) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Payment Failed"
      );
    }
  };
    return (
    <div className="container mt-4">
      <h2 className="mb-4">My Appointments</h2>

      {appointments.length === 0 ? (
        <div className="alert alert-info">
          No appointments found.
        </div>
      ) : (
        appointments.map((app) => (
          <div
            key={app._id}
            className="card mb-4 shadow"
          >
            <div className="card-body">

              <h5>
                Doctor : {app.doctor?.name}
              </h5>

              <p>
                <strong>Date :</strong>{" "}
                {app.appointmentDate?.substring(0, 10)}
              </p>

              <p>
                <strong>Time :</strong>{" "}
                {app.appointmentTime}
              </p>

              <p>
                <strong>Status :</strong>

                <span
                  className={`badge ms-2 ${
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
              </p>

              <p>
                <strong>Payment :</strong>{" "}
                {app.paymentStatus || "Pending"}
              </p>

              <div className="row mt-3">

                <div className="col-md-12">

                  <input
                    type="date"
                    className="form-control mb-2"
                    value={newDate}
                    onChange={(e) =>
                      setNewDate(e.target.value)
                    }
                  />

                  <input
                    type="time"
                    className="form-control"
                    value={newTime}
                    onChange={(e) =>
                      setNewTime(e.target.value)
                    }
                  />

                </div>

              <div className="d-flex flex-wrap justify-content-center gap-2 mt-3">

  <button
    className="btn btn-primary"
    onClick={() => downloadReceipt(app)}
  >
    📄 Download PDF
  </button>

  {app.paymentStatus !== "Paid" && (
    <button
      className="btn btn-success"
      onClick={() => payNow(app)}
    >
      💳 Pay Now
    </button>
  )}

  {app.status !== "cancelled" &&
 app.status !== "completed" && (
  <button
    className="btn btn-danger"
    onClick={() => cancelAppointment(app._id)}
  >
    ❌ Cancel Appointment
  </button>
)}

  <button
    className="btn btn-warning"
    onClick={() => rescheduleAppointment(app._id)}
  >
    🔄 Reschedule
  </button>

</div>

              </div>

            </div>
          </div>
        ))
      )}
    </div>
  );
}