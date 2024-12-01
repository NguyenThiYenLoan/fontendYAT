import styled from "styled-components";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";

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



export const WrapperButtonMore = styled(ButtonComponents)`
    &:hover {
        color: #fff;
        background: rgb(13, 93, 182);
        span {
            color: #fff;
        }
    }
    width: 100%;
    text-align: center;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'}
`
// justify-content: center; muốn chỉnh giữa thì bỏ ái này vào
export const WrapperProducts = styled.div`
    display: flex;
    gap: 0px;
    margin-top: 20px;
    flex-wrap: wrap;
    justify-content: left;
    margin-left: 20px;

    @media (max-width: 740px) {
        gap: 2%;
        justify-content: center;
        width: 100%; /* Đảm bảo rằng container chiếm toàn bộ chiều rộng màn hình */
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }
`;

export const ProductCard = styled.div`
    flex: 0 1 19%; /* Điều chỉnh để mỗi sản phẩm chiếm 35% chiều rộng */
    max-width: 35%;
    box-sizing: border-box;
    margin-bottom: 14px; /* Adjust this value to your needs */
    padding-left: 15px;
    // margin-right: -25px;

    @media (max-width: 740px) {
        flex: 1 1 45%; /* 2 products per row on mobile devices */
        max-width: 47%;
    }

    @media (min-width: 740px) and (max-width: 1030px) {
        // flex: 1 1 calc(50% - 20px); /* 2 products per row on medium devices */
        // max-width: calc(50% - 20px);
    }

`;