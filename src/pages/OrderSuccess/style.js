import { Radio } from "antd";
import styled  from "styled-components";

export const WrapperStyleHeader = styled.div`
  background: rgb(255, 255, 255);
  padding: 9px 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  span {
    color: rgb(36, 36, 36);
    font-weight: 400;
    font-size: 13px;
  }
`

export const WrapperContainer = styled.div`
  width: 80%;
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
  justify-content: center;


  @media (max-width: 740px) {
    padding: 0px;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    
  }
`

export const WrapperPriceDiscount = styled.span`
  color: #999;
  font-size: 12px;
  text-decoration: line-through;
  margin-left: 4px;
`

export const WrapperCountOrder  = styled.div`
  display: flex;
  align-items: center;
  width: 84px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export const WrapperRight = styled.div`
  width: 320px;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
`

export const WrapperItemOrderInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%,
  height: 100vh
  display: flex;
  justify-content: center;

  @media (max-width: 740px) {
    padding: 0px;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    padding: 0px;
  }
`


export const WrapperTotal = styled.div`
  display: flex;
   align-items: flex-start; 
   justify-content: space-between;
    padding: 17px 20px;
    background: #fff ;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`

export const Lable = styled.span`
  font-size: 12px;
  color: #000;
  font-weight: bold
`

export const WrapperRadio = styled(Radio.Group)`
  margin-top: 6px;
  background: rgb(240, 248, 255);
  border: 1px solid rgb(194, 225, 255);
  width: 500px;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`

export const WrapperValue = styled.div`
  background: rgb(240, 248, 255);
  border: 1px solid rgb(192, 255, 255);
  padding: 10px;
  width: 250px;
  border-radius: 6px;
  margin-top: 10px;
  font-size: 13px;

  @media (max-width: 740px) {
    width: 100%;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    
  }
`

export const WrapperContener = styled.div`
  background: #f5f5fa;
  width: 100%;
  height: 100vh;
`;

export const WrapperContener1 = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
`;

export const WrapperImgAndName = styled.div`
  width: 400px;
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 150px;

  @media (max-width: 740px) {
    width: 50%;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    width: 50%;
    margin-left: 0;
    margin-right: 0;
    padding: 0;
  }
`;

export const WrapperImg = styled.img`
  width: 77px;
  height: 79px;
  object-fit: cover;
  margin-right: 20px;
  margin-left: 20px;

  @media (max-width: 740px) {

  }

  @media (min-width: 740px) and (max-width: 1030px) {

  }
`;

export const WrapperName = styled.div`
  width: 260px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 740px) {

  }

  @media (min-width: 740px) and (max-width: 1030px) {

  }
`;

