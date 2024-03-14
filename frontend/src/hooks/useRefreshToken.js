import { useNavigate } from 'react-router-dom';
import { axiosPrivate as axios } from '../api/axiosConfig'
import useAuth from './useAuth';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../features/auth/authState';

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const refresh = async () => {


        const res = await axios.get('/auth/refresh', {
            withCredentials: true //allows to send cookies with requests

            /**
             *  the issued refresh token is stored in the httpOnly cookie and is not
             * accessible to JS and we never see it. But axios can send it to the server.
             */


        }).then((response) => {

            
            console.log("refresh token response: ", response)

            if (response.status === 403) {
                // refresh token expired
                return navigate('/login');
            }

            dispatch(setAuthData(response.data))

            setAuth((prev) => {
                return {
                    ...prev,
                    email: response.data.email,
                    accessToken: response.data.accessToken,
                    roles: response.data.roles
                };
            });

        }).catch((err) => {
            console.log("error response recieved: " + err);
        })
        // return res.data.accessToken;



    }
    return refresh;
}

export default useRefreshToken