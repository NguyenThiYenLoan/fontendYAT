import { axiosJWT } from "./UserService"

// export const createOrder = async (data) => {
//     const res = await axios.post(`https://ecommerce-backend-dgl7.onrender.com/api/order/create`, data)
//     return res.data
// }

export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/order/create`, data, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllOrderByUserId = async (id, access_token) => {
    // console.log('id anh access_token', id, access_token)
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/get-all-order/${id}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}
export const getAllOrderDetailApp = async (id, type) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/order/get-all-order-app/${id}?type=${type}`)
    return res.data
}

export const cancelOrder = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/order/cancel-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}


export const getDetailsOrder = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}


// làm trang quản lý đơn hàng
export const getAllOrder = async (access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/order/get-all-order`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}

// update cái nút đã giao hàng
export const updateOrder = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/update-order/${id}`, data, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllOrderNotification = async (id, access_token, shippingStatus) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/order/get-all-order-notification-app/${id}?shippingStatus=${shippingStatus}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
};


export const updateOrder1 = async (id, DeliveryStatus, access_token) => {
    console.log('ra ko', id, DeliveryStatus, access_token)
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/update-order-app/${id}?DeliveryStatus=${DeliveryStatus}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data
}
export const updateOrder2 = async (id, cancellationStatus, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/order/update-order-app1/${id}?cancellationStatus=${cancellationStatus}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    });
    return res.data
}