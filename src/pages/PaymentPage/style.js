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

export const WrapperLeft = styled.div`
  flex: 1; 
  width: 75%;

  @media (max-width: 740px) {
    width: 100%;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    width: 100%;
  }
`

export const WrapperListOrder = styled.div`

`

export const WrapperItemOrder = styled.div`
  display: flex;
  align-items: center;
  padding: 9px 16px;
  background: #fff;
  margin-top: 12px;
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
  width: 25%;
  margin-left: 20px;
  display: flex ;
  flex-direction: column; 
  gap: 10px; 
  align-items: center
  flex: 1; 

  @media (max-width: 740px) {
    width: 100%;
    margin-left: 0px;
    gap: 0px;
    padding: 20px 0px 0px;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    width: 100%;
    margin-left: 0px;
    gap: 0px;
    padding: 20px 0px 0px;
  }
`

export const WrapperInfo = styled.div`
  padding: 17px 20px;
  border-bottom: 1px solid #f5f5f5;
  background: #fff;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
  width: 100%
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
  width: 100%;
  border-radius: 4px;
  height: 100px;
  padding: 16px;
  font-weight: normal;
  display:flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`

export const WrapperContainer = styled.div`
  background: #f5f5fa;
  width: 100%;
  height: 100vh;
`;

export const WrapperContainer1 = styled.div`
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0px 120px;
  flex-wrap: wrap;  # ----
  display: flex;

  @media (max-width: 740px) {
    padding: 0px;
  }

  @media (min-width: 740px) and (max-width: 1030px) {
    padding: 0px;
  }
`;