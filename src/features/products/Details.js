import { useLocation } from "react-router-dom";
import './Details.css'
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Divider, Drawer, Grid, Typography } from "@mui/material";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { useDispatch } from "react-redux";
import { addProductToCart } from "../order/OrderSlice";
import { useState } from "react";
import MiniCart from "../order/MiniCart";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded';
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
                    <Box sx={{ flexGrow: 1 }}>
                        <Grid container spacing={5} className="container">
                            {/* Left Grid */}
                            <Grid item xs={12} md={4} style={{ direction: "rtl", borderRight: " 1px solid", paddingRight: "3%" }} className="non-scrollable">
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
                                <Button sx={{ display: 'block', margin: '0 auto' }} onClick={handleGoBack}>אחורה</Button>
                            </Grid>
                            {/* Right Grid */}
                            <Grid item xs={12} md={8} className="container" style={{ maxHeight: 'calc(100vh - 64px)', overflowY: 'auto' }}>
                                <Grid container spacing={2} className="container">
                                    {/* Images Grid */}
                                    <Grid item xs={12} className="scrollable">
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
                                    {/* Accordions Grid */}
                                    <Grid sx={{ direction: "rtl" }} item xs={12} className="scrollable">
                                        <div>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreRoundedIcon />}
                                                    aria-controls="panel1-content"
                                                    id="panel1-header"
                                                >
                                                    משלוחים
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography>עלות משלוח 30 שקלים</Typography>
                                                    <Typography>משלוח בחינם בקנייה מעל 300 שקל</Typography>
                                                    <Typography>שליח עד 10 ימי עסקים</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <Accordion>
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreRoundedIcon />}
                                                    aria-controls="panel2-content"
                                                    id="panel2-header"
                                                >
                                                    החזרות וביטולים
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    <Typography> ביטול העסקה יהיה בתוקף אך ורק לאחר קבלת פקס או דואר אלקטרוני מהחברה המאשר את הבקשה לביטול העסקה. במקרה שהביטול אושר – יש להשיב את המוצר לחברה כאשר כל העלויות הכרוכות בהחזרת המוצר תחולנה על הלקוח. החזרת המוצר תיעשה כשהוא באריזתו המקורית בצירוף החשבונית המקורית ושעדיין לא חלפו 48 שעות מתאריך רכישת המוצר. תוך 48 שעות יתקבל כסף חזרה בניכוי של 5% מעלות המוצר. החלפה תוך 14 ימי עסקים מתאריך הרכישה.</Typography>
                                                    <Typography>
                                                        החזרות/החלפות עד 14 יום מיום קבלת המוצרים. (תמיד נשתדל להיות גמישים במקרה ולא מתאפשר לכם לבצע הזמנה במועד)</Typography>
                                                    <Typography>
                                                        יתקבלו חזרה מוצרים אך ורק מוצרים שלא ניזוקו ושלא נעשה בהם שימוש. המוצרים יוחזרו באריזתם המקורית כשהיא שלמה ונקיה.</Typography>
                                                </AccordionDetails>
                                            </Accordion>
                                            <div style={{height:"30vh"}}></div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Box>



                </>
            )
            }
        </div >


    );
}

export default Details;