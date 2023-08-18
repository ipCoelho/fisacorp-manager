import { Route, Routes } from 'react-router-dom';

function PrivateRoutes() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/tasks" element={<TasksDashboard />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default PrivateRoutes;
