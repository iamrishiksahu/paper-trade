import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";

function RequireAuth() {

    // const { auth } = useAuth();

    const auth = useSelector((store) => store.authData)
    const location = useLocation();

    console.log('requiredauth.js me auth: ', auth)
    
    if(auth){
    return(
        auth?.email 
            ? <Outlet />
            : <Navigate to='/login' state={{from: location}} replace/>
    )}
}

export default RequireAuth;