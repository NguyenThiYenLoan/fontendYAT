import React from "react";
import {
  FooterContainer,
  FooterContent,
  LogoContainer,
  LogoImage,
  Copyright,
  FooterContentInfor,
  FooterContentInforTitle,
  FooterContentInforLink,
  FooterContentInforTitleImg,
} from "./style";
import logo from "../../assets/images/logoPNJ.png";
import pay from "../../assets/images/Pay.png";
import transport from "../../assets/images/transport.png";
import { useNavigate } from "react-router-dom";
import {
  PhoneOutlined,
  MailOutlined,
  FacebookOutlined,
  InstagramOutlined,
} from "@ant-design/icons";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <FooterContainer>
      <LogoContainer>
        <LogoImage src={logo} alt="Logo" />
      </LogoContainer>
      <FooterContent>
        <FooterContentInfor>
          <FooterContentInforTitle>Chăm sóc khách hàng</FooterContentInforTitle>
          <div>
            <ul>
              <li>
                <FooterContentInforLink>
                  Trung tâm trợ giúp
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  Hướng dẫn mua hàng
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>Thanh toán</FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  Trả hàng & Hoàn tiền
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  Chính sách bảo hành
                </FooterContentInforLink>
              </li>
            </ul>
          </div>
        </FooterContentInfor>

        <FooterContentInfor>
          <FooterContentInforTitle>Về chúng tôi</FooterContentInforTitle>
          <div>
            <ul>
              <li>
                <FooterContentInforLink>
                  Giới thiệu về PNJ Việt Nam
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  Chính sách bảo mật
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>Điều Khoản</FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>Flash Sales</FooterContentInforLink>
              </li>
            </ul>
          </div>
        </FooterContentInfor>

        <FooterContentInfor>
          <FooterContentInforTitle>Thông tin liên hệ</FooterContentInforTitle>
          <div>
            <ul>
              <li>
                <FooterContentInforLink>
                  Địa chỉ: 123 Đường ABC, Thành phố XYZ, Quốc gia
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  {" "}
                  <PhoneOutlined /> Điện thoại: +123 456 789
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  <MailOutlined /> Email: info@example.com
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  <FacebookOutlined /> Facebook
                </FooterContentInforLink>
              </li>
              <li>
                <FooterContentInforLink>
                  <InstagramOutlined />
                  Instagram
                </FooterContentInforLink>
              </li>
            </ul>
          </div>
        </FooterContentInfor>

        <FooterContentInfor>
          <FooterContentInforTitle>Liên kết nhanh</FooterContentInforTitle>
          <div>
            <ul>
              <li>
                <FooterContentInforLink
                  onClick={() => navigate("/")}
                >
                  Trang chủ
                </FooterContentInforLink>
              </li>

              <li>
                <FooterContentInforLink
                  onClick={() => navigate("/SiteMap")}
                >
                  Site Map
                </FooterContentInforLink>
              </li>

              <li>
                <FooterContentInforLink
                  onClick={() => navigate("/introduction")}
                >
                  Giới thiệu
                </FooterContentInforLink>
              </li>

              <li>
                <FooterContentInforLink
                  onClick={() => navigate("/")}
                >
                  Sản phẩm
                </FooterContentInforLink>
              </li>

              <li>
                <FooterContentInforLink
                  onClick={() => navigate("/contact")}
                >
                  Liên hệ
                </FooterContentInforLink>
              </li>
            </ul>
          </div>
        </FooterContentInfor>

        <FooterContentInfor>
          <div>
            <FooterContentInforTitle>Thanh toán</FooterContentInforTitle>
            <div>
              <FooterContentInforTitleImg src={pay}></FooterContentInforTitleImg>
            </div>
          </div>
          <div>
            <FooterContentInforTitle>Vận chuyển</FooterContentInforTitle>
            <div>
              <FooterContentInforTitleImg src={transport}></FooterContentInforTitleImg>
            </div>
          </div>
        </FooterContentInfor>
      </FooterContent>
      <Copyright>
        <p>© 2024 Tất cả các quyền đã được bảo lưu. Designed by Your Company</p>
        <p>Quốc gia : Việt Nam</p>
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;
