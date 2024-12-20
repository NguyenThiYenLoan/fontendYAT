import { Menu } from 'antd';
import React, { useState } from 'react'
import { UserOutlined, AppstoreOutlined, ShoppingCartOutlined, SlidersOutlined } from '@ant-design/icons'
import { getItem } from '../../utils';
import HeaderComponents from '../../components/HeaderComponents/HeaderComponents';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';
import SliderAdmin from '../../components/SliderAdmin/SliderAdmin';
import AdminAccessStatisticsPage from '../../components/AdminAccessStatisticsPage/AccessStatisticsPage';

const AdminPage = () => {
  const items = [
    getItem('Người dùng', 'user', <UserOutlined />),
    getItem('Sản phẩm', 'product', <AppstoreOutlined />),
    getItem('Đơn Hàng', 'order', <ShoppingCartOutlined />),
    getItem('Slider', 'slider', <SlidersOutlined />),
    getItem('Thống kê truy cập','truycap', <SlidersOutlined />),
  ];

  const [keySelected, setKeySelected] = useState(['']);

  // dùng để chuyển giữa --user và product-- bằng key
  const renderPage = (key) => {
    switch (key) {
      case 'user':
        return (
          <AdminUser />
        )
      case 'product':
        return (
          <AdminProduct />
        )
      case 'order':
        return (
          <OrderAdmin />
        )
      case 'slider':
        return (
          <SliderAdmin />
        )
      case 'truycap':
        return (
          <AdminAccessStatisticsPage />
        )
      default:
        return <></>
    }
  }

  const handleOnClick = ({ key }) => {
    // console.log('click', { item, key, keyPath, domEvent })
    // console.log('click', { key})
    setKeySelected(key)
  }
  // console.log('keySelected', keySelected)

  return (
    <>
      {/* laays thanh --header-- để hiển thị cái tên --admin-- trên thanh đó để có thể quay lại trang --client-- */}
      {/* 2 biến --isHiddenSearch và isHiddenCart-- này tượng trưng cho --true-- để chỉ hiển thị tên trang --web với tên admin-- */}
      <HeaderComponents isHiddenSearch isHiddenCart />

      <div style={{ display: 'flex', }}>
        <Menu
          mode="inline"
          style={{
            width: 256,
            boxShadow: '1px 1px 2px #ccc',
            height: '100vh'
          }}
          items={items}
          onClick={handleOnClick}
        />
        <div style={{ flex: 1, padding: '15px' }}>
          {renderPage(keySelected)}
        </div>
      </div>
    </>
  )
}

export default AdminPage
