import { Link, NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton } from '@mui/material';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import React, { useEffect, useState } from 'react';
import { signOut } from './features/user/userSlice';
import { useDispatch } from 'react-redux';

const Navbar = () => {
    const storedUser = localStorage.getItem('user');
    let [username, setUserName] = useState('אורח');
    const dispatch = useDispatch()
    useEffect(() => {
        if (storedUser) {
            try {
                const userData = JSON.parse(storedUser);
                setUserName(userData.name || 'אורח');
            } catch (error) {
                console.error('Error parsing user data:', error);
            }
        }
    }, [storedUser]);

    const handleSignOut = () => {
        dispatch(signOut()); // התנתקות מהסטייט
        setUserName('אורח'); // עדכון השם ל- "אורח"
    }
    return (
        <AppBar position="sticky" sx={{ boxShadow: 'none', direction: 'rtl', left: 0, zIndex: 100, marginBottom: "2%" }}>
            <Link to={"/"} style={{ margin: 'auto' }}>
                <img alt='logo' style={{ width: "60%", marginRight: "15%", marginBottom: "-7%", marginTop: "-3%" }} src={`https://storeserver-uoax.onrender.com/לוגו-removebg-preview.png`} />
            </Link>
            <Toolbar style={{ justifyContent: 'center' }}>
                <div style={{ fontSize: "13px" }}>{username}</div>
                {/* <Avatar>{username}</Avatar> */}
                <IconButton
                    component={NavLink}
                    to={username === "אורח" ? "/signin" : ""}
                    onClick={username === "אורח" ? "" : () => { handleSignOut() }}
                    size="small"
                    color="inherit"
                    sx={{
                        mr: 2,
                        height: 50,
                        borderRadius: 0,
                        fontSize: "18px"
                    }}
                >{username === "אורח" ? "התחברות" : "התנתקות"}</IconButton>

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