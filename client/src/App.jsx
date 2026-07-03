import { Routes, Route } from 'react-router-dom';

// Pages
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Profile from './pages/Profile.jsx';
import CreateTask from './pages/CreateTask.jsx';
import EditTask from './pages/EditTask.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/create-task" element={<CreateTask />} />
      <Route path="/edit-task/:id" element={<EditTask />} />
    </Routes>
  );
}

export default App;