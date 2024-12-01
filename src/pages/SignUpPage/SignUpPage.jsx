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
import { useLocation, useNavigate } from "react-router-dom";

// link tới trang --UserService--
import * as UserService from "../../services/UserService";

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from "../../hooks/useMutationHooks";
// thông báo lỗi
import Loading from "../../components/loadingComponents/Loading";

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const location = useLocation();
  // Lấy dữ liệu email từ trang trước
  const email = location.state?.email;
  const name = location.state?.name;
  const token = location.state?.token;
  const otp = location.state?.otp;

  // tạo ra các --biến và set-- nhằm để truyền dữ liệu vào --thông qua set-- và lấy dữ liệu dùng --thông qua tên còn lại--
  // bằng cách sử dụng thư viện --useState()-- của --react--
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [password, setPaswrod] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // này dúng để khi mình link tới trang mình mong muốn
  const navigate = useNavigate();

  // ------------------------------------------------
  // bắt đầu làm lấy dữ liệu dưới backend lên
  // truyền
  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isPending, isError, isSuccess } = mutation;

  // sử dụng để gọi tới hàm và in ra thông báo ĐK thành công
  useEffect(() => {
    // nếu isSuccess===true
    if (isSuccess && data.status === "OK") {
      // thông báo thành công
      message.success();
      // sau đó đá sang trang sign-in
      handleNavigateSignIn();
    } else if (
      isSuccess &&
      (data.status === "ERR_email" ||
        data.status === "ERR_passFail" ||
        data.status === "ERR_all" ||
        data.status === "ERR_tokenFail" ||
        data.status === "ERR_otpFail" ||
        data.status === "ERR_nameFail" ||
        data.status === "ERR_pass")
    ) {
      message.error();
    }
  }, [isError, isSuccess]);

  // console.log('mutation_signUp', mutation)

  // tạo hàm này ra dùng để truyền dữ liệu vào --setPaswrod-- thông qua thanh --input-- phía dưới
  const handleOnchangePaswrod = (value) => {
    setPaswrod(value);
  };
  // tạo hàm này ra dùng để truyền dữ liệu vào --setConfirmPassword-- thông qua thanh --input-- phía dưới
  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  // tạo ra 1 cái function để khi kik vào nó link tới trang --đăng ký--
  const handleNavigateSignIn = () => {
    navigate("/sign-in");
  };

  // tạo hàm này dùng để in ra thông tin của --email, password, confirmPassword--
  const handleSignUp = () => {
    mutation.mutate({
      email,
      name,
      otp,
      token,
      password,
      confirmPassword,
    });
    if (isSuccess) {
      if (
        data.status === "ERR_email" ||
        data.status === "ERR_passFail" ||
        data.status === "ERR_all" ||
        data.status === "ERR_tokenFail" ||
        data.status === "ERR_otpFail" ||
        data.status === "ERR_nameFail" ||
        data.status === "ERR_pass"
      ) {
        navigate("/sign-up");
      } else if (isSuccess && data.status === "OK") {
        navigate("/sign-in");
      }
    }
    // console.log('sign-up', email, password, confirmPassword)
  };

  return (
    // <WrapperContainer>
    //     <WrapperContainer1>
    //         <WrapperContainerLeft>
    //             <h1>Xin Chào</h1>
    //             <p style={{ marginBottom: '20px', fontSize: '13px' }}>Đăng Ký Tài Khoản</p>

    //             <div style={{ position: 'relative' }}>
    //                 <span
    //                     onClick={() => setIsShowPassword(!isShowPassword)}
    //                     style={{
    //                         zIndex: 10,
    //                         position: 'absolute',
    //                         top: '4px',
    //                         right: '8px'
    //                     }}
    //                 >{
    //                         isShowPassword
    //                             ? (
    //                                 <EyeFilled />
    //                             ) : (
    //                                 <EyeInvisibleFilled />
    //                             )
    //                     }
    //                 </span>
    //                 <InputForm style={{ marginBottom: '10px' }} placeholder="Password" type={isShowPassword ? "text" : "password"}
    //                     value={password} onChange={handleOnchangePaswrod} />
    //             </div>
    //             <div style={{ position: 'relative' }}>
    //                 <span
    //                     onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
    //                     style={{
    //                         zIndex: 10,
    //                         position: 'absolute',
    //                         top: '4px',
    //                         right: '8px'
    //                     }}
    //                 >{
    //                         isShowConfirmPassword ? (
    //                             <EyeFilled />
    //                         ) : (
    //                             <EyeInvisibleFilled />
    //                         )
    //                     }
    //                 </span>
    //                 <InputForm placeholder="Comfirm Password" type={isShowConfirmPassword ? "text" : "password"}
    //                     value={confirmPassword} onChange={handleOnchangeConfirmPassword} />
    //             </div>

    //             {/* thông báo lỗi khi ko đăng nhập đx */}
    //             {data?.status === 'ERR_email' && <span style={{ color: 'red' }}>{data?.message}</span>}
    //             {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
    //             {data?.status === 'ERR_passFail' && <span style={{ color: 'red' }}>{data?.message}</span>}
    //             {data?.status === 'ERR_pass' && <span style={{ color: 'red' }}>{data?.message}</span>}
    //             {data?.status === 'ERR_all' && <span style={{ color: 'red' }}>{data?.message}</span>}

    //             {/* cái trang khung để thông báo lỗi */}
    //             <Loading isPending={isPending}>
    //                 <ButtonComponents
    //                     // khi nhập đủ thông tin --email và password và confirmPassword-- thì ta mới cho bấm --đăng nhập--
    //                     disabled={!password || !confirmPassword}
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
    //             <p style={{ marginTop: '0px' }}></p>
    //             {/* <p style={{ marginTop: '20px' }}><WrapperTextLight>Quên mật khẩu</WrapperTextLight></p> */}

    //             {/*
    //                 khi kik vào cái --Tạo tài khoản-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateSignup--
    //                 mình tạo ở trên để link tới trang --đăng ký--
    //             */}
    //             <p>Bạn đã có tài khoản<WrapperTextLight onClick={handleNavigateSignIn}> Đăng nhập</WrapperTextLight></p>
    //         </WrapperContainerLeft>
    //     </WrapperContainer1>
    // </WrapperContainer>
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
        <SigninPageHeaderHelp>
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

          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{ marginBottom: "10px" }}
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePaswrod}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "4px",
                right: "8px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Comfirm Password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>

          {/* thông báo lỗi khi ko đăng nhập đx */}
          {data?.status === "ERR_email" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          {data?.status === "ERR_passFail" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          {data?.status === "ERR_pass" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          {data?.status === "ERR_all" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}

          {/* cái trang khung để thông báo lỗi */}
          <Loading isPending={isPending}>
            <ButtonComponents
              // khi nhập đủ thông tin --email và password và confirmPassword-- thì ta mới cho bấm --đăng nhập--
              disabled={!password || !confirmPassword}
              // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignUp--
              onClick={handleSignUp}
              // bordered={false}
              size={40}
              styleButon={{
                //background: 'rgb(255, 57, 69)',
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
          <p style={{ marginTop: "0px" }}></p>
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

export default SignUpPage;
