import { Route, Routes } from "react-router-dom";

import Login from "../pages/login/login";
import ForgotPassword from "../pages/forgotPassword/forgotPassword";

function PublicRoutes() {
    return (
        <>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
        </>
    );
}

export default PublicRoutes;