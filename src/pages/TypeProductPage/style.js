import styled from "styled-components"
import { Col, Row } from "antd"

// justify-content: center; muốn chỉnh giữa thì bỏ ái này vào
export const WrapperProducts = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr; /* 2 sản phẩm trên mỗi hàng */
    gap: 20px; /* Khoảng cách giữa các sản phẩm */
    padding: 20px 5px 0px 5px;

    @media (max-width: 740px) {
        display: grid;
        grid-template-columns: 1fr 1fr; /* 2 sản phẩm trên mỗi hàng */
        gap: 10px; /* Khoảng cách giữa các sản phẩm */
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }

`

export const WrapperNavbar = styled(Col)`
    background: #fff;
    padding: 10px;
    border-radius: 6px;
    height: fit-content;
    margin-top: 20px;
    width: 200px;
    
`
export const WrapperContener = styled.div`
    background: #efefef;
    height: auto;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    @media (max-width: 740px) {
       padding: 0;
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }
`;

export const WrapperRow = styled(Row)`
    flex-wrap: nowrap;
    padding-top: 10px;
    height: calc(100% - 20px);
    width: 80%;

    @media (max-width: 740px) {
       width: 100%;
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }
`;

export const WrapperCol = styled(Col)`
    display: flex;
    flex-wrap: wrap;
`;

export const WrapperTypeProduct= styled.div`
    display: flex;
    align-item: center;
    gap: 24px;
    justify-content: flex-start;
    height: 44px;
    overflow-x: auto;
    max-width: 100%;
    margin-left: 10%;
    

    @media (max-width: 740px) {
        margin-left: 0;
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        padding: 0;
    }
`

export const ProductItem = styled.div`
  flex: 0 0 auto;
`;