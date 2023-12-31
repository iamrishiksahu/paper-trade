import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import {  LinearProgress } from '@mui/material';

const PersistLogin = () => {

    const [isLoading, setIsLoading] = useState(true);

    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect( () => {
        let isMounted = true;
        const verifyRefreshToken = async () => {
            try{
                await refresh();
            }
            catch(err){
                console.error(err);
            }
            finally{
                setIsLoading(false);
            }
        }

        if(!auth?.accessToken){
            console.log('auth nahi hai')
            verifyRefreshToken();
        }else{
            console.log('auth  hai')
            isMounted && setIsLoading(false);
        }

        return () => {
            isMounted = false;
        }

    }, [])

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`authToken: ${JSON.stringify(auth?.accessToken)}`)
    }, [isLoading])

    return (
        <>
            {!persist
                ? <Outlet/>
                : isLoading
                    ? <LinearProgress/>
                    : <Outlet/>
            }
        </>
    )
}

export default PersistLogin;