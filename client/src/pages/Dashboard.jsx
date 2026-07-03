import React, { useEffect, useState } from 'react';
import DashboardCard from '../components/DashboardCard';
import DataTable from '../components/DataTable';
import taskService from '../services/taskService';
import LoadingSpinner from '../components/LoadingSpinner';
import ToastNotification from '../components/ToastNotification';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });

    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const response = await taskService.getTasks();

        const taskList =
          response?.tasks ||
          response?.data?.tasks ||
          [];

        setTasks(taskList);

      } catch (error) {
        showToast('Failed to load tasks', 'error');
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  // Safe guards
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const totalTasks = safeTasks.length;
  const completedTasks = safeTasks.filter(t => t.status === 'Completed').length;
  const pendingTasks = safeTasks.filter(t => t.status === 'Pending').length;

  return (
    <div className="dashboard-page">
      {loading && <LoadingSpinner />}

      {toast && (
        <ToastNotification
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <h2>Dashboard</h2>

      {/* Stats Cards */}
      <div className="dashboard-cards">
        <DashboardCard
          title="Total Tasks"
          value={totalTasks}
          icon="📋"
          color="#0078d7"
        />

        <DashboardCard
          title="Completed Tasks"
          value={completedTasks}
          icon="✅"
          color="#28a745"
        />

        <DashboardCard
          title="Pending Tasks"
          value={pendingTasks}
          icon="⏳"
          color="#dc3545"
        />
      </div>

      {/* Task Table */}
      <div className="dashboard-table">
        <h3>Task List</h3>

        {safeTasks.length === 0 ? (
          <p style={{ marginTop: '10px' }}>
            No tasks available.
          </p>
        ) : (
          <DataTable tasks={safeTasks} />
        )}
      </div>
    </div>
  );
}

export default Dashboard;