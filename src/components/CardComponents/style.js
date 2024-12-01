import { Card } from "antd";
import styled from "styled-components";

// css cho cái khung hình bán hàng
export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        witdth: 200px;
    },
    position: relative;
    cursor: ${(props) => props.disabled ? 'not-allowed' : 'pointer'}, 
`
export const WrapperImageStyle = styled.img`
    top: -1px;
    left: -1px;
    border-top-left-radius: 3px;
    postition: absolute;
    height: 14px;
    width: 68px;
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 12px;
    color: rgb(56, 56, 61);
    line-height: 16px;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Giới hạn số dòng tối đa */
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 32px; /* Chiều cao để phù hợp với 2 dòng, tính theo line-height */
    margin: 0; /* Đảm bảo không có khoảng cách không mong muốn */
    word-break: break-word; /* Ngắt từ nếu cần thiết để tránh tràn */
`;

export const WrapperReportText = styled.div`
    font-size: 11px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0px 0px;
`
export const WrapperPriceText = styled.div`
    font-size: 16px;
    color: rgb(255, 66, 78);
    font-weight: 500px;
`

export const WrappeDiscountText = styled.span`
    color" rgb(255, 66, 78);
    font-size: 12px;
    font-weight: 500px;
`

export const WrapperStyleTextSell = styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`