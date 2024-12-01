import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


export const WrapperSliderStyle = styled(Slider)`
    & .slick-arrow.slick-prev {
        left: 12px;
        top: 50%;
        z-index: 10;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-arrow.slick-next {
        right: 28px;
        top: 50%;
        z-index: 10px;
        &::before {
            font-size: 40px;
            color: #fff;
        }
    }
    & .slick-dots {
        z-index: 10px;
        bottom: -2px !important;
        li {
            button {
                &::before {
                    color: #00000;
                    font-size: 13px;
                    margin-top: -17px;
                }
            }
        }
        li.active {
            button {
                &::before {
                    color: #fff;
                }
            }
        }
    }


    .slick-slide img {
        display: block;
        margin: auto;
    }

    @media (max-width: 740px) {
        .slick-slide img {
            height: 200px;
        }
    }

    @media (min-width: 741px) and (max-width: 1030px) {
        .slick-slide img {
            height: 400px;
        }
    }

    @media (min-width: 1024px) {
        .slick-slide img {
            height: 462px;
        }
    }
`
