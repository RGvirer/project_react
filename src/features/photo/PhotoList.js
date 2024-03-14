import { useEffect } from "react";
import './PhotoList.css';
import { useDispatch, useSelector } from "react-redux";
import { getPhotosFromServer } from "./photosApi.js";
import { useState } from "react";
import CoordinatePoint from "./CoordinatePoint.js";
import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, Skeleton, Typography } from "@mui/material";
import { addPhotoToState } from "./PhotosSlice.js";
import { useNavigate } from "react-router-dom";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import { addProductToCart } from "../order/OrderSlice.js";

const PhotoList = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false); // הגדרת משתנה לסטייט של ה-Drawer
  const [page, setPage] = useState(1);
  let dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const baseUrl = "https://storeserver-uoax.onrender.com/";
  let photosArr = useSelector(state => state.photo.photosArr);
  const navigate = useNavigate();
  const [scrollTopLeft, setScrollTopLeft] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await getPhotosFromServer(page, 6, "");
        dispatch(addPhotoToState(response.data));
      } catch (error) {
        console.error('Error fetching photos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [page, dispatch]);

  const PhotoSkeleton = () => (
    <li className="photo-grid-item">
      <Skeleton animation="wave" variant="rectangular" width="32vw" height="80vh" />
    </li>
  );

  const openDetails = (product) => {
    navigate(`/details/${product._id}`, { state: { product } });
  }
  const handleDetailClick = (item) => {
    setSelectedPhoto(item);
    setDialogOpen(true); // פתיחת ה-Drawer כאשר לוחצים על התמונה
  };


  const handleCloseDialog = () => {
    setDialogOpen(false); // סגירת ה-Dialog
  };
  const handleScrollLeft = (e) => {
    setScrollTopLeft(e.target.scrollTop);
  };



  return (
    <div>
      {/* <Box style={{ position: 'relative', marginTop: "-4%", bottom: 0, zIndex: -1 }} >
        <img style={{ width: "100%" }} src={`${baseUrl}skogsta-ivar-2252f497be7583b8d3ee3652f399f0c9.png`} />
        <Typography style={{
          position: 'absolute',
          top: '50vh',
          color: "white",
          left: '50%',
          transform: 'translate(-50%, -50%)',
          padding: '5px',
          borderRadius: '5px',
          fontSize: "300%"
        }}>--- PERFECT DESIGN ---</Typography>
      </Box> */}
      {loading ?
        <ul className="photo-grid" container spacing={2}>
          {[...Array(6)].map((_, index) => (
            <PhotoSkeleton key={index} />
          ))}
        </ul> :
        <>
          {
            photosArr.length > 0 && (
              <>
                <ul className="photo-grid">
                  {photosArr.map((item) => (
                    <div key={item._id}>
                      <li className="photo-grid-item" onClick={() => handleDetailClick(item)}>
                        <CoordinatePoint one={item} />
                      </li>
                    </div>
                  ))}
                </ul>
                <Button style={{ display: 'block', margin: '0 auto', marginTop: "-100px" }} onClick={() => { setPage(prevPage => prevPage + 1); }}>
                  הצג 6 נוספים
                </Button>
              </>
            )
          }
        </>
      }

      <Dialog maxWidth="lg" sx={{ margin: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', overflow: 'hidden' }} open={dialogOpen} onClose={handleCloseDialog}>
        <Grid container rowSpacing={1} sx={{ direction: "rtl" }}>
          <Grid item xs={6} md={8}>
            <DialogTitle height={3}>פרטי התמונה </DialogTitle>
          </Grid>
          <Grid item xs={6} md={4} >
            <DialogActions>
              <Button style={{ height: "60px", borderRadius: "100%" }} onClick={handleCloseDialog}>
                <CloseRoundedIcon />
              </Button>
            </DialogActions>
          </Grid>
        </Grid>
        <DialogContent
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            direction: 'rtl',
          }}
        >
          <div style={{ width: "80%", overflowY: 'auto', flex: 1, scrollbarWidth: 'none' }}>
            {selectedPhoto && (
              <CoordinatePoint one={selectedPhoto} />
            )}
          </div>
          <div style={{ overflowY: 'auto', flex: 1, overflowX: 'hidden' }}>
            <ul style={{ width: "75%" }} onScroll={handleScrollLeft} scrollTop={scrollTopLeft}>
              {selectedPhoto && selectedPhoto.imageDetails.map((detail) => (
                <React.Fragment key={detail.product._id}>
                  <li style={{ width: "480px", height: "200px", display: "flex", alignItems: "center", marginBottom: "10px" }}>
                    <img
                      alt={detail.product.name}
                      onClick={() => openDetails(detail.product)}
                      src={`${baseUrl}${detail.product.routingToImage[0]}`}
                      style={{ cursor: "pointer", width: "23%", marginRight: "10px" }}
                      onMouseEnter={(e) => { e.currentTarget.src = `${baseUrl}${detail.product.routingToImage[1]}`; }}
                      onMouseLeave={(e) => { e.currentTarget.src = `${baseUrl}${detail.product.routingToImage[0]}`; }} />
                    <div style={{ width: "60%", marginRight: "10px" }}>
                      <p style={{ cursor: "pointer", marginRight: "40px" }} onClick={() => openDetails(detail.product)}>
                        <Typography sx={{ fontSize: "16px", textDecoration: "underline" }} variant='h6' className="tooltipDetails">{detail.product.name}</Typography>
                        <Typography style={{ fontSize: "15px" }} className="tooltipDetails">{detail.product.description}</Typography>
                        <Typography variant='h5' className="tooltipDetails">₪{detail.product.price}</Typography>
                      </p>
                    </div>
                    <Button style={{ width: "10%" }} onClick={() => { dispatch(addProductToCart(detail.product)); }}>
                      <FavoriteBorderRoundedIcon />
                    </Button>
                  </li>
                  <Divider width="125%" />
                </React.Fragment>
              ))}
            </ul>
          </div>
        </DialogContent>




      </Dialog>
    </div >

  );
}
export default PhotoList;