import { Route, Routes } from 'react-router-dom';

function PrivateRoutes() {
  return (
    <>
      <Sidebar>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Sidebar>
    </>
  );
}

export default PrivateRoutes;
