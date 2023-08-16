import { useAuth } from "../hooks/AuthContext";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";

import GlobalLoading from '../components/loading/globalLoading'

function Routes() {

    const { user, globalLoading, handleValidateToken } = useAuth()

    const token = localStorage.getItem('token');

    if (globalLoading) {
        return <GlobalLoading />
    }

    handleValidateToken(token);

    return (
        <>
            {user ? <PrivateRoutes /> : <PublicRoutes />}
        </>
    );
}

export default Routes;