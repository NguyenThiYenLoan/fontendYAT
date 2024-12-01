import styled from 'styled-components';
import React from 'react';
export const Wrapper = styled.div`
    width: 100%; 
    font-family: "Helvetica Neue", Helvetica, Arial, 文泉驛正黑,
    "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC",
    微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;

`
export const NavigationProductDetail = styled.div`
    width: 100% ;
    padding: 20px 10px 0px 10px ;
    color: #323232 ;
`
export const NavigationProductDetailLink = styled.a`
    margin-left: 150px;
    color: rgb(204, 204, 204);
    &:hover {
    color: #003468 ;
    }
`

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    width: 92%;

    @media (max-width: 740px) {
        width: 89%;
        margin: 0 auto;
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }
`

export const WrapperLabel = styled.label`
    color: #000;
    font-size: 12px;
    line-height: 30px;
    font-weight: 600px;
    width: 60px;
    text-align: left;
`


export const WrapperTextarea = styled.textarea`
    width: 100%;
    padding: 10px; 
    border: 1px solid #ccc; 
    border-radius: 5px; 
    font-size: 16px;
    line-height: 1.5; 
    resize: vertical; 
    height: 40px;
    margin-top: 3px;

    @media (max-width: 739px) {
     width: 90%;
     margin: 9px auto 10px;
     padding: 0;
    }
`
export const WrapperContentPopup = styled.p`
    cursor: pointer;
    &:hover {
        color: rgb(26, 148, 255);
    }
`
export const WrapperImgAvatar = styled.img`
    height: 35px;
    width: 35px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
    margin-top: -25px;

    @media (max-width: 740px) {
        height: 35px;
        width: 35px;
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        
    }
`;

export const Container = styled.div`
    border-top: 1px solid #ddd;
    padding: 20px;
    margin-top: 50px;
    background-color: #ffff;
    width: ${(props) => (props.$isMobile ? '100%' : '92%')};
`;

export const Title = styled.h3`
    width: 100%;
    margin-bottom: 20px;
    color: #06386b;
    padding-bottom: 10px;
    text-align: center;
    font-weight: bold;

    @media (min-width: 768px) {
        width: 100%;
        margin-bottom: 20px;
        color: #06386b;
        text-align: center;
        font-weight: bold;
    }
`;

export const CommentList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

export const CommentItem = styled.li`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

export const CommentContent = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`;

export const CommentText = styled.div`
    font-size: 17px;
    color: #555;
    white-space: pre-wrap;
    max-width: 80%;
`;

export const UserName = styled.p`
    font-weight: bold;
    margin-bottom: 5px;
    font-size: 14px;
    margin-right: 10px;
`;

export const CommentDate = styled.p`
    margin-bottom: 5px;
`;

export const CommentWrapper = styled.div`
    display: flex;
`;

export const CommentPopover = styled.div`
    cursor: pointer;
    color: #000;
`;


