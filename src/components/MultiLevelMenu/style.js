import styled from 'styled-components';
import { Image, Drawer } from 'antd';


export const WrapperLogo = styled(Image)`
  && {
    width: 100%;
    height: 35px;
  }
`;

export const WrapperHeader = styled.div`  
  background-color: #fff;
  gap: 0px;  
  align-items: center;
  flex-wrap: nowrap;
  position: fixed;
  bottom: -1px;
  width: 100%;
  z-index: 1000;
  
  justify-content: space-between;
  display: flex;


  @media (max-width: 740px) {
    
  }
    
  @media (min-width: 740px) and (max-width: 1030px) {
   
  }
`;

export const WrapperTextHeader = styled.span`
  
`;

export const WrapperImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: 80px;

  @media (max-width: 740px) {
    margin-left: 10px;
  }
    
  @media (min-width: 740px) and (max-width: 1030px) {
    margin-left: 20px;
  }
`;


export const WrapperName = styled.div`
  cursor: pointer;
  color: #000;

  @media (max-width: 740px) {
    margin-right: 7px;
  }
    
  @media (min-width: 740px) and (max-width: 1030px) {
    margin-right: 20px;
  }
`;

 
export const WrapperHeaderAccout1 = styled.div`
    display: flex; 
    justify-content: center;
    @media (max-width: 740px) {
        gap: 5px;
    }
    
    @media (min-width: 740px) and (max-width: 1030px) {
        gap: 5px;
    }
`;
export const WrapperHeaderAccout = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  gap: 5px; 
`;

export const WrapperTextHeaderSmall = styled.span`
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  color: #000;

  @media (max-width: 740px) {
    margin-left: -60px;
    margin-right: 10px;
  }
    
  @media (min-width: 740px) and (max-width: 1030px) {
    margin-left: -40px;
  }
`;

export const WrapperTextHeaderSmall1 = styled.span`
  font-size: 12px;
  white-space: nowrap;
  cursor: pointer;
  color: #000;

  @media (max-width: 740px) {
    margin-left: -65px;
    color: #fff;
  }
    
  @media (min-width: 740px) and (max-width: 1030px) {
    margin-left: -40px;
  }
`;

export const WrapperIconHeader = styled.span`
  font-size: 20px;
  color: #000;
`;

export const WrapperContentPopup = styled.p`
  cursor: pointer;
  &:hover {
    color: rgb(26, 148, 255);
  }
`;

export const MenuWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;

  .menu-icon {
    cursor: pointer;
    transition: transform 0.3s ease;

    &:hover {
      transform: scale(1.1);
    }
  }
`;

export const CustomDrawer = styled(Drawer)`
  .ant-drawer-content-wrapper {
    background-color: #f0f2f5; /* Màu nền của Drawer */
  }
`;

export const DrawerContent = styled.div`
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