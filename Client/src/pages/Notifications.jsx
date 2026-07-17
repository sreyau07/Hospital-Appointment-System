import { useEffect, useState } from "react";
import API from "../services/api";

function Notifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    API.get("/notifications")
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