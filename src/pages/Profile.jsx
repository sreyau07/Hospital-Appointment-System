import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/users/${user._id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/users/${user._id}`,
        form
      );

      alert("Profile Updated Successfully");
    } catch (err) {
      alert("Failed to update profile");
    }
  };

  return (
    <div className="container mt-4">
      <h2>My Profile</h2>

      <div className="mb-3">
        <label>Name</label>
        <input
          className="form-control"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Phone</label>
        <input
          className="form-control"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={saveProfile}
      >
        Save Profile
      </button>
    </div>
  );
}

export default Profile;