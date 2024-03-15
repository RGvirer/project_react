import { Link, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import React from 'react';

const Navbar = () => {
    const storedUser = localStorage.getItem('user');
    let username = 'אורח';

    try {
        if (storedUser) {
            const userData = JSON.parse(storedUser);
            username = userData.name || username;
        }
    } catch (error) {
        console.error('Error parsing user data:', error);
    }
    return (
        <AppBar position="sticky" sx={{ boxShadow: 'none', direction: 'rtl', position: 'sticky', left: 0, zIndex: 100, marginBottom: "2%" }}>
            <Link to={"/"} style={{ margin: 'auto' }}>
                <img alt='logo' style={{ width: "60%",marginRight:"15%" ,marginBottom:"-7%"}} src={`https://storeserver-uoax.onrender.com/לוגו-removebg-preview.png`} />
            </Link>
            <Toolbar style={{ justifyContent: 'center' }}>
                <div style={{ border: "2px solid white", padding: "1%", borderRadius: "15%" }}>{username}</div>
                {/* <Avatar>{username}</Avatar> */}
                <IconButton
                    component={NavLink}
                    to="/signin"
                    size="small"
                    color="inherit"
                    sx={{
                        mr: 2,
                        height: 50,
                        borderRadius: 0,
                        fontSize: "18px"
                    }}
                >התחברות</IconButton>

                <IconButton
                    component={NavLink}
                    to="/products"
                    size="small"
                    color="inherit"
                    sx={{
                        mr: 2,
                        height: 50,
                        borderRadius: 0,
                        fontSize: "18px"
                    }}
                >לכל המוצרים</IconButton>
                <IconButton
                    component={NavLink}
                    to="/"
                    size="small"
                    color="inherit"
                    sx={{
                        mr: 2,
                        height: 50,
                        borderRadius: 0,
                        fontSize: "18px"
                    }}
                >דף הבית</IconButton>
                <IconButton
                    component={NavLink}
                    to="/cart"
                    size="small"
                    color="inherit"
                    sx={{
                        mr: 2,
                        height: 40,
                        width: 40,
                        borderRadius: 0,
                        // fontSize: "20px"
                    }}>
                    <ShoppingBagOutlinedIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;