import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import taskService from '../services/taskService';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
    status: 'Pending'
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Fetch task on mount
  useEffect(() => {
    const fetchTask = async () => {
      try {
        setLoading(true);

        const response = await taskService.getTaskById(id);

        const task =
          response?.task ||
          response?.data?.task;

        if (!task) {
          showToast('Task not found', 'error');
          return;
        }

        // sanitize data (important)
        setFormData({
          title: task.title || '',
          description: task.description || '',
          priority: task.priority || 'Medium',
          status: task.status || 'Pending',
          dueDate: task.dueDate
            ? task.dueDate.substring(0, 10)
            : ''
        });

      } catch (error) {
        showToast('Failed to load task', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.dueDate) {
      showToast('All fields are required', 'error');
      return;
    }

    try {
      setLoading(true);

      const response = await taskService.updateTask(id, formData);

      const success =
        response?.success ||
        response?.data?.success;

      if (success) {
        showToast('Task updated successfully!', 'success');

        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        showToast(
          response?.message ||
          response?.data?.message ||
          'Update failed',
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
    <div className="edit-task-page">
      {loading && <LoadingSpinner />}

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2>Edit Task</h2>

      <form className="task-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
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
          Update Task
        </button>
      </form>
    </div>
  );
}

export default EditTask;