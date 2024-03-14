import axios from "axios";

const baseUrl = "https://storeserver-uoax.onrender.com";

export const getProductsFromServer = (page = 1, pageSize = 10) => {
  return axios.get(`${baseUrl}/api/products`, {
    params: { page, pageSize }
  });
};

export const getProductByIdFromServer = (id) => {
  return axios.get(`${baseUrl}/api/products/${id}`);
};
// export const getPhotosFromServer = (photosInScreen, numOfScreen, textToSearch, minPrice, maxPrice) => {
//   const params = {
//     ...(photosInScreen && { photosInScreen }),
//     ...(numOfScreen && { numOfScreen }),
//     ...(textToSearch && textToSearch !== '' && { textToSearch }),
//     ...(minPrice && { minPrice }),
//     ...(maxPrice && { maxPrice })
//   }; 
//   return axios.get(`${baseUrl}/api/photos`, {params});  
// };

export const deleteProductsFromServer = (id, token) => {
  return axios.delete(`${baseUrl}/api/products/${id}`, {
    headers: { "x-access-token": token },
  });
};

export const addProductsToServer = (product, token) => {
  return axios.post(`${baseUrl}/api/products`, product, {
    headers: { "x-access-token": token },
  });
};

export const updateProductByIdInServer = (id, product, token) => {
  return axios.put(`${baseUrl}/api/products/${id}`, product, {
    headers: { "x-access-token": token },
  });
};
