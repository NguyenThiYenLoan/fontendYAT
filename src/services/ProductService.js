import axios from "axios"
import { axiosJWT } from "./UserService"

export const getAllProduct = async (search, limit) => {
    let res = {}
    if(search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getAll?filter=name&filter=${search}&limit=${limit}`)
        return res.data
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getAll?limit=${limit}`)
        
    }
    return res.data
}

export const getAllProductType = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getAllProduct`)
    return res.data
}

export const getProductType = async (type, page, limit) => {
    if(type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/product/create`, data)
    return res.data
}

export const getDetailProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/details/${id}`)
    return res.data
}

export const updateProduct = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/product/update/${id}`, data, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/product/delete/${id}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteProductMany = async (data, access_token) => {
    // tại vì ta nhận --ids-- thông qua --rea.body-- nên sẽ dùng --post-- để nhận
    // còn khi nào nhận --id-- thông qua --url-- thì mói dùng --delete--
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/product/delete-many`, data,  {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-all-type`)
    return res.data
}


export const getSellingProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-selling-products`)
    return res.data
}
export const getNewProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-new-product`)
    return res.data
}
export const getHighestPricedProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-highest-priced-products`)
    return res.data
}
export const getLowestPricedProducts = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-lowest-priced-products`)
    return res.data
}
export const getRandomProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/get-random-product`)
    return res.data
}

export const getSearch = async (name) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/product/search?name=${name}`)
    return res.data
}
