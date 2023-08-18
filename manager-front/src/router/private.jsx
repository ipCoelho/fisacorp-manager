import { Route, Routes } from 'react-router-dom';
import TasksDashboard from '../pages/TasksDashboard/TasksDashboard';
import Login from '../pages/Login/Login';
import Register from '../pages/Register/Register';
import Home from '../pages/Home/Home';

function PrivateRoutes() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<TasksDashboard />} />
      </Routes>
    </>
  );
}

export default PrivateRoutes;
