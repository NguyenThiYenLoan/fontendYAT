import { Image } from "antd";
import React from "react";
import { WrapperSliderStyle } from './style'
// import { useMediaQuery } from 'react-responsive';


// chỉnh css cho slider
// SliderComponent = ({arrImage}): bên HomePage.jsx gọi tới SliderComponents.jsx rồi chuyền --arrImage-- chưa mảng ảnh vào
const SliderComponent = ({ arrImage }) => {

    // const isMobile = useMediaQuery({ query: '(max-width: 740px)' });
    // const isTablet = useMediaQuery({ query: '(min-width: 740px) and (max-width: 1030px)' });

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // chuyển slide tự động
        autoplay: true,
        // thời gian chuyển slide
        autoplaySpeed: 2500
    };

    // in slider ra thông qua thư viện (Slider) và (Image)
    return (
        <WrapperSliderStyle {...settings}>

            {/* lấy ảnh từ --arrImage-- rồi gán vào --image-- */}
            {arrImage.map((image) => {
                // in ra hình ảnh thông qua thẻ --Image--
                return (
                    <Image key={image} src={image} alt="slider" preview={false} width="100%" />
                )
            })}

        </WrapperSliderStyle>
    )
}

export default SliderComponent