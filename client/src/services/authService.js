import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

// helper: get token
const getToken = () => localStorage.getItem('token');

// LOGIN
const login = async (credentials) => {
  try {
    const res = await axios.post(`${API_URL}/login`, credentials);

    const { token, user } = res.data;

    // store automatically
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));

    return {
      success: true,
      token,
      user
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Login failed'
    };
  }
};

// REGISTER
const register = async (userData) => {
  try {
    const res = await axios.post(`${API_URL}/register`, userData);

    return {
      success: true,
      user: res.data.user,
      message: res.data.message || 'Registration successful'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Registration failed'
    };
  }
};

// GET PROFILE
const getProfile = async () => {
  try {
    const res = await axios.get(`${API_URL}/profile`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    return {
      success: true,
      user: res.data.user
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to fetch profile'
    };
  }
};

// UPDATE PROFILE
const updateProfile = async (userData) => {
  try {
    const res = await axios.put(`${API_URL}/profile`, userData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    return {
      success: true,
      user: res.data.user
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Update failed'
    };
  }
};

// CHANGE PASSWORD
const changePassword = async (passwordData) => {
  try {
    const res = await axios.put(`${API_URL}/change-password`, passwordData, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    });

    return {
      success: true,
      message: res.data.message
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Password change failed'
    };
  }
};

export default {
  login,
  register,
  getProfile,
  updateProfile,
  changePassword
};