import { useState, useEffect } from 'react';
import { Box, Button, FormControl, IconButton, ImageList, ImageListItem, InputLabel, OutlinedInput, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { addProductsToServer, getProductByIdFromServer, updateProductByIdInServer } from '../products/productsApi.js';
import { useDispatch } from 'react-redux';
import { saveAllFromServer } from '../products/productsSlice.js';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

const EditProduct = ({ isDefaultValues }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    details: "",
    routingToImage: [],
  });
  const { register } = useForm();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDirty, setIsDirty] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const baseUrl = "https://storeserver-uoax.onrender.com/";

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
    setIsDirty(true);
  };


  const handleUpdateProduct = async () => {
    try {
      const userToken = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).token : null;
      if (isDefaultValues) {
        await updateProductByIdInServer(id, product, userToken);
      }
      else {
        await addProductsToServer(product, userToken);
      }
      dispatch(saveAllFromServer());
      alert("הנתונים התעדכנו");
      setIsDirty(false);
      navigate('/products');
    }
    catch (error) {
      console.error('Error updating product:', error);
      if (error.response && error.response.data) {
        alert(error.response.data);
      } else {
        alert("שגיאה בעדכון המוצר");
      }
    }
  };



  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Fetch product only if id is present and isDefaultValues is true
        if (id && isDefaultValues) {
          const response = await getProductByIdFromServer(id);
          const data = response.data;
          setProduct(data);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('לא נמצא מידע על מוצר כזה');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, isDefaultValues]);

  if (loading) {
    return <div>...טוען</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!product) {
    return <div>No product found</div>;
  }

  return (
    <>
      <Typography variant="h5" sx={{ marginBottom: "-3%" }} align='center'>{isDefaultValues ? "עריכת מוצר" : "הוספת מוצר"}</Typography>
      <Box style={{ margin: "3%", border: "3px solid", padding: "1%" }}>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
            direction: "rtl",
          }}
          noValidate
          autoComplete="off"
          display="grid"
          gridTemplateColumns="repeat(2,1fr)"
        >
          <div>
            <div>
              <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel htmlFor="name">שם</InputLabel>
                <OutlinedInput
                  style={{ width: "30vw" }}
                  id="name"
                  name="name"
                  value={product.name}
                  label="שם"
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>

            <div>
              <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel htmlFor="description">תאור</InputLabel>
                <OutlinedInput
                  style={{ width: "30vw" }}
                  multiline
                  id="description"
                  name="description"
                  value={product.description}
                  label="תאור"
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>

            <div>
              <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel htmlFor="price">מחיר</InputLabel>
                <OutlinedInput
                  {...register("password", { required: "שדה חובה" })}
                  style={{ width: "30vw" }}
                  id="price"
                  name="price"
                  value={product.price}
                  label="מחיר"
                  type={Number}
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>

            <div>
              <FormControl style={{ marginBottom: '10px' }}>
                <InputLabel htmlFor="details">פרטים</InputLabel>
                <OutlinedInput
                  style={{ width: "30vw" }}
                  multiline
                  id="details"
                  name="details"
                  value={product.details}
                  label="פרטים"
                  onChange={handleInputChange}
                />
              </FormControl>
            </div>
          </div>
          <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
            {product.routingToImage.map((item, index) => (
              <ImageListItem key={item}>
                <img
                  srcSet={`${baseUrl}${item}`}
                  src={`${baseUrl}${item}`}
                  alt={`Image ${index + 1}`}
                  loading="lazy"
                />
                <IconButton
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '50%',
                    padding: '4px',
                  }}
                >
                  <CloseRoundedIcon />
                </IconButton>
              </ImageListItem>
            ))}
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </ImageList>
        </Box>
        <Button disabled={!isDirty} variant="contained" color="primary" onClick={handleUpdateProduct}>{isDefaultValues ? "עדכן מוצר" : "הוסף מוצר"}</Button>
      </Box>
    </>
  );
};

export default EditProduct;
