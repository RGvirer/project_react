import axios from "axios";

const baseUrl = "https://storeserver-uoax.onrender.com";

export const signin = (email, password) => {
  return axios.post(`${baseUrl}/api/users/login`, { email, password });
};

export const signup = (firstName, lastName, password, email) => {
  return axios.post(`${baseUrl}/api/users`, { name: `${firstName} ${lastName}`, password, email });
};