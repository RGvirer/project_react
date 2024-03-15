import { useDispatch } from "react-redux";
import { deleteProductsFromServer } from "./productsApi";
import { deleteProductInState } from "./productsSlice";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button, Drawer, ImageListItem } from "@mui/material";
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import Swal from 'sweetalert2';
import { addProductToCart } from "../order/OrderSlice";
import { useState } from "react";
import MiniCart from "../order/MiniCart";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

const ListItem = ({ one }) => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const userData = JSON.parse(localStorage.getItem("user"));
  const token = userData ? userData.token : null;
  const role = userData ? userData.role : null;
  const onMouseEnter = "https://storeserver-uoax.onrender.com/" + one.routingToImage[1];
  const onMouseLeave = "https://storeserver-uoax.onrender.com/" + one.routingToImage[0];
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleDeleteConfirmation = () => {
    Swal.fire({
      title: '?האם אתה בטוח שברצונך למחוק את המוצר',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'אישור',
      cancelButtonText: 'ביטול'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteProductsFromServer(one._id, token);
          dispatch(deleteProductInState(one._id));
          Swal.fire('המחיקה בוצעה בהצלחה', '', 'success');
        } catch (err) {
          Swal.fire('שגיאה', err.response.data, 'error');
        }
      }
    });
  }
  return (
    <>
      <div style={{ borderBottom: "1px solid black" }}>
        <div className="div-img-product">
          <Link to={`/details/${one._id}`} state={{ product: one }}>
            <ImageListItem key={one.routingToImage}>
              <img
                onMouseEnter={(e) => { e.currentTarget.src = onMouseEnter }}
                onMouseLeave={(e) => { e.currentTarget.src = onMouseLeave }}
                src={"https://storeserver-uoax.onrender.com/" + one.routingToImage[0]}
                alt={one.name}
                style={{ width: "100%" }}
              />
            </ImageListItem>
          </Link>

        </div>
        <Box sx={{ textAlign: "center" }}>
          {role === "admin" && <>
            <Button onClick={handleDeleteConfirmation} >מחק</Button>
            <Button onClick={() => { navigate("/edit/" + one._id) }}>ערוך</Button>
          </>}
          <Button onClick={() => { dispatch(addProductToCart(one)); toggleDrawer(); }}>
            <FavoriteBorderRoundedIcon />
          </Button>
          <Drawer open={open} onClose={() => toggleDrawer(false)}>
            {<Button style={{ borderRadius: "50%", width: "2%" }} onClick={() => toggleDrawer(false)}>
              <CloseRoundedIcon />
            </Button>}
            {<MiniCart />}
          </Drawer>
        </Box>
      </div>
      <p style={{ textAlign: "center" }}>{one.description}</p>
      <p style={{ textAlign: "center" }}>{`₪ ${one.price}.00`}</p>
    </>
  );
}

export default ListItem;