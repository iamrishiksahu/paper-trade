import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { app_logo_url } from '../../app/constants';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useEffect } from 'react';
import { height, styled } from '@mui/system';
import useLogout from '../../hooks/useLogout';

const pages = ['Dashboard', 'Orders', 'Positions', 'Funds'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

function Navbar() {

    const navigate = useNavigate();
    const logout = useLogout();

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [theme, setTheme] = useState('light-theme');

    const handleThemeChange = () => {
        if (theme === 'light-theme') {
            setTheme('dark-theme');
        } else {
            setTheme('light-theme');
        }
    }

    useEffect(() => {
        document.body.className = theme;
    }, [theme])


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = (e) => {
        setAnchorElNav(null);

        switch (e) {
            case 'Dashboard':
                navigate('/dashboard/');
                break;
            case 'Orders':
                navigate('/dashboard/orders');
                break;
            case 'Positions':
                navigate('/dashboard/positions');
                break;
            case 'Funds':
                navigate('/dashboard/funds');
                break;
        }
    };

    const handleSettingClick = async (e) => {
        setAnchorElUser(null);
        switch (e) {
            case 'Profile':
                break;
            case 'Account':
                break;
            case 'Dashboard':
                break;
            case 'Logout':
                await logout();
                navigate('/login');
                break;
            default:


        }
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <StyledAppBar id='navbar_main_container' elevation={0} position="fixed" >
            <Container maxWidth="none" style={{paddingLeft: '2rem', paddingRight: '2rem'}} >


                <Toolbar disableGutters sx={{}}>

                    <img alt="logo" style={{
                        maxWidth: '24px',
                        margin: 'auto',
                        marginTop: '16px',
                        marginBottom: '16px',
                        marginRight: '8px',

                    }} src='/logo192.png' />

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted={false}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem sx={{}} key={page} onClick={() => handleCloseNavMenu(page)}>
                                    <Typography sx={{ textTransform: 'none', color: 'black.text' }} textAlign="center">{page}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* ADD LOGO OF THE APPLICATION FOR MOBILE VIEW */}

                    {/* <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href=""
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO */
                        /* </Typography> */}
                    <Box sx={{ marginRight: '30px', textAlign: 'right', justifyContent: 'flex-end', flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button

                                key={page}
                                onClick={() => handleCloseNavMenu(page)}
                                sx={{ my: 2, color: 'black.text', display: 'block', textTransform: 'none' }}
                            >
                                {page}
                            </Button>
                        ))}

                    </Box>
                    <Divider orientation="vertical" variant='middle' flexItem sx={{
                        marginRight: '30px',
                    }} />

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ p: 0, maxHeight: '32px', maxWidth: '32px' }} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem onClick={() => handleSettingClick(setting)} key={setting} >
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container>
        </StyledAppBar>
    );
}


const StyledAppBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0 1px 5px 0 rgba(0,0,0,0.1)',
    // borderBottom: '1px solid #cbcbcb',
    zIndex: '10000'
}))

export default Navbar;