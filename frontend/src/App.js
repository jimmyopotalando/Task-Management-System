import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "../../client/src/components/Navbar";
import Sidebar from "../../client/src/components/Sidebar";

import Dashboard from "../../client/src/pages/Dashboard";
import Login from "../../client/src/pages/Login";
import Register from "../../client/src/pages/Register";
import Profile from "../../client/src/pages/Profile";
import CreateTask from "../../client/src/pages/CreateTask";
import EditTask from "../../client/src/pages/EditTask";

import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />

      <div className="app-container">
        <Sidebar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/create-task" element={<CreateTask />} />
            <Route path="/edit-task/:id" element={<EditTask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;