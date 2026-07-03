import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';

function CreateTask() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.dueDate) {
      showToast('All fields are required', 'error');
      return;
    }

    try {
      setLoading(true);

      const response = await taskService.createTask(formData);

      setLoading(false);

      const success =
        response?.success ||
        response?.data?.success;

      if (success) {
        showToast('Task created successfully!', 'success');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        showToast(
          response?.message ||
          response?.data?.message ||
          'Task creation failed',
          'error'
        );
      }
    } catch (error) {
      setLoading(false);
      showToast('Server error. Try again later.', 'error');
    }
  };

  return (
    <div className="create-task-page">
      {loading && <LoadingSpinner />}

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2>Create New Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title"
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter task description"
            required
          />
        </div>

        <div className="form-group">
          <label>Priority:</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="form-group">
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-primary">
          Create Task
        </button>
      </form>
    </div>
  );
}

export default CreateTask;