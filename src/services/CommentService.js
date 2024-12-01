import axios from "axios"
export const axiosJWT = axios.create()

// đây là nơi chứa tất cả call API của comment

// export const updateComment = async (id, data, access_token) => {
//     const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/comment/update-comment/${id}`, data)
//     return res.data
// }

export const getAllComment = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comment/getAllComment`, data)
    return res.data
}

export const deleteComment = async (id, access_token) => {
    const res = await axios.delete(`${process.env.REACT_APP_API_URL}/api/comment/delete-conmment/${id}`)
    return res.data
}

export const createComment = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/comment/create-comment`, data)
    return res.data
}