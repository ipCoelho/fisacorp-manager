import { useAuth } from "../hooks/AuthContext";
import PrivateRoutes from "./private";
import PublicRoutes from "./public";


function Routes() {

    const { user, globalLoading, handleValidateToken } = useAuth()

    const token = localStorage.getItem('token');


    handleValidateToken(token);

    return (
        <>
            {user ? <PrivateRoutes /> : <PublicRoutes />}
        </>
    );
}

export default Routes;