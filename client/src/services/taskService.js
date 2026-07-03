import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

// helper: token
const getToken = () => localStorage.getItem('token');

// helper: auth headers
const authHeaders = () => ({
  headers: {
    Authorization: `Bearer ${getToken()}`
  }
});

// GET ALL TASKS
const getTasks = async () => {
  try {
    const res = await axios.get(API_URL, authHeaders());

    return {
      success: true,
      tasks: res.data.tasks || []
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch tasks'
    };
  }
};

// GET TASK BY ID
const getTaskById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`, authHeaders());

    return {
      success: true,
      task: res.data.task
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Failed to fetch task'
    };
  }
};

// CREATE TASK
const createTask = async (taskData) => {
  try {
    const res = await axios.post(API_URL, taskData, authHeaders());

    return {
      success: true,
      task: res.data.task
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Task creation failed'
    };
  }
};

// UPDATE TASK
const updateTask = async (id, taskData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, taskData, authHeaders());

    return {
      success: true,
      task: res.data.task
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Task update failed'
    };
  }
};

// DELETE TASK
const deleteTask = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`, authHeaders());

    return {
      success: true,
      message: 'Task deleted successfully'
    };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || 'Task deletion failed'
    };
  }
};

export default {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask
};