import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  background-color: #fff;
  color: #000;
  padding: 20px 0px 0;
  border-top: 1px solid #ddd;
  font-family: "Helvetica Neue", Helvetica, Arial, 文泉驛正黑, "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC", 微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;
`;

export const LogoContainer = styled.div`
  width: 100% ;

`;

export const LogoImage = styled.img`
  width: 20% ;
  height: fit-content ;
  
  @media (max-width: 740px) {
    width: 100px;
    height: 40px ;
  }
`;

export const FooterContent = styled.div`
  width: 100%;
  margin: auto;
  display: flex;
  justify-content: space-around;
  align-items: flex-start;

  @media (min-width: 740px) and (max-width: 1023px) {
    flex-direction: column;
    padding: 20px ;
  }

  @media (max-width: 739px) {
    flex-direction: column;
    padding: 20px ;
  }

`;

export const FooterContentInfor = styled.div`

`;

export const FooterContentInforTitle = styled.h3`
  color: #757575;
    font-size: 1rem;
    font-weight: 600;
    margin: 10px 0 8px 0 ;
`;

export const FooterContentInforLink = styled.a`
  display: block ;
  color: #757575;
  font-size: 0.85rem;
  line-height: 1rem ;
  font-weight: 300;


`;
export const FooterContentInforTitleImg = styled.img`
  width: 90% ;
  height: 80px ;
`

export const Copyright = styled.div`
  color: #757575;
  font-size: 0.85rem;
  line-height: 1rem ;
  font-weight: 300;
  text-align: center;
  border-top: 1px solid #ddd ;
  padding: 15px 0 ;
`;