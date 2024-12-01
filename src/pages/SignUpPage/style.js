import styled from "styled-components";
import { Image } from "antd";

export const WrapperContainer = styled.div`
  width: 100%;
  font-family: "Helvetica Neue", Helvetica, Arial, 文泉驛正黑,
    "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC",
    微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;
`;

export const SigninPageHeader = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-around ;
  padding: 15px ;
  border-bottom : 1px solid #ccc ;

  @media (min-width: 740px) and (max-width: 1024px) {
    height: auto;
    padding: 15px 5px 5px ;
    border-bottom : 1px solid #ccc ;
  }
  
  @media (max-width: 740px) {
    height: auto;
    padding: 15px 0 5px ;
    border-bottom : 1px solid #ccc ;
  } 
`;

export const SigninPageHeaderLogo = styled.div`
  width: 50%;
  display: flex ;
  justify-content: flex-start; 
  align-items: center; 
`
export const SigninPageHeaderLink = styled.a`
  text-decoration: none;
  display: block ;
  margin: 0 ;
`;

export const SigninPageHeaderImage = styled.img`
  width: 120px;
  height: fit-content;

  @media (max-width: 740px) {
    width: 100px;
    height: 40px ;
  }
`;

export const SigninPageHeaderHeading = styled.h1`
  font-size: 1.6rem;
  line-height: 1.6rem;
  padding: 10px;
  color: #222;
  font-weight: 400;
  margin-top: 5px ;

  @media (max-width: 740px) {
    font-size: 1rem;
    line-height: 1rem;
  }
`;

export const SigninPageHeaderHelp = styled.div`
  display: block;
`

export const SigninPageHeaderHelpLink = styled.a`
  color: rgb(13, 92, 182);
`

export const SigninPageContent = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 60px auto 15px auto;
        
    @media (min-width: 740px) and (max-width: 1024px) {
        margin: 60px auto 0 auto ;
    }
    @media (max-width: 740px) {
      display: block ;
      margin: 60px auto 0 auto ;
      padding-bottom: 15px ;
  }
`;

export const SigninPageContentLogo = styled.div`
  width: 40%;
  height: 300px;
  text-align: center;
  padding: 10px;

  @media (max-width: 740px) {
    display: none ;
  }
`;
export const SigninPageContentImage = styled(Image)`
    width: 100%;
    height: fit-content;
    vertical-align: middle;
`;
export const SigninPageContentLogoHeading = styled.h4`
  margin: 10px 0 0 0 ;
`;

export const SigninPageContentForm = styled.form`
  width: 40%;
  padding: 10px ;
  margin-top: 30px ;
  @media (max-width: 740px) {
    width: 100%;
    padding: 0 0 10px 0  ; 

  }
`;

export const SigninPageContentFormHeading = styled.h1`
  font-size: 1.3rem;
  font-weight: 500;
  margin-left: 5px ;
  
`;
export const SigninPageContentFormText = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 20px;
  margin-left: 5px ;
`;

export const SigninPageContentFormLink = styled.span`
  color: rgb(13, 92, 182);
  font-size: 0.9rem;
  cursor: pointer;

`;
