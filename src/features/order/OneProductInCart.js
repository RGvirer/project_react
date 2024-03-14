import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import { Box, Button, ButtonGroup, Link, ListItemButton, TableCell, TableRow, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { changeAmount, deleteProductFromCart } from './OrderSlice.js';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

const OneProductInCart = ({ oneProduct, index }) => {
    const dispatch = useDispatch();
    const baseUrl = "https://storeserver-uoax.onrender.com/";

    useEffect(() => {
        console.log('Product Amount:', oneProduct.amount);
    }, [oneProduct.amount]);

    const incAmount = (index) => {
        let changeDetails = {
            index,
            amount: 1
        }
        dispatch(changeAmount(changeDetails));
    }
    const decAmount = (index) => {
        let changeDetails = {
            index,
            amount: -1
        }
        dispatch(changeAmount(changeDetails));
    }
    const deleteProduct = (index) => {
        dispatch(deleteProductFromCart(index));
    }
    return (<>
        <TableRow key={oneProduct.name}>

            <TableCell component="th">
                {/* secondary={`₪${oneProduct.price}, total payment: ${oneProduct.price * oneProduct.amount}`} */}
                <div>
                    <ListItemText style={{ textAlign: 'right', fontVariant: 'titling-caps' }} primary={`${oneProduct.description}`} />
                    <ListItemText style={{ textAlign: 'right' }} primary={`₪${oneProduct.price}`} />
                </div>
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }}>
                    <Link style={{ cursor: "pointer" }} onClick={() => { deleteProduct(index) }}>הסרה</Link>
                    <ButtonGroup >
                        <Button
                            onClick={() => { decAmount(index) }}>
                            < RemoveIcon />
                        </Button>
                        <Button>{oneProduct.amount}</Button>
                        <Button
                            onClick={() => { incAmount(index) }}>
                            < AddIcon />
                        </Button>
                    </ButtonGroup>
                </Box>
                <ListItemText style={{ textAlign: 'right' }} secondary={`₪${oneProduct.price * oneProduct.amount}`}></ListItemText>
            </TableCell>
            <TableCell component="th">
                <img alt="תמונת המוצר" style={{ width: "100px" }} src={`${baseUrl}${oneProduct.routingToImage[0]}`} />
            </TableCell>
        </TableRow>
    </>
    );
}

export default OneProductInCart;