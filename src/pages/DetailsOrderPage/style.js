import { Row } from "antd";
import styled from "styled-components";

export const Wrapper = styled(Row)`
  width: 1240;
  max-width: 100%;
  display: grid;
  place-items: center;
  font-family: "Helvetica Neue", Helvetica, Arial, 文泉驛正黑,
    "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC",
    微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;
  background-color: #f5f5f5;
`;

export const WrapperContent = styled.div`
  width: 100%;
  margin: 20px auto;
`;

export const ContenHeading = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  align-item: center;
  background-color: #fff;
  border: 1px solid #eee;
`;

export const WrapperContentText = styled.h1`
  font-size: 1.2rem;
  line-height: 1.2rem;
  font-weight: 400;
  margin: auto 20px auto;
  color: #212121;

  @medial (max-width: 739px ) {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

export const ContentOrderingProcess = styled.div`
  width: 100%;
  height: auto;
  background-color: #fff;
  padding: 10px 0;
  margin: 0;
  border: 1px solid #eee;
`;

export const ContentOrderingProcessHeading = styled.h3`
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  text-align: right;
  margin-right: 20px;
  color: #757575;
`;
export const ContentOrderingProcessBody = styled.div`
  width: 100%;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
`;

export const ContentOrderingProcessImage = styled.img`
  width: 70px;
  height: 70px;
  padding: 10px 5px;

  @media (max-width: 739px) {
    width: 40px;
    height: 40px;
    padding: 5px 5px;
  }
`;
export const ContentOrderingProcessInfor = styled.div`
  text-align: center;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  color: #757575;

  @media (max-width: 739px) {
    font-size: 0.7rem;
    line-height: 0.7rem;
  }
`;

export const ContentOrderingProcessText = styled.div``;

export const ContentUser = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;
  background-color: #fff;
  padding: 10px 0;

  @media (max-width: 739px) {
    flex-direction: column;
  }
`;

export const ContentUserInforContainer = styled.div`
  width: calc(90% / 3);
  border-right: 1px solid #eee;
  padding: 10px;
  color: #555;

  @media (max-width: 739px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #eee;
  }
`;

export const ContentUserInforLabel = styled.div`
  display: flex;
  align-item: center;
  font-size: 1rem;
  line-height: 1rem;
  font-weight: 400;
  color: #454545;
`;

export const ContentUserInforLabelText = styled.h3`
  margin: 4px 0 0 10px;
`;

export const ContentUserInfor = styled.div`
  padding: 10px 0 0 0;
  line-height: 1.5rem;
`;

export const ContentProduct = styled.div`
  width: 100%;
  padding: 10px 20px 0;
  background-color: #fafafa;
`;

export const ContentProductInfor = styled.div`
  width: 100%;
  display: flex;
  border-bottom: 1px solid #ddd;
`;

export const ContentNameProductImg = styled.div`
  margin-left: 3px;
`;

export const ContentNameProductText = styled.div`
  padding: 0 10px;
`;

export const WrapperItem = styled.p`
  font-size: 0.9rem;
  line-height: 0.9rem;
  font-weight: 400;
  color: #555;
`;

export const ContentProductTotal = styled.div`
  width: 100%;
  padding: 10px;
`;

export const WrapperAllPrice = styled.div`
  text-align: right;
  padding: 5px;
`;

export const WrapperItemLabel = styled.p`
  font-size: 0.9rem;
  line-height: 0.9rem;
  font-weight: 400;
  color: #555;
  margin: 0;
`;

export const WrapperItemTotal = styled.span`
  font-size: 0.9rem;
  line-height: 0.9rem;
  font-weight: 500;
  color: #ff4d5d;
`;
export const WrapperContentInfo = styled.div`
  @media (max-width: 740px) {
  }

  @media (min-width: 740px) and (max-width: 1030px) {
  }
`;

export const WrapperTextValue = styled.span``;

export const WrapperTextPrice = styled.div``;

export const WrapperName = styled.div`
  @media (max-width: 740px) {
  }

  @media (min-width: 740px) and (max-width: 1024px) {
  }
`;
