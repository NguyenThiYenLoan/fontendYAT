import { Col, Image, InputNumber, Rate, Row } from "antd";
import styled from "styled-components";

export const WrapperProduct = styled.div`
  width: 100%;
  font-family: "Helvetica Neue", Helvetica, Arial, 文泉驛正黑,
    "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC",
    微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;
  margin: 10px auto;
  display: flex;
  align-item: center;
  justify-content: center;

  @media (max-width: 739px) {
    display: block;
  }
`;

export const WrapperProductImage = styled.div`
  width: 40%;
  height: 385px;
  padding: 10px;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 14px;
  border-radius: 3px;

  @media (max-width: 739px) {
    width: 100%;
  }
`;

export const ProductImage = styled(Image)`
  width: 100%;
  height: fit-content;
`;

export const WrapperProductInfor = styled.div`
  width: 40%;
  padding: 0 15px;

  @media (max-width: 739px) {
    width: 100%;
  }
`;

export const WrapperProductName = styled.div``;

export const ProductName = styled.h2`
  color: #06386b;
  font-size: 1.4rem;
  line-height: 1.8rem;
  font-weight: 500px;
  padding: 10px 0;
  word-break: break-word;
  white-space: pre-wrap;
`;

export const ProductRateAndQuanlity = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

export const ProductRate = styled(Rate)`
  font-size: 1rem;
  padding-right: 5px;
`;

export const WrapperStyleTextSell = styled.span`
  font-size: 15px;
  line-height: 24px;
  color: rgb(120, 120, 120);
`;

export const WrapperAddress = styled.div`
  font-size: 0.9rem;
  color: #555;
`;

export const WrapperQuanlity = styled.div`
  font-size: 0.9rem;
  color: #555;
  padding: 10px 0;
`;

export const QuanlityLabel = styled.span`
  display: block;
  padding: 5px 0;
`;

export const WrapperInputNumber = styled.input`
    height: 22px;
    width: 50px;
    padding: 0 5px ;
    text-align: center;
    border: 1px solid #eee ;
`;

export const WrapperService = styled.div`
  width: 100%;
`;

export const WrapperServiceImg = styled.img`
  width: 90%;
`;

export const WrapperQualityProduct = styled.div`
  display: flex;
  gap: 4px;
  align-item: center;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 114px;

  @media (max-width: 739px) {
    width: 120px;
  }
`;

export const QualityButton = styled.button`
  border: none;
  background: transparent;
  cursor: pointer;
  height: 22px ;
  width: 22px;

  @media (max-width: 739px) {
    width: 25px;
  }
`;

export const WrapperButton = styled.div`
  width: 100%;
  display: flex;
  aligg-item: center;
  gap: 12px;
  flex-wrap: wrap;
`;

export const ButtonBuyNow = styled.div`
  width: 100%;
`;
export const ButtonOrther = styled.div`
  width: 100%;
  display: flex;
`;

export const WrapperProductDescription = styled(Row)`
  width: 80%;
  display: flex;
  flexwrap: wrap;
  background: #fff;
  margin: 20px auto;
  margin-bottom: -30px;
  flexwrap: wrap;

  @media (max-width: 739px) {
    margin: 0 12px;
  }
`;

// && tăng độ ưu tiên lên
export const ProductDescriptionHeading = styled.div`
  width: 100%;
  height: 38px;
  border: 1px solid #ddd;
`;
export const ProductDescriptionLabel = styled.h1`
  color: #06386b;
  font-size: 1.4rem;
  line-height: 1.8rem;
  padding: 0 10;
  font-weight: 500px;
`;
