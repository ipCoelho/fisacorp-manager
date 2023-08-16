import { Route, Routes } from "react-router-dom";

import Dashboard from "../pages/dashboard/dashboard";
import NewSeller from "../pages/seller/newSeller";
import NotFound from "../pages/notfound/notFound";
import ManageSeller from "../pages/manageSeller/manageSeller";
import ManagePrivileges from "../pages/managePrivileges";
import NFeSefazContingency from "../pages/nfeSefazContingency";
import Sidebar from "../components/sidebar/sidebar";
import ManagePreparationTime from "../pages/managePreparationTime/managePreparationTime";

function PrivateRoutes() {
    return (
        <>
             <Sidebar>
                <Routes>
                    <Route path="*" element={<NotFound />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/newSeller" element={<NewSeller />} />
                    <Route path="/gerenciar-seller" element={<ManageSeller />} />
                    <Route path="/gerenciar-seller/centerdistribution/time" element={<ManagePreparationTime />} />
                    <Route path="/invoice-contigency" element={<NFeSefazContingency />} />
                    <Route path="/users-privileges" element={<ManagePrivileges />} />
                </Routes>
            </Sidebar>
        </>
    );
}

export default PrivateRoutes;