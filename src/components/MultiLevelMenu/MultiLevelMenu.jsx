// Import React và các thành phần cần thiết từ thư viện Ant Design
import React, { useEffect, useState } from 'react'
// thư viện dùng thanh input search
import Search from 'antd/es/input/Search'
// phân chia chiều ngang thành 24 phần dùng đẻ chia khung từ thư viện --'antd'--
import { Badge, Col, Image, Popover, Menu, Drawer, Button } from 'antd'
// các tên trùng với tên bên phía css lấy qua thông qua --'./style'--
import { WrapperHeader, WrapperHeaderAccout, WrapperTextHeader, WrapperTextHeaderSmall, WrapperContentPopup, WrapperHeaderAccout1, WrapperImage, WrapperName, WrapperTextHeaderSmall1, WrapperLogo, MenuWrapper, CustomDrawer, DrawerContent } from './style'
// này là các icon lấy trên các trang khác thông qua thư viện --'@ant-design/icons'--
import {
    UserOutlined,
    CaretDownOutlined,
    MenuUnfoldOutlined,
    HomeOutlined,
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

// sau khi --login-- thành công thi add thư viện này zo n
// dùng để lấy thông tin của user
// import { useDispatch } from 'react-redux'
import { resetUser } from '../../redux/slides/userSlide'
import { resetOrder } from '../../redux/slides/orderSlide'
import Loading from '../loadingComponents/Loading';
import logoo from '../../assets/images/LOGOO.webp'


import * as ProductService from '../../services/ProductService'

// Functional component cho phần Header
const MultiLevelMenu = ({ isHiddenSearch = false, isHiddenCart = false }) => {

    const order = useSelector((state) => state.order)
    const navigate = useNavigate()
    const param = useParams()
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [pending, setPending] = useState(false)
    const [userName, setUserName] = useState('')
    const [userAvatar, setUserAvatar] = useState('')

    const handleNavigateLogin = () => {
        navigate('/sign-in')
    }

    // hàm --handleLogout-- dùng để
    const handleLogout = async () => {
        setPending(true)
        await UserService.logoutUser()
        dispatch(resetUser())
        dispatch(resetOrder())
        setPending(false)
    }

    // khi cái --user?.name-- thay đổi thì ta sẽ reloard lại trang để cho cái tên hiển thị trên thanh --header-- thay đổi theo
    useEffect(() => {
        // để nó bằng true
        setPending(true)
        setUserName(user?.name)
        setUserAvatar(user?.avatar)
        // sau khi sét xong thì để bằng false
        setPending(false)
    }, [user?.name, user?.avatar])

    // khi kik vào sẽ hiển thị chữ --đăng xuất và thông tin người dùng--
    const content = (
        <div>
            <WrapperContentPopup onClick={() => hanldeClickNavigate('User-page')}>Tài khoản người dùng</WrapperContentPopup>

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




    const [visible, setVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);
    };


    const onItemClick = (type) => {
        setSelectedItem(type); // Hàm để đặt mục đã chọn
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
        setVisible(false); // Đóng Drawer sau khi chọn mục
    };


    // hiển thị ra cái type của products
    const [typeProducts, setTypeProducts] = useState([])
    


    // getAllTypeProduct
    // dùng để hiển thị type sản phẩm
    const fetchAllTypeProduct = async () => {
        const res = await ProductService.getAllTypeProduct();
        if (res?.status === 'OK') {
            setTypeProducts(res?.data)
        }
    }

    // gọi tới hàm --fetchAllTypeProduct()-- để hiển thị type
    useEffect(() => {
        fetchAllTypeProduct()
    }, [setTypeProducts])


    // những tên của các trang sản phẩm cho vào mảng
    // sau này sẽ lấy dữ liệu phía mongoDB lên
    const arr = typeProducts


    return (
        <WrapperHeader >
            <div style={{width: '30%'}}>
                {/* <WrapperLogo key='logoo' src={logoo} alt="logoo" preview={false} onClick={() => navigate('/')}/> */}
                <div style={{alignItems: 'center', display: 'flex', justifyContent: 'center'}} onClick={() => navigate('/')}> 
                    
                    <Badge count={order?.orderItems?.length >= 1 ? order?.orderItems?.length : "O"} size="small">
                        <ShoppingCartOutlined style={{ fontSize: '30px' }}/>
                    </Badge>
                    Giỏ hàng</div>
            </div>


            {/* Cột chứa các thành phần đăng nhập, đăng ký, giỏ hàng */}
            <div style={{width: '55%'}}>
                <WrapperHeaderAccout1>
                    <Loading isPending={pending}>
                        <WrapperHeaderAccout>

                            {/* nếu tồn tại --avatar-- thì hiển thị còn ko thì hiển thị --icon-- */}
                            {userAvatar ? (
                                <WrapperImage src={userAvatar} alt="avatar"/>
                            ) : (
                                <UserOutlined style={{ fontSize: '30px', marginLeft: '40px' }} />
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
                    </Loading>

                    
                </WrapperHeaderAccout1>
            </div>
            
            <div style={{width: '15%'}}>
                {!isHiddenCart && (
                    // Thanh giỏ hàng
                    <MenuWrapper>
                        <div className="menu-icon" onClick={showDrawer}>
                            <MenuUnfoldOutlined style={{ fontSize: '35px' }} />
                        </div>
                        <CustomDrawer title="Menu" placement="right" onClose={onClose} open={visible}>
                            <DrawerContent>
                                {/* Render các mục menu hoặc nội dung khác bên trong Drawer */}
                                {arr.map((item) => (
                                    <div
                                        key={item}
                                        className={`drawer-item ${selectedItem === item ? 'active' : ''}`}
                                        onClick={() => onItemClick(item)}
                                    >
                                        {item}
                                    </div>
                                ))}
                            </DrawerContent>
                        </CustomDrawer>
                    </MenuWrapper>
                    

                )}
            </div>
        </WrapperHeader>     
    )
}

export default MultiLevelMenu