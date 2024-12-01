import styled from "styled-components";

export const WrapperContainer = styled.div`
width: 100% ;
height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(0, 0, 0, 0.53);
  font-family: "Helvetica Neue", Helvetica, Arial, 文泉驛正黑,
    "WenQuanYi Zen Hei", "Hiragino Sans GB", "儷黑 Pro", "LiHei Pro", "Heiti TC",
    微軟正黑體, "Microsoft JhengHei UI", "Microsoft JhengHei", sans-serif;
`;

export const PasswordRetrievalPage_Content = styled.div`
  width: 800px;
  height: 445px;
  border-radius: 6px;
  background-color: #fff;
  display: flex;

  @media (min-width: 740px) and (max-width: 1024px) {
      width: 80%;
    }
    @media (max-width: 740px) {
      width: 80%;
      height: 300px ;
  }
`;

export const WrapperContainerLeft = styled.div`
  flex: 1;
  padding: 55px 45px 35px;
  display: flex;
  flex-direction: column;

  @media (max-width: 740px) {
      padding: 40px 45px 35px;
  }
`;
export const SigninPage_Content_Form_Heading = styled.h1`
  font-size: 1.3rem;
  font-weight: 500;
`;
export const SigninPage_Content_Form_Text = styled.p`
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 20px;
`;