import axios from "axios";
import { useSelector } from "react-redux";


const baseUrl = "https://storeserver-uoax.onrender.com/";
let currentUser = useSelector(st => st.user.currentUser);

export const getAllOrders = async () => {
    try {
        let allOrders = await axios.get(`${baseUrl}`,
            {
                Headers: {
                    "x-access-token": `${currentUser.token}`
                }
            });
        return allOrders;
    }
    catch (err) {
        return err;
    }
}
export const addOrder = async (orderDetails) => {
    try {
        let addedOrder = await axios.post(`${baseUrl}`, orderDetails,
            {
                Headers: {
                    "x-access-token": `${currentUser.token}`
                }
            });
        return addedOrder;
    }
    catch (err) {
        return err;
    }
}
export const deleteOrderById = async (orderToDelete) => {
    let orderId = orderToDelete._id;
    try {
        let deletedOrder = await axios.delete(`${baseUrl}/${orderId}`,
            {
                Headers: {
                    "x-access-token": `${currentUser.token}`
                }
            });
        return deletedOrder;
    }
    catch (err) {
        return err;
    }
}
export const getAllOrdersByUserId = async () => {
    let userId = currentUser._id;
    try {
        let allOrders = await axios.get(`${baseUrl}/${userId}`,
            {
                Headers: {
                    "x-access-token": `${currentUser.token}`
                }
            });
        return allOrders;
    }
    catch (err) {
        return err;
    }
}
export const updateSetOffOrder = async (orderToUpdate) => {
    let orderId = orderToUpdate._id;
    try {
        let updatedOrder = await axios.put(`${baseUrl}/${orderId}`,
            {
                Headers: {
                    "x-access-token": `${currentUser.token}`
                }
            });
        return updatedOrder;
    }
    catch (err) {
        return err;
    }
}