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

export const ProductItem1 = styled.div`
     flex: 0 0 auto;
`;

export const ProductItem = styled.div`
    flex: 0 0 48%; /* Rộng của mỗi sản phẩm là 35% */
    
    margin-right: 10px; /* Khoảng cách giữa các sản phẩm */

    @media (min-width: 740px) and (max-width: 1030px) {
        flex: 0 0 28%; /* Rộng của mỗi sản phẩm là 35% */
    }
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
    overflow-x: auto; /* Cho phép cuộn ngang khi nội dung tràn */
   
    @media (max-width: 740px) {
        display: flex;
        overflow-x: auto; /* Cho phép cuộn ngang khi nội dung tràn */
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }
    
`

export const WrapperProducts1 = styled.div`
    display: flex;
    margin-top: 10px;
    flex-wrap: wrap;
    justify-content: space-evenly;
    display: flex;
    padding: 0% 3% 0%% 3%;
    @media (min-width: 740px) and (max-width: 1030px) {
        justify-content: space-evenly;
    }
`

