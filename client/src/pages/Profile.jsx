// src/pages/Profile.js

import React, { useEffect, useState } from "react";
import authService from "../services/authService";
import LoadingSpinner from "../components/LoadingSpinner";
import ToastNotification from "../components/ToastNotification";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  // Load user profile
  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);

      const response = await authService.getProfile();

      if (response.success) {
        setUser(response.user);
      } else {
        setToast({
          message: response.message,
          type: "error",
        });
      }

      setLoading(false);
    };

    loadProfile();
  }, []);

  // Update profile
  const handleProfileChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const response = await authService.updateProfile(user);

    setLoading(false);

    if (response.success) {
      setToast({
        message: "Profile updated successfully!",
        type: "success",
      });
    } else {
      setToast({
        message: response.message,
        type: "error",
      });
    }
  };

  // Change password
  const handlePasswordChange = (e) => {
    setPasswordData({
      ...passwordData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (!passwordData.currentPassword || !passwordData.newPassword) {
      setToast({
        message: "Please fill in both password fields.",
        type: "error",
      });
      return;
    }

    setLoading(true);

    const response = await authService.changePassword(passwordData);

    setLoading(false);

    if (response.success) {
      setToast({
        message: response.message,
        type: "success",
      });

      setPasswordData({
        currentPassword: "",
        newPassword: "",
      });
    } else {
      setToast({
        message: response.message,
        type: "error",
      });
    }
  };

  return (
    <div className="profile-page">

      {loading && <LoadingSpinner />}

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2>My Profile</h2>

      <form className="profile-form" onSubmit={handleProfileSubmit}>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleProfileChange}
          />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleProfileChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          Update Profile
        </button>

      </form>

      <hr />

      <h3>Change Password</h3>

      <form onSubmit={handlePasswordSubmit}>

        <div className="form-group">
          <label>Current Password</label>
          <input
            type="password"
            name="currentPassword"
            value={passwordData.currentPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <div className="form-group">
          <label>New Password</label>
          <input
            type="password"
            name="newPassword"
            value={passwordData.newPassword}
            onChange={handlePasswordChange}
          />
        </div>

        <button type="submit" className="btn-primary">
          Change Password
        </button>

      </form>

    </div>
  );
}

export default Profile;