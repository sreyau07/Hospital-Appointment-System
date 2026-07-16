import { useEffect, useState } from "react";
import API from "../services/api";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    profilePhoto: "",
  });

  const [photo, setPhoto] = useState(null);

  const token = localStorage.getItem("token");

  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProfile(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const saveProfile = async () => {
    try {
      await API.put("/profile/update", profile, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Profile Updated Successfully");
      fetchProfile();
    } catch (error) {
      alert("Failed to update profile");
      console.log(error);
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
      await API.put("/profile/photo", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Photo uploaded successfully");
      fetchProfile();
    } catch (error) {
      alert("Failed to upload photo");
      console.log(error);
    }
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">My Profile</h2>

      <div className="text-center mb-4">
        <img
          src={
            profile.profilePhoto
              ? `http://localhost:5000/uploads/${profile.profilePhoto}`
              : "https://via.placeholder.com/150"
          }
          alt="Profile"
          className="rounded-circle border"
          style={{
            width: "150px",
            height: "150px",
            objectFit: "cover",
          }}
        />
      </div>

      <div className="mb-3">
        <label>Name</label>
        <input
          className="form-control"
          name="name"
          value={profile.name}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          className="form-control"
          name="email"
          value={profile.email}
          disabled
        />
      </div>

      <div className="mb-3">
        <label>Phone</label>
        <input
          className="form-control"
          name="phone"
          value={profile.phone || ""}
          onChange={handleChange}
        />
      </div>

      <button
        className="btn btn-primary"
        onClick={saveProfile}
      >
        Save Profile
      </button>

      <hr />

      <h4>Upload Profile Photo</h4>

      <input
        type="file"
        className="form-control mb-3"
        accept="image/*"
        onChange={(e) => setPhoto(e.target.files[0])}
      />

      <button
        className="btn btn-success"
        onClick={uploadPhoto}
      >
        Upload Photo
      </button>

    </div>
  );
}

export default Profile;