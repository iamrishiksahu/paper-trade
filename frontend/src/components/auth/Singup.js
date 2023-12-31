import React from 'react'
import { Typography, Container, TextField, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const SignupCompnent = () => {
    const navigate = useNavigate();



    const handleSignupclick = (e) => {



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
                    Create an account
                </Typography>

                <form onSubmit={(e) => handleSignupclick(e)} >

                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>
                        <TextField
                            autoFocus={true}
                            sx={{ marginLeft: 'auto', marginRight: 'auto' }}
                            margin="none"
                            size="small"
                            type="name"
                            required={true}
                            id="login-firstname"
                            label="First name"
                        />


                    </Box>

                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>
                        <TextField
                            sx={{ marginLeft: 'auto', marginRight: 'auto', }}

                            margin="none"
                            size="small"
                            type="name"
                            id="login-lastname"
                            label="Last name"
                        />

                    </Box>



                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>


                        <TextField


                            margin="none"
                            size="small"
                            type="email"
                            required={true}
                            id="login-email"
                            label="Email"
                        />
                    </Box>

                    <Box sx={{
                        marginTop: '16px',
                        marginBottom: '16px',
                    }}>
                        <TextField
                            sx={{ marginLeft: 'auto', marginRight: 'auto' }}

                            margin="none"
                            size="small"
                            type="password"
                            required={true}
                            id="login-passowrd"
                            label="Password"
                        />

                    </Box>


                    <Button type='submit' variant='contained' sx={{
                        backgroundColor: '#ff5727',
                        width: '224px',
                        boxShadow: '0px 0px 0px',
                        textTransform: 'none',
                        marginBottom: '16px',
                        ":hover": {
                            backgroundColor: '#ff792e',
                            boxShadow: '0px 0px 0px',
                        }
                    }}>
                        Sign up
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

export default SignupCompnent