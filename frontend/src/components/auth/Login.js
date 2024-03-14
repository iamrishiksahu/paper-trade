import React, { useState, useRef } from 'react'
import './Login.css'
import { useNavigate, useLocation, Navigate } from 'react-router-dom'
import { Typography, Container, TextField, Box, Button, Checkbox, LinearProgress } from '@mui/material';
import { axiosInstance as axiosp } from '../../api/axiosConfig';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import { useEffect } from 'react';
import { setAuthData } from '../../features/auth/authState';
import { useSelector, useDispatch } from 'react-redux';


const LoginComponent = () => {


    const { persist, setPersist } = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || '/dashboard';

    console.log(from)

    const emailRef = useRef();
    const passRef = useRef();

    const [emailErr, setEmailErr] = useState(false);
    const [passErr, setPassErr] = useState(false);
    const [emailHelper, setEmailHelper] = useState('');
    const [passHelper, setPassHelper] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();
    const authData = useSelector((state) => state.authData);


    const togglePersist = (e) => {
        if(e.target.checked){
            setPersist(true);
        }else{
            setPersist(false)
        }
    }


    useEffect(() => {
        console.log('authData: ', authData)
    }, [authData])


    const handleLoginClick = async (e) => {
        e.preventDefault();

        setEmailHelper('');
        setPassHelper('');
        setIsLoading(true);

        const emailVal = emailRef.current.value.toLowerCase().trim();
        const passwordVal = passRef.current.value.trim();

        // login({ email: emailVal, pass: passwordVal}).then((loginData) => {
        //     // console.log('data: ', loginData)

        //     if (loginData.data) {
        //         //login successful, extract data
        //         const accessToken = loginData?.data?.accessToken;
        //         const roles = loginData?.data?.roles
        //         console.log(accessToken, roles)
        //         dispatch(setAuthData(loginData.data));
        //         navigate(from, { replace: true });
        //     }

        //     if (loginData.error) {

        //         const errr = loginData.error;

        //         if (!errr) {
        //             console.log(errr);
        //             return alert('Opps! No response received from the server!')
        //         }

        //         if (errr?.data.message === 'USER_NOT_FOUND') {
        //             setEmailErr(true);
        //             setEmailHelper('This email is not registered with us!');
        //             return
        //         }

        //         if (errr?.data.message === 'INCORRECT_PASSWORD') {
        //             setPassErr(true);
        //             setPassHelper('Password is incorrect!');
        //             return
        //         }


        //     }

        // });


        axios.post('http://localhost:4000/auth/login', {
            email: emailVal,
            password: passwordVal
        },
        {
            withCredentials: true // Need to pass it here as well to set the cookies in ress

        }).then(res => {
            console.log(res.data)
            dispatch(setAuthData(res.data));
            navigate(from, { replace: true });
        }).catch((errr) => {

            if (!errr?.response) {
                console.log(errr);
                return alert('Opps! No response received from the server!')
            }

            if (errr.response?.data.message === 'USER_NOT_FOUND') {
                setEmailErr(true);
                setEmailHelper('This email is not registered with us!');
                return
            }

            if (errr.response?.data.message === 'INCORRECT_PASSWORD') {
                setPassErr(true);
                setPassHelper('Password is incorrect!');
                return
            }

            return alert('Internal server error! Please try again later')
        }).finally(() => {
            setIsLoading(false);
        })
    }


    useEffect(() => {
        localStorage.setItem('persist', persist);
    }, [persist])
    return (
        <>
            <Container maxWidth="xs" sx={{

                borderRadius: '4px',
                textAlign: 'center',
                mt: '24px',
                background: '#ffffff',
                pt: '10px',
                pb: '20px',
                boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.08)'
            }}>

                <img alt="logo" style={{
                    maxWidth: '3rem',
                    margin: 'auto',
                    marginTop: '32px',
                    marginBottom: '16px',

                }} src='/logo192.png' />

                <Typography sx={{
                    fontSize: '20px',
                    marginTop: '16px',
                    marginBottom: '16px',
                }}>
                    Login to PaperTrade
                </Typography>

                <form onSubmit={(e) => handleLoginClick(e)}>
                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>


                        <TextField
                            autoFocus={true}
                            error={emailErr}
                            helperText={emailHelper}
                            onFocus={() => setEmailErr(false)}
                            margin="none"
                            size="small"
                            type="email"
                            required={true}
                            id="login-email"
                            label="Email"
                            name="email"

                            inputRef={emailRef}
                        // onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </Box>

                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>
                        <TextField
                            // onChange={(e) => { setPassword(e.target.value) }}

                            onFocus={() => setPassErr(false)}
                            error={passErr}
                            helperText={passHelper}
                            margin="none"
                            size="small"
                            type='password'
                            required={true}
                            id="login-passowrd"
                            label="Password"
                            inputRef={passRef}
                        />

                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'center', marginBottom: '1rem' }}>

                        <Checkbox defaultChecked={persist} onChange={togglePersist} size='small' sx={{ maxWidth: '10px', marginRight: '0.25rem' }} />
                        <Typography sx={{ fontSize: '0.75rem' }}>Remember me on this device</Typography>
                    </Box>


                    <Button variant='contained' sx={{
                        backgroundColor: '#ff5727',
                        width: '224px',
                        boxShadow: '0px 0px 0px',
                        textTransform: 'none',
                        marginBottom: '16px',
                        ":hover": {
                            backgroundColor: '#ff792e',
                            boxShadow: '0px 0px 0px',
                        }
                    }}
                        type='submit'

                    >
                        Login
                    </Button>

                </form>

                <Typography
                    sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                        cursor: 'pointer',
                        color: '#9b9b9b',
                        fontSize: '14px',
                        ":hover": {
                            color: '#313131'
                        }
                    }}
                    onClick={(e) => { navigate('/forgotpassword') }}
                >
                    Forgot your password?
                </Typography>


                <Typography
                    onClick={(e) => { navigate('/signup') }}
                    sx={{

                        marginBottom: '32px',
                        cursor: 'pointer',
                        color: '#9b9b9b',
                        fontSize: '12px',
                        ":hover": {
                            color: '#313131'
                        }

                    }}>
                    Create a new account
                </Typography>

                {isLoading
                    ? <LinearProgress />
                    : null
                    // : (loginRes?.data?.message === 'LOGIN_SUCCESS')
                    //     ? <Navigate to={from} replace />
                    //     : <></>
                }
            </Container>
        </>
    )
}

export default LoginComponent