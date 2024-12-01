import React from 'react'
// các tên trong css bên phía --'./style'-- để chỉnh css cho cái khung hình
import { StyleNameProduct, WrapperCardStyle, WrappeDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
// icon hình ngôi sao
import { StarFilled } from '@ant-design/icons'
// cais logo trong hình ảnh
import logo from '../../assets/images/logo.png'
import { useNavigate } from 'react-router-dom'
import { convertPrice } from '../../utils'
import { useMediaQuery } from 'react-responsive';


// trang này tạo ra cái (Card để bán hàng) cái khung hình bán hàng
const CardComponents = (props) => {
    const isMobile = useMediaQuery({ query: '(max-width: 740px)' });
    const isTablet = useMediaQuery({ query: '(min-width: 740px) and (max-width: 1030px)' });

    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    // import thư viện --navigate-- zo để chuyển đến 1 trang nào đó mình mong muốn
    const navigate = useNavigate()

    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    return (
        <WrapperCardStyle
            hoverable
            headStyle={{ width: '200px', height: '200px' }}
            style={{ width: isMobile ? '100%' : '200px', height: isMobile ? '330px' : 'auto' }}
            bodyStyle={{ padding: '10px' }}
            // loard cái hình ảnh lên khung hình
            cover={<img alt="example" src={image} />}
            // tạo 1 sự kiện khi kik vào sẽ nhảy vào hàm mình tạo
            onClick={() =>  handleDetailsProduct(id)}
            
        >
            {/* chỉnh cái logo cho hình ảnh */}
            <img
                src={logo}
                style={{
                    width: '74px',
                    height: '20px',
                    position: 'absolute',
                    top: -2,
                    left: -2,
                    borderTopLeftRadius: '3px'
                }}
            />

            <StyleNameProduct>{name}</StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    {/* StarFilled: là --icon-- cái hình ngôi sao màu vàng */}
                    <span>{rating} </span> <StarFilled style={{ fontSize: '12px', color: 'rgb(253, 216, 54)' }} />
                </span>
                <WrapperStyleTextSell>| Đã bán {selled || 1000}+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{convertPrice(price)}</span>
                <WrappeDiscountText>
                    - {discount || 5}%
                </WrappeDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponents