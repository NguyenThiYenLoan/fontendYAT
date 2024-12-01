import axios from "axios"
export const axiosJWT = axios.create()

export const getNumberOfVisits = async () => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/nov/get-NumberOfVisits`)
    return res.data
}

export const createNumberOfVisits = async (data) => {
    console.log('rako', data);
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/nov/create-NumberOfVisits`, data)
    return res.data
}