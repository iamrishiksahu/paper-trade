import { useDispatch } from "react-redux";
import { axiosInstance as axios } from "../api/axiosConfig"
import { clearAuth } from "../features/auth/authState";
import useAuth from "./useAuth";

const useLogout = () => {

    const { setAuth } = useAuth();
    const dispatch = useDispatch()
    const logout = async () => {
        setAuth({});
        try{
            const response = await axios('/auth/logout', {
                withCredentials: true,
            })

            dispatch(clearAuth()) 

            console.log(response);
        
        }catch(err) {
            console.error(err);
        }
    }

    return logout;

    
}

export default useLogout;