import styled from 'styled-components';
import { Row } from 'antd';

export const WrapperHeaderAo = styled(Row)`
  height: 60px;
  width: 100%;

  @media (max-width: 740px) {
    height: 40px;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
   height: 40px;
  }
    
`;

export const WrapperHeader = styled(Row)`
  padding: 5px 0px;
  background-color: #fff;
  gap: 0px;  
  align-items: center;
  flex-wrap: nowrap;
  position: fixed;
  top: 0px;
  width: 100%;
  z-index: 1000;
  display: flex;
`;

export const WrapperTextHeader = styled.span`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  cursor: pointer;
`;

export const WrapperImage = styled.img`
  height: 35px;
  width: 35px;
  border-radius: 50%;
  object-fit: cover;
`;


export const WrapperName = styled.div`
  cursor: pointer;
  color: #000;
`;

 
export const WrapperHeaderAccout1 = styled.div`
    display: flex; 
    gap: 0px;
    align-items: center;
    justify-content: space-between;
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
`;

export const WrapperTextHeaderSmall1 = styled.span`
  font-size: 12px;
  color: #000;
  margin-top: 5px;
  text-align: center;
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

export const WrapperUnderlined = styled.div`
  width: 90%;
  height: 1px;
  background-color: #ededed;
  margin: auto;
  margin-top: 10px;


`;

export const WrapperNotifyIcon = styled.div`
  @media (max-width: 740px) {
        margin: 0px 0px 0 1px;
  } 
`
export const WapperShoppingCartIcon = styled.div`
  
`
export const WapperBadge = styled.div`
  @media (max-width: 740px) {
    margin: 10px 20px 0 0px;
  }
`