import axios from "axios";

const baseUrl = "https://storeserver-uoax.onrender.com";

export const getProductsFromServer = (numOfScreen = 1, productsInScreen) => {
  return axios.get(`${baseUrl}/api/products`, {
    params: { productsInScreen, numOfScreen }
  });
};

export const getProductByIdFromServer = (id) => {
  return axios.get(`${baseUrl}/api/products/${id}`);
};

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
