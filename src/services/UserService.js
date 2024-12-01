import axios from "axios"

// khi dúng getDetail mình sẽ dùng cái thằng này
// để cho khi mình gọi tới GetDetail thì sẽ gọi tới --Userservice.axiosJWT
export const axiosJWT = axios.create()

// đây là nơi chứa tất cả call API của user 

// đăng nhập
export const loginUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-in`, data)
    return res.data
}

// kiểm tra tra email có tồn tại
export const CheckEmail = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/check-email`, data)
    return res.data
}
export const CheckOTP = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/check-otp`, data)
    return res.data
}
export const ChangePassword = async (data) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/api/user/change-password`, data)
    return res.data
}


// đăng ký
export const checkEmailSignUp = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/check-email-sign-up`, data)
    return res.data
}
export const checkOTPSignUp = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/check-otp-sign-up`, data)
    return res.data
}
export const signupUser = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/sign-up`, data)
    return res.data
}

// sau khi đăng nhập ta lấy được --id và access_token--
// ta sẽ lấy chúng và thực hiện tìm kiếm --thông tin user-- qua --id và access_token--
// nếu là --admin-- thì cho xem hết
// còn là --user-- thì chỉ xem dx thông tin của --user-- đó
export const getDetailsUser = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/api/user/get-details/${id}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}


// thêm --refreshToken-- zo để đưa lên host
export const refreshToken = async (refreshToken) => {
    // console.log('refreshToken', refreshToken)
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/refresh-token`, {}, {
        // này có tác dụng khi mà có --cookie-- nó sẽ tự động lấy cho mình rồi chuyền xuống backend
        // withCredentials: true
        headers: {
            token: `Bearer ${refreshToken}`,
        }
    })
    return res.data
}

export const logoutUser = async () => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/user/log-out`)
    return res.data
}

export const updateUser = async (id, data, access_token) => {
    // phải bỏ cái --axiosJWT-- để tránh --access_token-- hết hạn nó sẽ lỗi 
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/api/user/update-user/${id}`, data, {
    // const res = await axios.put(`${process.env.REACT_APP_API_URL}/user/update-user/${id}`, data, {
        // này dùng để làm chỉ có user đó hoặc là admin mới có quyền xửa thông tin
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}



export const getAllUser = async (access_token) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/getAll`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteUser = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/api/user/delete-user/${id}`, {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}

export const deleteUserMany = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/api/user/delete-many`, data,  {
        headers: {
            token: `Brearer ${access_token}`,
        }
    })
    return res.data
}