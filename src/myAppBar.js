import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import FunctionsIcon from '@mui/icons-material/Functions';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import MenuItem from '@mui/material/MenuItem';

const CONTEXT_DASHBOARD = "dashboard";
const CONTEXT_ACCOUNT = "account";

export default ( props ) => {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <FunctionsIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        Sigma
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                    </Box>
                    <FunctionsIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
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
                        Sigma
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        { props.connected ?  <><Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar sx={{ border:`solid`  }} alt="Christian Sharp" src={ props.src }/>
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
                                <MenuItem onClick={ e => { handleCloseUserMenu(); props.callback("context",CONTEXT_ACCOUNT); } } >
                                    <Typography textAlign="center">Account</Typography>
                                </MenuItem>
                                { props.isAdmin && <MenuItem onClick={ e => { handleCloseUserMenu(); props.callback("context",CONTEXT_DASHBOARD); } }>
                                    <Typography textAlign="center">Dashboard</Typography>
                                </MenuItem> }
                                { props.isCreater && <MenuItem onClick={ e => { handleCloseUserMenu(); props.callback("context",CONTEXT_DASHBOARD); } }>
                                    <Typography textAlign="center">Create</Typography>
                                </MenuItem> }


                                <MenuItem onClick={ e => { handleCloseUserMenu(); props.callback("connected",false); } } >
                                    <Typography textAlign="center">Disconnect</Typography>
                                </MenuItem>
                            </Menu></> :
                            <IconButton onClick={ e => props.callback("connected" , ! props.connected)} sx={{ p: 0 }}>
                                <AccountBalanceWalletIcon />
                            </IconButton> }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};


