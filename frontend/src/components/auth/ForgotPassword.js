import React, { useState } from 'react'
import { Typography, Container, TextField, Box, Button } from '@mui/material';
import { axiosInstance as axios } from '../../api/axiosConfig';
import { useNavigate } from 'react-router-dom';



const ForgotPassowrd = () => {

    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState(false);
    const [emailErrHelper, setEmailErrHelper] = useState(false);

    const navigate = useNavigate();

    const handleResetClicked = (e) => {
        e.preventDefault();

        setEmailErr(false);
        setEmailErrHelper('');

        axios.post('/auth/resetpassword', {
            email: email,
        }).then(data => {
            console.log(data);
            alert('Password reset link sent successfully on your email!')
        }).catch((errr) => {
            console.log(errr)

            if (errr.response?.data.message === 'USER_NOT_FOUND') {
                setEmailErr(true);
                setEmailErrHelper('This email is not registered with us!');
                return
            }
        })

    }


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
                    maxWidth: '64px',
                    margin: 'auto',
                    marginTop: '16px',
                    marginBottom: '16px',

                }} src='/logo192.png' />


                <Typography sx={{
                    fontSize: '20px',
                    marginTop: '16px',
                    marginBottom: '16px',
                }}>
                    Forgot your password?
                </Typography>

                <form onSubmit={(e) => handleResetClicked(e)}>

                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>


                        <TextField
                            autoFocus={true}
                            onFocus={() => setEmailErr(false)}
                            error={emailErr}
                            helperText={emailErrHelper}
                            margin="none"
                            size="small"
                            type="email"
                            required={true}
                            id="login-email"
                            label="Email"

                            onChange={(e) => { setEmail(e.target.value) }}
                        />
                    </Box>

                    <Button variant='contained' sx={{
                        backgroundColor: '#ff5727',
                        textTransform: 'none',
                        width: '224px',
                        boxShadow: '0px 0px 0px',
                        marginBottom: '16px',
                        ":hover": {
                            backgroundColor: '#ff792e',
                            boxShadow: '0px 0px 0px',
                        }
                    }}

                    >
                        Reset
                    </Button>

                </form>

                <Typography
                    onClick={(e) => { navigate('/login') }}
                    sx={{
                        marginBottom: '32px',
                        marginTop: '16px',
                        cursor: 'pointer',
                        color: '#9b9b9b',
                        fontSize: '14px',
                        ":hover": {
                            color: '#313131'
                        }
                    }}>
                    &lt; Back to login

                </Typography>

            </Container>






        </>
    )
}

export default ForgotPassowrd