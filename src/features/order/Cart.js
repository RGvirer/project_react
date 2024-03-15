import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import List from '@mui/material/List';
import OneProductInCart from './OneProductInCart';
import { useSelector } from 'react-redux';
import ListItem from '@mui/material/ListItem';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.order.cart);
    const numProductsInCart = useSelector(state => state.order.numProductsInCart);
    const amountToPay = useSelector(state => state.order.amountToPay);
    useEffect(() => { }, [cart]);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <Typography variant='h5' align='center'>עגלת קניות</Typography>
            <List>
                {cart.length === 0 ? <Typography align='center'>עגלת הקניות שלך ריקה</Typography> : null}
                {cart.map((oneProduct, index) => {
                    return (
                        <ListItem
                            key={index} >
                            <OneProductInCart oneProduct={oneProduct} index={index} />
                        </ListItem>
                    )
                })}
            </List>
            {cart.length > 0 &&
                <Box style={{ width: "20vw", margin: "3%", border: "3px solid", padding: "1%", direction: 'rtl' }}>

                    <Typography>{`הוזמנו ${numProductsInCart} מוצרים`}</Typography>
                    <Typography>{`סכום לתשלום: ${amountToPay}`} </Typography>
                    <Button
                        variant='outlined'
                        onClick={() => { navigate('/order') }}
                    >לתשלום
                    </Button>
                    <Button
                        variant='outlined'                   
                        onClick={() => { navigate('/products') }}
                    >המשך בקניות
                    </Button>
                </Box>}
            {cart.length === 0 && <Button
                variant='outlined'
                onClick={() => { navigate('/products') }}
            >המשך בקניות
            </Button>}
        </div >

    );
}

export default Cart;