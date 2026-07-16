import { useEffect, useState } from "react";
import axios from "axios";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  axios
    .get("http://localhost:5000/api/notifications", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((res) => setNotifications(res.data))
    .catch((err) => console.log(err));
}, []);

  return (
    <div className="container mt-4">
      <h2>Notifications</h2>

      {notifications.length === 0 ? (
        <div className="alert alert-info">
          No Notifications
        </div>
      ) : (
        notifications.map((note) => (
          <div key={note._id} className="card mb-3 p-3">
            <h5>{note.message}</h5>
            <small>{new Date(note.createdAt).toLocaleString()}</small>
          </div>
        ))
      )}
    </div>
  );
}

export default Notifications;