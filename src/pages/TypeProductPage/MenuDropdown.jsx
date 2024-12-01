import React, { useState } from 'react';
import styled from 'styled-components';
import { DownOutlined } from '@ant-design/icons';
import { Drawer } from 'antd';

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0px 0px 0px;
  border-bottom: 1px solid #ccc;
  border-top: 1px solid #ccc;

  .menu-icon {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

const CustomDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    background-color: #f0f2f5; /* Màu nền của Drawer */
  }
`;

const DrawerContent = styled.div`
  max-width: 100%; /* Chiều rộng tối đa của nội dung Drawer */

  .drawer-item {
    padding: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border-radius: 5px;
    margin-bottom: 8px;
    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    &:hover {
      background-color: #f5f5f5;
    }

    &.active {
      background-color: #e6f7ff; /* Màu nền khi mục được chọn */
    }
  }
`;

const MenuDropdown = ({ menuItems, setSortType }) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onItemClick = (type) => {
    // console.log(`Clicked on ${type}`);
    setSortType(type); // Truyền type cho hàm setSortType từ props
    setVisible(false); // Đóng Drawer sau khi chọn mục
  };

  return (
    <MenuWrapper>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={{ width: '100%', borderBottom: '4px solid red', margin: '20px 0px 15px 0px' }}></div>
      </div>
      <div className="menu-icon" onClick={showDrawer} style={{ fontSize: '20px', textAlign: 'center', color: '#282828' }}>
        <span>Sắp Xếp</span> 
        <span><DownOutlined styles={{height:'25px', marginTop:'7px'}}/></span>
      </div>
      <div style={{ justifyContent: 'center', display: 'flex' }}>
        <div style={{ width: '100%', borderTop: '4px solid #fff', borderBottom: '4px solid #fff', margin: '15px 0px 20px 0px' }}></div>
      </div>
      <CustomDrawer title="Menu" placement="right" onClose={onClose} open={visible}>
        <DrawerContent>
          {/* Render các mục menu hoặc nội dung khác bên trong Drawer */}
          {menuItems.map((item) => (
            <div
              key={item}
              className={`drawer-item`}
              onClick={() => onItemClick(item)}
            >
              {item}
            </div>
          ))}
        </DrawerContent>
      </CustomDrawer>
    </MenuWrapper>
  );
};

export default MenuDropdown;
