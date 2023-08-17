import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home/Home';

function PublicRoutes() {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default PublicRoutes;
