import React, { useEffect, useState } from "react";
import {
  WrapperContainer,
  SigninPageHeader,
  SigninPageHeaderLink,
  SigninPageHeaderImage,
  SigninPageHeaderHeading,
  SigninPageContent,
  SigninPageContentLogo,
  SigninPageContentImage,
  SigninPageContentLogoHeading,
  SigninPageContentFormHeading,
  SigninPageContentForm,
  SigninPageContentFormText,
  SigninPageContentFormLink,
  SigninPageHeaderLogo,
  SigninPageHeaderHelp,
  SigninPageHeaderHelpLink,
} from "./style";
import InputForm from "../../components/InputForm/InputForm";
import ButtonComponents from "../../components/ButtonComponents/ButtonComponents";
import imageLogo from "../../assets/images/logoPNJ.png";
import Content_Logo from "../../assets/images/logo-login.png";
import { Alert, Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/loadingComponents/Loading";

// thư viện dùng để lấy dư liệu access token phía client thì phải
import { jwtDecode } from "jwt-decode";

// link tới trang --UserService--
import * as UserService from "../../services/UserService";

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from "../../hooks/useMutationHooks";

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
// import * as message from '../../components/Message/Message'

// sau khi --login-- thành công thi add thư viện này zo n
// dùng để lấy thông tin của user
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slides/userSlide";
import { loadOrder1 } from "../../redux/slides/orderSlide";

import io from 'socket.io-client';
import { infothongbao } from "../../components/Message/Message";
const socket = io(`${process.env.REACT_APP_API_URL}`);

const SignInPage = () => {
  // tạo ra các --biến và set-- nhằm để truyền dữ liệu vào --thông qua set-- và lấy dữ liệu dùng --thông qua tên còn lại--
  // bằng cách sử dụng thư viện --useState()-- của --react--
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPaswrod] = useState("");

  // khi ở trang --productDetail-- khai báo và đx bên đó chuyển qua thì ta tạo lại để nhận nó
  const location = useLocation();

  // dùng để lấy thông tin của user
  const dispatch = useDispatch();

  // này dúng để khi mình link tới trang mình mong muốn
  const navigate = useNavigate();

  // ------------------------------------------------
  // bắt đầu làm lấy dữ liệu dưới backend lên
  // truyền
  const mutation = useMutationHooks(
    // --data =>-- nhận cái dữ liệu email,password từ client từ hàm --handleSignIn--
    (data) => UserService.loginUser(data)
  );

  // sau khi --login-- thì đã có dữ liệu
  // --data-- nhận từ --mutation-- lúc này là --access_token--
  const { data, isPending, isSuccess } = mutation;
  // console.log('mutation', mutation)
  // ------------------------------------------------

  // hàm này dùng để xử lý việc call API bên phía backend
  useEffect(() => {
    // xem xem nhận dx location của thằng --productDetail-- chưa dx bên đó gửi chưa
    // console.log('location', location)
    // nếu isSuccess===true
    if (isSuccess) {
      if (isSuccess && data.status === "OK") {
        // nhận --access_token-- từ --data--
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );

        // khi đẩy lên host thì nó ko nhận dx access_token nên phải thêm đoạn này
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );

        dispatch(loadOrder1());

        // nếu tồn tại --access_token-- từ data thì thực hiện
        if (data?.access_token) {
          // dùng để nhận cái  --id và isAdmin-- của user thông qua hàm ---jwtDecode()---
          const decode = jwtDecode(data?.access_token);
          // console.log('decode', decode)
          // nếu có decode?.id thì chuyền --id và access_token-- vào hàm --handleGetDetailsUser-- tạo bên dưới
          if (decode?.id) {
            // truyền --id và access_token-- vào hàm
            handleGetDetailsUser(decode?.id, data?.access_token);
          }
        }
        if (location?.state) {
          navigate(location?.state);
        } else {
          navigate("/");
        }
      } else if (isSuccess && data.status === "ERR") {
        navigate("/sign-in");
      }
    }
  }, [isSuccess]);

  // tạo ra 1 cái function để chuyền vào --id và token-- nhằm --call API đến server--
  // lúc này ta sẽ nhận được --id và access_token--
  const handleGetDetailsUser = async (id, token) => {
    // khi đẩy lên host thì nó ko nhận dx access_token nên phải thêm đoạn này
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);

    // sau khi truyền --id và access_token-- vào thì ta lấy được thông tin của --user--
    // gồm có --_id, mail, password, isAdmin--
    const res = await UserService.getDetailsUser(id, token);
    // console.log('res', res)
    // ta sẽ chuyền thông tin --_id, mail, password, isAdmin-- và --access_token-- cho updateUser
    // để lấy ra sử dụng bên phía --client-- thì phải
    if (res?._id !== '') {
      socket.emit('DkIdUser', res?.data._id, res?.data.name);
      socket.on('LoiChao', (LoiChao) => {
        alert(LoiChao)
      });
    }

    // console.log('res1111', res)
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  // tạo hàm này ra dùng để truyền dữ liệu vào --setEmail-- thông qua thanh --input-- phía dưới
  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  // tạo hàm này ra dùng để truyền dữ liệu vào --setPaswrod-- thông qua thanh --input-- phía dưới
  const handleOnchangePaswrod = (value) => {
    setPaswrod(value);
  };

  // tạo ra 1 cái function để khi kik vào nó link tới trang --đăng ký--
  const handleNavigateSignup = () => {
    navigate("/check-email-sign-up");
  };

  const handlePasswordRetrieval = () => {
    navigate("/password-retrieval");
  };

  // tạo hàm này dùng để in ra thông tin của --email, password--
  const handleSignIn = () => {
    // chuyền 2 dữ liệu nhập từ client vào --mutation-- dùng để chuyển sang --backend--
    mutation.mutate({
      email,
      password,
    });
    // console.log('sign-in', email, password)
  };

  return (
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
          <SigninPageHeaderHeading>Đăng Nhập</SigninPageHeaderHeading>
        </SigninPageHeaderLogo>
        <SigninPageHeaderHelp >
          <SigninPageHeaderHelpLink href="">Bạn cần giúp đỡ ? </SigninPageHeaderHelpLink>
        </SigninPageHeaderHelp>

      </SigninPageHeader>
      <SigninPageContent>
        <SigninPageContentLogo>
          <SigninPageContentImage
            src={Content_Logo} />
          <SigninPageContentLogoHeading>
            Mua sắm tại PNJ
          </SigninPageContentLogoHeading>
        </SigninPageContentLogo>

        <SigninPageContentForm>
          <SigninPageContentFormHeading>
            Xin Chào
          </SigninPageContentFormHeading>
          <SigninPageContentFormText>
            Đăng Nhập Vào Tài Khoản
          </SigninPageContentFormText>

          {/* --value={email}-- truyền email vào value */}
          {/* --handleOnChange={handleOnchangeEmail}-- sau đó gọi tới --hàm handleOnchangeEmail--  */}
          <InputForm
            style={{ marginBottom: "10px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />

          <div style={{ position: "relative" }}>
            <span
              // làm cái nút ẩn hiện mật khẩu
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

            {/* --value={password}-- truyền password vào value */}
            {/* --handleOnChange={handleOnchangePaswrod}-- sau đó gọi tới --hàm handleOnchangeEmail--  */}
            <InputForm
              placeholder="Password"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePaswrod}
            />
          </div>

          {/* thông báo lỗi khi ko đăng nhập đx */}
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}

          <Loading isPending={isPending}>
            <ButtonComponents
              // khi nhập đủ thông tin --email và password-- thì ta mới cho bấm --đăng nhập--
              disabled={!email || !password}
              // khi kik vào --đăng ký-- thì sẽ chạy hàm --handleSignIn--
              onClick={handleSignIn}
              // bordered={false}
              size={40}
              styleButon={{
                //background: "rgb(255, 57, 69)",
                background: "#003468",
                height: "48px",
                width: "100%",
                border: "none",
                boderRadius: "4px",
                margin: "26px 0 10px",
              }}
              textButton={"Đăng Nhập"}
              styleTextButon={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700px",
              }}
            ></ButtonComponents>
          </Loading>
          <p style={{ marginTop: "20px" }}>
            <SigninPageContentFormLink onClick={handlePasswordRetrieval}>
              Quên mật khẩu
            </SigninPageContentFormLink>
          </p>

          {/* 
                            khi kik vào cái --Tạo tài khoản-- thì sẽ thông qua --onClick-- từ cái hàm --handleNavigateSignup--
                            mình tạo ở trên để link tới trang --đăng ký--
                        */}
          <p>
            Chưa có tài khoản?{" "}
            <SigninPageContentFormLink onClick={handleNavigateSignup}>
              {" "}
              Tạo tài khoản
            </SigninPageContentFormLink>
          </p>
        </SigninPageContentForm>
      </SigninPageContent>
    </WrapperContainer>
  );
};

export default SignInPage;
