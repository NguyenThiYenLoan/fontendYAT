import styled from "styled-components";
import { Button, Upload } from 'antd'

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 25px;
    margin: 4px 0;
    text-align: center;
    margin-top: 30px;
    margin-bottom: 20px;
`

export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    width: 60%;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;

    @media (max-width: 740px) {
        justify-content: space-between;
        width: 95% ;
        padding: 15px ;
    }
        
    @media (min-width: 740px) and (max-width: 1030px) {
        margin-top: 20px;
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

export const WrapperInput = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 740px) {
        gap: 10px ;
    }   
`;

export const WrapperInputImage = styled.div`
    display: flex;
    align-items: center;
    gap: 40px;

    @media (max-width: 740px) {
        display: block ;
        align-items: center;
        gap: 40px;
    }

    @media (min-width: 740px) and (max-width: 1030px) {
        display: block ;
        align-items: center;
        gap: 40px;
    }
`;



// dùng để ẩn cái link base64 của ảnh trên khung upload hình ảnh
export const WrapperUploadFile = styled(Upload)`
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
        width: 60px;
        height: 60px;
        border-radius: 50%;
    }
    & .ant-upload-list-item-info {
        display: none
    }
`


export const ButtonUpload = styled(Button)`
    @media (max-width: 740px) {
        margin-left: 18px ;
    }
`
