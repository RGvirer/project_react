import axios from "axios";

const baseUrl = "https://storeserver-uoax.onrender.com";

export const getPhotosFromServer = (numOfScreen, photosInScreen, textToSearch) => {
  return axios.get(`${baseUrl}/api/photos?numOfScreen=${numOfScreen}&photosInScreen=${photosInScreen}&textToSearch=${textToSearch}`);
};
// export const getPhotosFromServer = () => {
//   return axios.get(`${baseUrl}/api/photos`); 
// };
export const addPhotosToServer = (photo, token) => {
  return axios.post(`${baseUrl}/api/photos`, photo, {
    headers: { "x-access-token": token },
  });
};