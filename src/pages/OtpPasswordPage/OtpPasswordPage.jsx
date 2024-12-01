import React, { useEffect, useState } from 'react'
import { PasswordRetrievalPage_Content, SigninPage_Content_Form_Heading, SigninPage_Content_Form_Text, WrapperContainer, WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents'
import { useLocation, useNavigate } from 'react-router-dom'
import Loading from '../../components/loadingComponents/Loading'

// thư viện dùng để lấy dư liệu access token phía client thì phải
import { jwtDecode } from "jwt-decode";

// link tới trang --UserService--
import * as UserService from '../../services/UserService'

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from '../../hooks/useMutationHooks'

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
// import * as message from '../../components/Message/Message'

// sau khi --login-- thành công thi add thư viện này zo n
// dùng để lấy thông tin của user
import { useDispatch } from 'react-redux'

const OtpPasswordPage = () => {

    // tạo ra các --biến và set-- nhằm để truyền dữ liệu vào --thông qua set-- và lấy dữ liệu dùng --thông qua tên còn lại--
    // bằng cách sử dụng thư viện --useState()-- của --react--
    const [otp, setOtp] = useState('')

    // khi ở trang --productDetail-- khai báo và đx bên đó chuyển qua thì ta tạo lại để nhận nó
    const location = useLocation()

    // dùng để lấy thông tin của user
    const dispatch = useDispatch()

    // này dúng để khi mình link tới trang mình mong muốn
    const navigate = useNavigate()


    // ------------------------------------------------
    // bắt đầu làm lấy dữ liệu dưới backend lên
    // truyền 
    const mutation = useMutationHooks(
        // --data =>-- nhận cái dữ liệu otp,password từ client từ hàm --handleSignIn--
        data => UserService.CheckOTP(data)
    )

    // sau khi --login-- thì đã có dữ liệu 
    // --data-- nhận từ --mutation-- lúc này là --access_token--
    const { data, isPending, isSuccess } = mutation

    // console.log('mutation', mutation)
    // ------------------------------------------------

    // tạo hàm này ra dùng để truyền dữ liệu vào --setOtp-- thông qua thanh --input-- phía dưới
    const handleOnchangeOTP = (value) => {
        setOtp(value)
    }

    // Lấy dữ liệu email từ trang trước
    const email = location.state?.email;

    // tạo hàm này dùng để in ra thông tin của --otp
    const handleOtpAndPassword = () => {
        // chuyền 2 dữ liệu nhập từ client vào --mutation-- dùng để chuyển sang --backend--
        mutation.mutate({
            otp,
            email
        })
        // console.log('sign-in', otp)
    }

    useEffect(() => {
        if(data?.status === 'OK') {
            navigate('/change-password', { state: { email, otp: data?.data?.otp } });
        }
    }, [data, mutation])

    return (
        <WrapperContainer>
            <PasswordRetrievalPage_Content>
                <WrapperContainerLeft>
                    <SigninPage_Content_Form_Heading>Xác Thực OTP</SigninPage_Content_Form_Heading>
                    <SigninPage_Content_Form_Text>Vui lòng nhập mã OTP được gửi tới email của bạn.</SigninPage_Content_Form_Text>

                    {/* --value={otp}-- truyền otp vào value */}
                    {/* --handleOnChange={handleOnchangeOTP}-- sau đó gọi tới --hàm handleOnchangeOTP--  */}
                    <InputForm style={{ marginBottom: '10px' }} placeholder="Nhập mã OTP của bạn" value={otp} onChange={handleOnchangeOTP} />

                    {/* thông báo lỗi khi ko đăng nhập đx */}
                    {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}

                    <Loading isPending={isPending}>
                        <ButtonComponents
                            // khi nhập đủ thông tin --otp và password-- thì ta mới cho bấm --đăng nhập--
                            disabled={!otp}
                            // khi kik vào --Tìm kiếm-- thì sẽ chạy hàm --handleCheckOTP--
                            onClick={handleOtpAndPassword}
                            // bordered={false}
                            size={40}
                            styleButon={{
                                background: "#003468",
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                boderRadius: '4px',
                                margin: '26px 0 10px'
                            }}
                            textButton={'Xác Thực OTP'}
                            styleTextButon={{ color: '#fff', fontSize: '15px', fontWeight: '700px' }}
                        ></ButtonComponents>
                    </Loading>
                </WrapperContainerLeft>

            </PasswordRetrievalPage_Content>
        </WrapperContainer>

    )
}

export default OtpPasswordPage