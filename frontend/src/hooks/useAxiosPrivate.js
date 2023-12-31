import axios from "axios";
import { useEffect } from "react";
import { axiosPrivate } from "../api/axiosConfig";
import useAuth from "./useAuth";
import useRefreshToken from "./useRefreshToken";
import { useSelector } from "react-redux";

const useAxiosPrivate = () => {
    const refresh = useRefreshToken();
    // const { auth } = useAuth();
    const auth = useSelector((store) => store.authData);


    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }

                return config;
            },
            (err) => {
                Promise.reject(err);
            }
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (err) => {
                const prevRequest = err?.config;
                if (err?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(err);
            }
        );
        //clean-up function to detatch the interceptor
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;