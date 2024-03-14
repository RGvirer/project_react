import { useLocation } from "react-router-dom";
import './Details.css'
import { Box, Button, Divider, Drawer, Grid, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useDispatch } from "react-redux";
import { addProductToCart } from "../order/OrderSlice";
import { useState } from "react";
import MiniCart from "../order/MiniCart";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const Details = () => {
    const location = useLocation();
    const dispatch = useDispatch()
    const [open, setOpen] = useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const { state: { product } = {} } = location;
    const baseUrl = "https://storeserver-uoax.onrender.com/";
    const handleGoBack = () => {
        window.history.back()
    };
    return (
        <div>

            {product && (
                <>
                    <Box sx={{ flexGrow: 1 }} >
                        <Grid container spacing={2} class="container">
                            <Grid item xs={4} style={{ direction: "rtl" }} class="non-scrollable">
                                <div style={{ display: "grid", gridTemplateColumns: 'repeat(2,1fr)' }}>
                                    <h3>{product.name}</h3>
                                    <Button style={{ borderRadius: "100%", width: "2%" }} onClick={() => { dispatch(addProductToCart(product)); toggleDrawer(); }}>
                                        <FavoriteBorderRoundedIcon />
                                    </Button>
                                    <Drawer open={open} onClose={() => toggleDrawer(false)}>
                                        {<Button style={{ borderRadius: "50%", width: "2%" }} onClick={() => toggleDrawer(false)}>
                                            <CloseRoundedIcon />
                                        </Button>}
                                        {<MiniCart />}
                                    </Drawer>
                                </div>
                                <p>{product.description}</p>
                                <p style={{ fontSize: "30px", margin: 0 }}>₪{product.price}</p>
                                <br />
                                <Typography>מידות: {product.size}</Typography>
                                <br />
                                <Divider width="95%" />
                                <br />
                                <br />
                                <h3>טוב לדעת...</h3>
                                <p>{product.details}</p>
                                {/* {window.history.back()==='http://localhost:3000/products'&& */}
                                <Button sx={{ display: 'block', margin: '0 auto' }} onClick={handleGoBack}>אחורה</Button>
                                {/* } */}
                            </Grid>
                            <Grid item xs={8} className="scrollable" >
                                <ul style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                                    {product.routingToImage.map((imageName) => (
                                        <li key={imageName._id} style={{ width: "100%" }}>
                                            <a href={`${baseUrl}${imageName}`} target="_blank" rel="noreferrer" style={{ width: "100%" }}>
                                                <img className="images" style={{ width: "100%" }} src={`${baseUrl}${imageName}`} alt={imageName} />
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </Grid>

                        </Grid>
                    </Box>
                </>
            )}
        </div>


    );
}

export default Details;