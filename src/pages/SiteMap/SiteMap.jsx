import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Thay thế useHistory bằng useNavigate
// thư viện dùng để xuất dữ liệu đã được xử lý từ --UserSlide.js-- ra
import { useDispatch, useSelector } from 'react-redux';

const SiteMapPage = () => {
    const navigate = useNavigate(); // Thay thế useHistory bằng useNavigate
    const user = useSelector((state) => state.user)

    const [userData, setUserData] = useState({
        id: user?.id,
        token: user?.access_token
    });

    const handleNavigateType = (type) => {
        // normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_'): dùng để bỏ đi cái tiếng việt khi kik vào --type--
        // {state: type}: nhận cái --type-- tiếng việt để tìm kiếm --type--
        navigate(`/product/${type.normalize('NFD').replace(/[\u0300-\u036f]/g, '')?.replace(/ /g, '_')}`, { state: type })
    }

    const navigateTo = (path) => {
        // Nếu đường dẫn là "/my-order", thêm state vào lịch sử chuyển hướng
        if (path === '/my-order') {
            navigate(path, {
                state: {
                    id: userData.id,
                    token: userData.token
                }
            });
        } else if (path === '/product/Bong_Tai') {
            const type = 'Bông Tai'
            handleNavigateType(type)
        } else {
            navigate(path);
        }
    };

    // Hàm để sinh màu ngẫu nhiên
    const generateRandomColor = () => {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    };

    // Mảng chứa các trường và các nút tương ứng
    const fields = [
        {
            title: 'Home',
            buttons: [
                { label: 'Trang chính', path: '/' }
            ]
        },
        {
            title: 'User',
            buttons: [
                { label: 'Đăng nhập', path: '/sign-in' },
                { label: 'Đăng ký', path: '/sign-up' },
                { label: 'Hồ sơ người dùng', path: '/profile-user' }
            ]
        },
        {
            title: 'Product',
            buttons: [
                { label: 'Loại sản phẩm', path: '/product/Bong_Tai' }
            ]
        },
        {
            title: 'Order',
            buttons: [
                { label: 'Đơn hàng của tôi', path: '/my-order' },
                { label: 'Đặt hàng', path: '/order' }
            ]
        },
        {
            title: 'Trang dịch vụ',
            buttons: [
                { label: 'Site Map', path: '/SiteMap' }
            ]
        }
    ];

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Site Map</h1>
            {/* Hàng trên */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
                <div style={{ border: '1px solid black', marginRight: '10px', backgroundColor: generateRandomColor(), padding: '10px', borderRadius: '10px' }}>
                    <h2>{fields[0].title}</h2>
                    {fields[0].buttons.map((button, index) => (
                        <div key={index}>
                            <button onClick={() => navigateTo(button.path)} style={{ width: '150px', height: '40px', margin: '5px' }}>{button.label}</button>
                            <br></br>
                        </div>
                    ))}
                </div>
            </div>
            {/* Hàng dưới */}
            <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {fields.slice(1).map((field, index) => (
                    <div key={index} style={{ border: '1px solid black', marginLeft: '20px', marginBottom: '20px', marginRight: '10px', backgroundColor: generateRandomColor(), padding: '10px', borderRadius: '10px' }}>
                        <h2>{field.title}</h2>
                        {field.buttons.map((button, index) => (
                            <div key={index}>
                                <button onClick={() => navigateTo(button.path)} style={{ width: '150px', height: '40px', margin: '5px' }}>{button.label}</button>
                                <br></br>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SiteMapPage;
