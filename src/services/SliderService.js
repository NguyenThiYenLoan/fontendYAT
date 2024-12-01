import axios from "axios"
import { axiosJWT } from "./UserService"


export const createSlider = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/slider/create`, data)
    return res.data
}

export const getAllSlider = async (search, limit) => {
    let res = {}
    if(search?.length > 0) {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/slider/getAll?filter=name&filter=${search}&limit=${limit}`)
        return res.data
    } else {
        res = await axios.get(`${process.env.REACT_APP_API_URL}/api/slider/getAll?limit=${limit}`)
        
    }
    return res.data
}

export const updateSlider = async (id, access_token, data) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/slider/update/${id}`, data, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteSlider = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/slider/delete/${id}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteSliderMany = async (data, access_token) => {
    // tại vì ta nhận --ids-- thông qua --rea.body-- nên sẽ dùng --post-- để nhận
    // còn khi nào nhận --id-- thông qua --url-- thì mói dùng --delete--
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/slider/delete-many`, data,  {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const getDetailsSlider = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/slider/details/${id}`)
    return res.data
}



