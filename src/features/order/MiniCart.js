import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import OneProductInCart from './OneProductInCart';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCartFromStorage } from './OrderSlice';

const MiniCart = () => {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const cart = useSelector(state => state.order.cart);
    const numProductsInCart = useSelector(state => state.order.numProductsInCart);
    const amountToPay = useSelector(state => state.order.amountToPay);
    useEffect(() => {
        dispatch(getCartFromStorage());
    }, [dispatch]);

    return (
        <div>
            <Typography variant='h5' align='center'>עגלת קניות</Typography>
            <List sx={{}}>
                {cart.length === 0 ? <h3>עגלת הקניות שלך ריקה</h3> : null}
                {cart.map((oneProduct, index) => {
                    return (
                        <ListItem key={index} >
                            <OneProductInCart oneProduct={oneProduct} index={index} />
                        </ListItem>
                    )
                })}
            </List>
            <Box style={{ margin: "3%", border: "2px solid", padding: "1%", direction: 'rtl' }}>

                <Typography>{`הוזמנו ${numProductsInCart} מוצרים`}</Typography>
                <Typography>{`סכום לתשלום: ${amountToPay}`} </Typography>
                <Button
                    variant='outlined'
                    onClick={() => { navigate('/order') }}
                >לתשלום
                </Button>
            </Box>
        </div >

    );
}

export default MiniCart;