import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, password, confirmPassword } = formData;

    // Validation
    if (!name || !email || !password || !confirmPassword) {
      showToast('All fields are required', 'error');
      return;
    }

    if (password !== confirmPassword) {
      showToast('Passwords do not match', 'error');
      return;
    }

    try {
      setLoading(true);

      // IMPORTANT: do NOT send confirmPassword to backend
      const payload = { name, email, password };

      const response = await authService.register(payload);

      const success =
        response?.success ||
        response?.data?.success;

      if (success) {
        showToast('Registration successful!', 'success');

        setTimeout(() => {
          navigate('/login');
        }, 1000);

      } else {
        showToast(
          response?.message ||
          response?.data?.message ||
          'Registration failed',
          'error'
        );
      }

    } catch (error) {
      showToast('Server error. Try again later.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      {loading && <LoadingSpinner />}

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2>Create Account</h2>

      <form className="register-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;