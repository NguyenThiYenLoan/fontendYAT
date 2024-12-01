// Import React và các thành phần cần thiết từ thư viện Ant Design
import React, { useEffect, useState } from 'react'
// thư viện dùng thanh input search
import Search from 'antd/es/input/Search'
// phân chia chiều ngang thành 24 phần dùng đẻ chia khung từ thư viện --'antd'--
import { Badge, Col, Image, Modal, Popover } from 'antd'
import { useMutationHooks } from '../../hooks/useMutationHooks'
// các tên trùng với tên bên phía css lấy qua thông qua --'./style'--
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall, WrapperContentPopup, WrapperHeaderAo, WrapperUnderlined, WrapperHeaderAccout1, WrapperImage, WrapperName, WrapperTextHeaderSmall1, WrapperNotifyIcon, WapperShoppingCartIcon, WapperBadge } from './style'
// này là các icon lấy trên các trang khác thông qua thư viện --'@ant-design/icons'--
import {
    UserAddOutlined,
    CaretDownOutlined,
    ShoppingOutlined,
    NotificationOutlined,
    BellOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

// chuyển trang thì phải
import { useNavigate, useParams } from 'react-router-dom';

// thư viện dùng để xuất dữ liệu đã được xử lý từ --UserSlide.js-- ra
import { useDispatch, useSelector } from 'react-redux';
// import { click } from '@testing-library/user-event/dist/click';

// import thu viện userService vào
import * as UserService from '../../services/UserService'

// sau khi --login-- thành công thi add thư viện này vào
// dùng để lấy thông tin của user
// import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slides/userSlide'
import { resetOrder } from '../../redux/slides/orderSlide'
import Loading from '../loadingComponents/Loading';
import { searchProduct } from '../../redux/slides/productSlide';
import { useMediaQuery } from 'react-responsive';

import logoo from '../../assets/images/LOGOO.webp'
import * as OderService from '../../services/OrderService'

// Functional component cho phần Header
const HeaderComponents = ({ isHiddenSearch = false, isHiddenCart = false }) => {

    const isMobile = useMediaQuery({ query: '(max-width: 740px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 740px) and (max-width: 1030px)' });

    // lấy ra cái thằng order hiển thị lên cái thanh giỏ hàng có bao nhiêu sản phẩm
    const order = useSelector((state) => state.order)

    // tạo ra 1 cái function để khi kik vào nó link tới trang đăng nhập
    const navigate = useNavigate()

    // lấy địa chỉ trên thanh url
    const param = useParams()
    // console.log('param', param)


    // dùng để xuất dữ liệu đã được xử lý từ --UserSlide.js-- ra
    const user = useSelector((state) => state.user)
    // console.log('user', user)

    // dùng để logout
    const dispatch = useDispatch()

    // dùng để isPending
    const [pending, setPending] = useState(false)

    // --dùng cho cái khi thay đổi tên nó sẽ cập nhật lại--
    const [userName, setUserName] = useState('')

    // --dùng cho cái khi thay đổi ảnh nó sẽ cập nhật lại--
    const [userAvatar, setUserAvatar] = useState('')

    // --dùng cho cái tìm kím
    const [search, setSearch] = useState('')

    const [open, setOpen] = useState(false);
    const [shippingStatus, setShippingStatus] = useState(true);

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = (e) => {
        e.stopPropagation();
        setOpen(false);
    };

    const handleProductClick = (productId) => {
        navigate('/DeliveryDetails')
    };
    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    // hàm --handleLogout-- dùng để
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        dispatch(resetOrder())
        localStorage.removeItem('user');
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setPending(false)
    }

    //-----------------
    // khi cái --user?.name-- thay đổi thì ta sẽ reloard lại trang để cho cái tên hiển thị trên thanh --header-- thay đổi theo
    useEffect(() => {
        // để nó bằng true
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        // sau khi sét xong thì để bằng false
        setPending(false)
    }, [user?.name, user?.avatar])

    //-----------------



    // khi kik vào sẽ hiển thị chữ --đăng xuất và thông tin người dùng--
    const content = (
        <div>
            <WrapperContentPopup onClick={() => hanldeClickNavigate('User-page')}>Tài Khoản người dùng</WrapperContentPopup>

            {/* nếu --isAdmin-- bằng --true-- thì hiển thị cái này */}
            {user?.isAdmin && (
                <WrapperContentPopup onClick={() => hanldeClickNavigate('admin')}>Quản lí hệ thống</WrapperContentPopup>
            )}
            <WrapperContentPopup onClick={() => hanldeClickNavigate('my-order')}>Đơn hàng của tôi</WrapperContentPopup>
            <WrapperContentPopup onClick={() => hanldeClickNavigate()}>Đăng xuất</WrapperContentPopup>
        </div>
    );

    // dùng để quản lý các sự kiện link tới trang cho dễ quản lý
    const hanldeClickNavigate = (type) => {
        if (type === 'User-page') {
            navigate('/User-page')
        } else if (type === 'admin') {
            navigate('/system/admin')
        } else if (type === 'my-order') {
            navigate('/my-order', {
                state: {
                    id: user?.id,
                    token: user?.access_token
                }
            })
        } else {
            handleLogout()
            navigate('/')
        }
    }


    // hàm của thanh tìm kiếm
    const onSearch = (e) => {
        setSearch(e.target.value)
        // ở đay ta sẽ dùng --dispatch()-- để link tới trang --productSlise--
        dispatch(searchProduct(e.target.value))
        // console.log('e', e.target.value)
    }



    const mutation = useMutationHooks(
        (data) => {
            const { id, access_token, shippingStatus } = data
            const res = OderService.getAllOrderNotification(id, access_token, shippingStatus)
            // trả về cái data
            return res
        }
    )
    const { data: orders, isPending, isSuccess, isError } = mutation

    const onFinish = () => {
        if (user) {
            const params = {
                id: user.id,
                access_token: user.access_token,
                shippingStatus,
            };
            mutation.mutate(params);
        }
    };

    useEffect(() => {
        onFinish();
    }, [user]);

    return (
        // , justifyContent: 'center' 
        <div style={{ width: '100%', background: '#fff' }}>

            {/* nay cho thanh cuốn header có thể duy chuyển dx */}
            <WrapperHeaderAo></WrapperHeaderAo>

            {/* Wrapper chứa các thành phần trong Header */}
            {/* 
                khi --isHiddenSearch && isHiddenCart-- bằng --true-- thì ta dùng thuộc tính --'space-between'--
                ko thì ta dùng --'unset'--
                // cho cái tên --Admin-- bên trang --Admin-- nằm bên góc phải

            */}
            <WrapperHeader style={{ justifyContent: isHiddenSearch && isHiddenCart ? 'space-between' : 'unset' }}>
                {/* --chiều ngang col gồm 24 nên mình sẽ chia theo ý muốn miễn là đủ 24 là được-- */}

                {/* Cột chứa logo hoặc text header */}
                <Col span={isMobile || isTablet ? 4 : 3}>
                    <WrapperTextHeader onClick={() => navigate('/')} >
                        <div>
                            {isMobile
                                ?
                                <Image key='logoo' src={logoo} alt="logoo" preview={false} width="120%" />
                                :
                                <Image key='logoo' src={logoo} alt="logoo" preview={false} width="80%" />
                            }

                        </div>
                    </WrapperTextHeader>
                </Col>


                {/* nếu bằng false thì hiện còn bằng true thì ẩn đi */}
                {!isHiddenSearch && (
                    // Cột chứa ô tìm kiếm
                    <Col span={isMobile || isTablet ? 17 : 16} style={{ justifyContent: 'space-between', display: 'flex' }}>
                        <Col span={isMobile || isTablet ? 2 : 2}></Col>
                        <Col span={isMobile || isTablet ? 20 : 20}>
                            <ButtonInputSearch
                                size="large"
                                // textButton="Tìm kiếm"
                                placeholer="input search text"
                                bordered={'none'}
                                onChange={onSearch}
                                dulieu={search}
                            /></Col>
                        <Col span={isMobile || isTablet ? 2 : 3}></Col>

                    </Col>
                )}
                {isHiddenSearch && (
                    <div><h3 style={{ marginTop: '15px' }}>Trang Quản Trị Của Trang Web</h3></div>
                )}


                {/* Cột chứa các thành phần đăng nhập, đăng ký, giỏ hàng */}
                <Col span={isMobile || isTablet ? 3 : 5}>
                    <WrapperHeaderAccout1>
                        <Loading isPending={pending}>
                            {isMobile || isTablet ? null :
                                <WrapperHeaderAccout>
                                    {/* nếu tồn tại --avatar-- thì hiển thị còn ko thì hiển thị --icon-- */}
                                    {userAvatar ? (
                                        <WrapperImage src={userAvatar} alt="avatar" />
                                    ) : (
                                        null
                                    )}


                                    {/* check nếu --access_token-- không có */}
                                    {user?.access_token && user?.email?.length ? (
                                        <>
                                            {/* hiển thị nút --khi bấm vào user name được hiển thị sẽ hiển thị --logout---- */}
                                            <Popover content={content} trigger="click" >
                                                {/* khi đăng nhập vào sẽ có được cái --user(name)-- */}
                                                <WrapperName>{userName?.length ? userName : user?.email}</WrapperName>
                                            </Popover>
                                        </>
                                    ) : (
                                        // khi kik vào cái --đăng nhập/ đăng ký-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateLogin--
                                        // mình tạo ở trên để link tới trang đăng nhập
                                        <div onClick={handleNavigateLogin} style={{ cursor: 'pointer' }}>
                                            {/* Text đăng nhập/đăng ký */}
                                            <WrapperTextHeaderSmall>Đăng nhập/Đăng ký</WrapperTextHeaderSmall>
                                            <div>
                                                {/* Text tài khoản và biểu tượng mũi tên xuống */}
                                                <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                                                <CaretDownOutlined style={{ color: '#0297' }} />
                                            </div>
                                        </div>
                                    )}
                                </WrapperHeaderAccout>
                            }

                        </Loading>

                        {!isHiddenCart && (
                            // Thanh giỏ hàng
                            // khi kik vào thì sẽ chuyển đến trang --order--
                            <div onClick={() => navigate('/order')} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                                {/* Badge: dùng để hiển thị số lượng hàn trên icon giỏ hàng */}
                                <div style={{ textAlign: 'center' }}>
                                    
                                    {isMobile || isTablet 
                                            ? 
                                                null 
                                            :  
                                            <Badge count={order?.orderItems?.length >= 1 ? order?.orderItems?.length : "O"} size="small">
                                                <WapperShoppingCartIcon>
                                                    <ShoppingCartOutlined style={{ fontSize: '30px' }}/>
                                                </WapperShoppingCartIcon>
                                                {/* <ShoppingOutlined style={{ fontSize: '30px' }} /> */}
                                            </Badge>
                                    }   
                                </div>
                                {isMobile || isTablet ? <div>&nbsp;&nbsp;</div> :
                                    <WrapperTextHeaderSmall1>Giỏ hàng</WrapperTextHeaderSmall1>
                                }

                            </div>
                        )}
                        {!isHiddenCart && (
                            <div onClick={showModal} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                                {/* Badge: dùng để hiển thị số lượng hàn trên icon giỏ hàng */}
                                <div style={{ textAlign: 'center', marginTop: 5 }}>
                                    <WapperBadge>
                                    <Badge count={orders?.data?.length >= 1 ? orders?.data?.length : "O"} size="small" >
                                        <WrapperNotifyIcon>
                                            <BellOutlined style={{ fontSize: '25px' }} />
                                        </WrapperNotifyIcon>
                                        {/* <NotificationOutlined style={{ fontSize: '25px' }} /> */}
                                    </Badge>
                                    </WapperBadge>
                                </div>
                                {isMobile || isTablet ? <div>&nbsp;&nbsp;</div> :
                                    <WrapperTextHeaderSmall1>Thông báo</WrapperTextHeaderSmall1>
                                }
                                <Modal
                                    title={
                                        <div style={{ textAlign: 'center', width: '100%', fontWeight: 'bold' }}>
                                            Thông báo đơn hàng
                                        </div>
                                    }
                                    open={open}
                                    onCancel={handleCancel}
                                    footer={null}
                                    style={{
                                        position: 'absolute',
                                        top: '10%',
                                        right: '0',
                                        transform: 'translateY(0)',
                                    }}
                                    width="30%"
                                >
                                    <div style={{
                                        maxHeight: '450px',
                                        overflowY: 'scroll',
                                        marginRight: '-25px',
                                    }}>
                                        {orders?.data && Array.isArray(orders.data) && orders.data.map(order => (
                                            <div key={order._id} style={{ marginBottom: '20px' }}>
                                                <div>Giao kiện hàng thành công</div>
                                                {order.orderItems?.length > 0 ? (
                                                    order.orderItems.map((item, index) => (
                                                        <div key={`${order._id}-${index}`} onClick={() => handleProductClick(order._id)} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px', cursor: 'pointer' }}>
                                                            <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px', marginRight: '20px' }} />
                                                            <div>
                                                                <div style={{ fontSize: 13 }}>{item.name}</div>
                                                                <div style={{ fontSize: 13 }}>Mã số: {order.createdAt}</div>
                                                            </div>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div>Không có sản phẩm trong đơn hàng này</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </Modal>


                            </div>
                        )}
                    </WrapperHeaderAccout1>
                </Col>
            </WrapperHeader>

            <WrapperUnderlined></WrapperUnderlined>

        </div>
    )
}

export default HeaderComponents