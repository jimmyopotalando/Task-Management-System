import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
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

    if (!formData.email || !formData.password) {
      showToast('All fields are required', 'error');
      return;
    }

    try {
      setLoading(true);

      const response = await authService.login(formData);

      const success =
        response?.success ||
        response?.data?.success;

      const token =
        response?.token ||
        response?.data?.token;

      if (success && token) {
        showToast('Login successful!', 'success');

        localStorage.setItem('token', token);

        setTimeout(() => {
          navigate('/');
        }, 1000);

      } else {
        showToast(
          response?.message ||
          response?.data?.message ||
          'Login failed',
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
    <div className="login-page">
      {loading && <LoadingSpinner />}

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2>Login</h2>

      <form className="login-form" onSubmit={handleSubmit}>
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

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;