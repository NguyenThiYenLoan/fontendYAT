import React, { useEffect, useState } from "react";
import {
  WrapperContainer,
  SigninPageHeader,
  SigninPageHeaderLogo,
  SigninPageHeaderLink,
  SigninPageHeaderImage,
  SigninPageHeaderHeading,
  SigninPageHeaderHelp,
  SigninPageHeaderHelpLink,
  SigninPageContent,
  SigninPageContentLogo,
  SigninPageContentImage,
  SigninPageContentLogoHeading,
  SigninPageContentForm,
  SigninPageContentFormHeading,
  SigninPageContentFormText,
  SigninPageContentFormLink,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import imageLogo from "../../assets/images/logoPNJ.png";
import Content_Logo from "../../assets/images/logo-login.png";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

// link tới trang --UserService--
import * as UserService from "../../services/UserService";

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from "../../hooks/useMutationHooks";
// thông báo lỗi
import Loading from "../../components/loadingComponents/Loading";

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
import * as message from "../../components/Message/Message";

const CheckEmailSignUpPage = () => {
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const navigate = useNavigate();

  const mutation = useMutationHooks((data) =>
    UserService.checkEmailSignUp(data)
  );
  const { data, isPending, isError, isSuccess } = mutation;
  const token = data?.token;
  // console.log('token', data?.token)

  useEffect(() => {
    if (isSuccess && data.status === "OK") {
      message.success();
      navigate("/check-otp-sign-up", { state: { email, name, token } });
    } else if (
      isSuccess &&
      (data.status === "ERR_email" ||
        data.status === "ERR_pass" ||
        data.status === "ERR_all" ||
        data.status === "ERR_name")
    ) {
      message.error();
    }
  }, [isError, isSuccess]);

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeName = (value) => {
    setname(value);
  };

  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  const handleSignUp = () => {
    mutation.mutate({
      email,
      name,
    });
    if (isSuccess) {
      if (data.status === "ERR_email") {
        navigate("/check-email-sign-up");
      } else if (data.status === "ERR_name") {
        navigate("/check-email-sign-up");
      }
    }
  };

  return (
    // <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
    //     <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
    //         <WrapperContainerLeft>
    //             <h1>Xin Chào</h1>
    //             <p style={{ marginBottom: '20px', fontSize: '13px' }}>Đăng Ký Tài Khoản</p>
    //             <InputForm style={{ marginBottom: '10px' }} placeholder="Name" value={name} onChange={handleOnchangeName} />
    //             <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail} />

    //             {/* thông báo lỗi khi ko đăng nhập đx */}
    //             {data?.status === 'ERR_email' && <span style={{ color: 'red' }}>{data?.message}</span>}
    //             {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
    //             {data?.status === 'ERR_1' && <span style={{ color: 'red' }}>{data?.message}</span>}

    //             {/* cái trang khung để thông báo lỗi */}
    //             <Loading isPending={isPending}>
    //                 <ButtonComponents
    //                     // khi nhập đủ thông tin --email và password và confirmPassword-- thì ta mới cho bấm --đăng nhập--
    //                     disabled={!email}
    //                     // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignUp--
    //                     onClick={handleSignUp}
    //                     // bordered={false}
    //                     size={40}
    //                     styleButon={{
    //                         background: 'rgb(255, 57, 69)',
    //                         height: '48px',
    //                         width: '100%',
    //                         border: 'none',
    //                         boderRadius: '4px',
    //                         margin: '26px 0 10px'
    //                     }}
    //                     textButton={'Đăng Ký'}
    //                     styleTextButon={{ color: '#fff', fontSize: '15px', fontWeight: '700px' }}
    //                 ></ButtonComponents>
    //             </Loading>
    //             <p style={{ marginTop: '20px' }}></p>
    //             {/* <p style={{ marginTop: '20px' }}><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p> */}

    //             {/*
    //                 khi kik vào cái --Tạo tài khoản-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateSignup--
    //                 mình tạo ở trên để link tới trang --đăng ký--
    //             */}
    //             <p>Bạn đã có tài khoản<WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
    //         </WrapperContainerLeft>
    //         <WrapperContainerRight>
    //             <Image src={imageLogo} preview={false} alt="image-logo" height="203px" width="203px" />
    //             <h4>Mua sắm tại LTDD</h4>
    //         </WrapperContainerRight>
    //     </div>
    // </div>

    <WrapperContainer>
      <SigninPageHeader>
        <SigninPageHeaderLogo>
        <SigninPageHeaderLink>
          <SigninPageHeaderImage
            src={imageLogo}
            preview={false}
            alt="image-logo"
            onClick={() => navigate("/")}
          />
        </SigninPageHeaderLink>
        <SigninPageHeaderHeading>Đăng Ký</SigninPageHeaderHeading>
        </SigninPageHeaderLogo>
        <SigninPageHeaderHelp >
          <SigninPageHeaderHelpLink href="">Bạn cần giúp đỡ ? </SigninPageHeaderHelpLink>
        </SigninPageHeaderHelp>

      </SigninPageHeader>
      <SigninPageContent>
        <SigninPageContentLogo>
          <SigninPageContentImage
            src={Content_Logo}
            preview={false}
            alt="image-logo"
          />
          <SigninPageContentLogoHeading>
            Mua sắm tại PNJ
          </SigninPageContentLogoHeading>
        </SigninPageContentLogo>

        <SigninPageContentForm>
          <SigninPageContentFormHeading>
            Xin Chào
          </SigninPageContentFormHeading>
          <SigninPageContentFormText>
            Đăng Ký Tài Khoản
          </SigninPageContentFormText>
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="Name"
            value={name}
            onChange={handleOnchangeName}
          />
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />

          {/* thông báo lỗi khi ko đăng nhập đx */}
          {data?.status === "ERR_email" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          {data?.status === "ERR_1" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}

          {/* cái trang khung để thông báo lỗi */}
          <Loading isPending={isPending}>
            <ButtonComponents
              // khi nhập đủ thông tin --email và password và confirmPassword-- thì ta mới cho bấm --đăng nhập--
              disabled={!email}
              // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignUp--
              onClick={handleSignUp}
              // bordered={false}
              size={40}
              styleButon={{
                background: "#003468",
                height: "48px",
                width: "100%",
                border: "none",
                boderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng Ký"}
              styleTextButon={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700px",
              }}
            ></ButtonComponents>
          </Loading>
          <p style={{ marginTop: "20px" }}></p>
          {/* <p style={{ marginTop: '20px' }}><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p> */}

          {/*
                    khi kik vào cái --Tạo tài khoản-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateSignup--
                    mình tạo ở trên để link tới trang --đăng ký--
                */}
          <p>
            Bạn đã có tài khoản
            <SigninPageContentFormLink onClick={handleNavigateSignIn}>
              {" "}
              Đăng nhập
            </SigninPageContentFormLink>
          </p>
        </SigninPageContentForm>
      </SigninPageContent>
    </WrapperContainer>
  );
};

export default CheckEmailSignUpPage;
