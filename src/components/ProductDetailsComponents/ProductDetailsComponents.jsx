/* eslint-disable jsx-a11y/alt-text */
import { Col, Image, Rate, Row } from "antd";

import {
  WrapperQualityProduct,
  WrapperInputNumber,
  WrapperProduct,
  WrapperProductImage,
  ProductImage,
  WrapperProductInfor,
  ProductName,
  ProductRate,
  WrapperProductName,
  WrapperAddress,
  WrapperQuanlity,
  ProductRateAndQuanlity,
  QuanlityLabel,
  WrapperService,
  WrapperServiceImg,
  WrapperButton,
  ButtonBuyNow,
  ButtonOrther,
  WrapperProductDescription,
  ProductDescriptionHeading,
  ProductDescriptionLabel,
  QualityButton,
} from "./style";
import ServiceDelivery from "../../assets/images/ServiceDelivery.png";
// icon hình ngôi sao
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ButtonComponents from "../ButtonComponents/ButtonComponents";

// link tới trang --UserService--
import * as ProductService from "../../services/ProductService";
import { useEffect, useState } from "react";
// import { useQuery } from "@tanstack/react-query"
import Loading from "../loadingComponents/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { addOrderProduct } from "../../redux/slides/orderSlide";
import { convertPrice } from "../../utils";
import { useMediaQuery } from "react-responsive";

const ProductDetailsComponents = ({ idProduct }) => {
  const isMobile = useMediaQuery({ query: "(max-width: 740px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 740px) and (max-width: 1030px)",
  });
  // chuyển trang
  const navigate = useNavigate();
  // lấy địa chỉ thanh url hiện đang khai báo khi chạy lên
  const location = useLocation();
  // lúc này trong --pathname-- sẽ chứa url tại trang khai báo
  // console.log('location', location)
  // dy chuyển đến state order
  const dispatch = useDispatch();

  // cách 1
  const [isPendingProduct, setIsPendingProduct] = useState(false);
  const [numProduct, setNumProduct] = useState(1);

  // lấy token dữ liệu của user khi đăng nhập
  const user = useSelector((state) => state.user);

  // tạo --useState-- để chứa dữ liệu dùng để --update--
  const [stateProductDetail, setStateProductDetail] = useState({
    name: "",
    image: "",
    type: "",
    countInStock: "",
    price: "",
    rating: "",
    description: "",
    id: "",
    discount: "",
    city: "",
  });

  // tạo cái hàm để hiển thị dữ liệu lên khung --tìm kiếm theo id--
  const fetchGetDetailsProduct = async (idProduct) => {
    // nếu tồn tại --_id-- thì thực hiện
    if (idProduct) {
      // --rowSelected-- ở đây là id
      // thực hiện lấy dữ liệu thông qua --id-- rồi gán dữ liệu vào  --setStateProductDetail--
      const res = await ProductService.getDetailProduct(idProduct);
      // console.log('res?.data', res)

      // nếu có data thì ta sé --set-- chuyền dữ liệu vào --setStateProductDetail--
      if (res?.data) {
        setStateProductDetail({
          name: res?.data?.name,
          image: res?.data?.image,
          type: res?.data?.type,
          countInStock: res?.data?.countInStock,
          price: res?.data?.price,
          rating: res?.data?.rating,
          description: res?.data?.description,
          id: res?.data?._id,
          discount: res?.data?.discount,
          city: res?.data?.city,
        });
      }
    }
  };

  // khi phát hiện có --id và
  // mở cái bảng --update-- lên thì gọi tới hàm --fetchGetDetailsProduct(rowSelected)-- và chuyền id vào
  useEffect(() => {
    // khi có --id và isOpenDrawer==true-- thì ta sẽ --loard-- dữ liệu lên bảng --update--
    if (idProduct) {
      setIsPendingProduct(true);
      fetchGetDetailsProduct(idProduct);
    }
    setIsPendingProduct(false);
  }, [idProduct]);

  const onchange = (value) => {
    setNumProduct(Number(value));
  };

  const handleChangeCount = (type) => {
    if (type === "increase") {
      setNumProduct(numProduct + 1);
    } else if (type === "decrease" && numProduct > 1) {
      setNumProduct(numProduct - 1);
    }
  };


  // bắt đầu qua trang order
  const handleAddOrderProduct = () => {
    // khi chưa đăng nhập thì phải đá tới trang login để đăng nhập mới dx mua hàng
    if (!user?.id) {
      // sau khi có --location?.pathName-- tức là đường link thì ta sẽ chuyền qua trang --homePage--
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // nếu đã có --user id--
      dispatch(
        addOrderProduct({
          orderItem: {
            name: stateProductDetail?.name,
            // số lượng
            amount: numProduct,
            // ảnh
            image: stateProductDetail?.image,
            price: stateProductDetail?.price,
            // id
            product: stateProductDetail?.id,
            // giảm giá
            discount: stateProductDetail?.discount,
            // cái city nữa
            city: stateProductDetail?.city,
          },
        })
      );

      const userId = user?.id;
      const orderData = {
        orderItem: {
          name: stateProductDetail?.name,
          // số lượng
          amount: numProduct,
          // ảnh
          image: stateProductDetail?.image,
          price: stateProductDetail?.price,
          // id
          product: stateProductDetail?.id,
          // giảm giá
          discount: stateProductDetail?.discount,
          // cái city nữa
          city: stateProductDetail?.city,
        },
      };
      // ---------------lưu vào trong localStorage---------------------
      // Lấy thông tin đơn hàng từ localStorage (nếu có)
      const orders = JSON.parse(localStorage.getItem("orders")) || {};
      // Lưu thông tin đơn hàng mới với userId là key
      orders[userId] = orderData;
      // Lưu thông tin đơn hàng mới vào localStorage
      localStorage.setItem("orders", JSON.stringify(orders));
      // console.log("orders", orders);
    }
  };

  // bắt đầu qua trang order
  const handleAddOrderProduct1 = () => {
    // khi chưa đăng nhập thì phải đá tới trang login để đăng nhập mới dx mua hàng
    if (!user?.id) {
      // sau khi có --location?.pathName-- tức là đường link thì ta sẽ chuyền qua trang --homePage--
      navigate("/sign-in", { state: location?.pathname });
    } else {
      // nếu đã có --user id--
      dispatch(
        addOrderProduct({
          orderItem: {
            name: stateProductDetail?.name,
            // số lượng
            amount: numProduct,
            // ảnh
            image: stateProductDetail?.image,
            price: stateProductDetail?.price,
            // id
            product: stateProductDetail?.id,
            // giảm giá
            discount: stateProductDetail?.discount,
            // cái city nữa
            city: stateProductDetail?.city,
          },
        })
      );
      const userId = user?.id;
      const orderData = {
        orderItem: {
          name: stateProductDetail?.name,
          // số lượng
          amount: numProduct,
          // ảnh
          image: stateProductDetail?.image,
          price: stateProductDetail?.price,
          // id
          product: stateProductDetail?.id,
          // giảm giá
          discount: stateProductDetail?.discount,
          // cái city nữa
          city: stateProductDetail?.city,
        },
      };
      // ---------------lưu vào trong localStorage---------------------
      // Lấy thông tin đơn hàng từ localStorage (nếu có)
      const orders = JSON.parse(localStorage.getItem("orders")) || {};
      // Lưu thông tin đơn hàng mới với userId là key
      orders[userId] = orderData;
      // Lưu thông tin đơn hàng mới vào localStorage
      localStorage.setItem("orders", JSON.stringify(orders));

      navigate("/order");
    }
  };

  return (
    <Loading isPending={isPendingProduct}>
      <WrapperProduct>
        <WrapperProductImage>
          <ProductImage
            src={stateProductDetail?.image}
            alt="image product"
            preview={true}
          />
        </WrapperProductImage>

        <WrapperProductInfor>
          <ProductName>{stateProductDetail?.name}</ProductName>
          <ProductRateAndQuanlity>
            {/* dùng cái hàm này để hiển thị số sao */}
            <ProductRate
              allowHalf
              value={stateProductDetail?.rating || 0} // sử dụng giá trị mặc định là 0 nếu undefined
              disabled
            />

            <span>Đã bán 1000+</span>
          </ProductRateAndQuanlity>
          <WrapperProductName>
            <ProductName>{convertPrice(stateProductDetail?.price)}</ProductName>
          </WrapperProductName>
          <WrapperAddress>
            <span>
              Giao đến{" "}
              <span className="address">
                <b>{user?.address}</b>
              </span>
            </span>
            {/* <span className='change-address'> Đổi địa chỉ</span> */}
          </WrapperAddress>
          <WrapperQuanlity>
            <QuanlityLabel>Số lượng</QuanlityLabel>
            <WrapperQualityProduct>
              {/* <ButtonComponents /> */}
              <QualityButton
                onClick={() => handleChangeCount("decrease")}
              >
                <MinusOutlined />
              </QualityButton>

              <WrapperInputNumber
                onChange={onchange}
                value={numProduct} // Controlled component
              />


              <QualityButton
                onClick={() => handleChangeCount("increase")}
              >
                <PlusOutlined />
              </QualityButton>
            </WrapperQualityProduct>
          </WrapperQuanlity>
          <WrapperService>
            <WrapperServiceImg src={ServiceDelivery}></WrapperServiceImg>
          </WrapperService>
          <WrapperButton>
            <ButtonBuyNow>
              <ButtonComponents
                bordered={"none"}
                size={40}
                styleButon={{
                  background: "#ad2a36",
                  height: "48px",
                  width: "100%",
                  border: "1px solid #ad2a36",
                  boderRadius: "4px",
                }}
                onClick={() =>
                  stateProductDetail.countInStock !== 0 &&
                  handleAddOrderProduct1()
                }
                disabled={stateProductDetail.countInStock === 0}
                textButton={"Mua ngay"}
                styleTextButon={{
                  color: "rgb(255, 255, 255)",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                }}
              ></ButtonComponents>
            </ButtonBuyNow>
            <ButtonOrther>
              <ButtonComponents
                bordered={"none"}
                size={40}
                styleButon={{
                  color: "white",
                  background: "#06386b",
                  height: "48px",
                  width: "50%",
                  border: "none",
                  boderRadius: "4px",
                  marginRight: "5px",
                }}
                onClick={() =>
                  stateProductDetail.countInStock !== 0 &&
                  handleAddOrderProduct()
                }
                disabled={stateProductDetail.countInStock === 0}
                textButton={"Thêm vào giỏ hàng"}
                styleTextButon={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginLeft: "-3%",
                }}
              ></ButtonComponents>

              <ButtonComponents
                bordered={"none"}
                size={40}
                styleButon={{
                  background: "#06386b",
                  height: "48px",
                  width: "50%",
                  border: "none",
                  boderRadius: "4px",
                  marginLeft: "5px",
                }}
                onClick={() => navigate("/contact")}
                disabled={stateProductDetail.countInStock === 0}
                textButton={"Liên hệ"}
                styleTextButon={{
                  color: "#fff",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  marginLeft: "-3%",
                }}
              ></ButtonComponents>
            </ButtonOrther>
          </WrapperButton>
        </WrapperProductInfor>
      </WrapperProduct>

      <WrapperProductDescription>
        {/* dùng này để hiển thị dữ liệu của --ckeditor-- ra */}
        <div style={{ width: "100%" }}>
          <ProductDescriptionLabel>Mô tả sản phẩm</ProductDescriptionLabel>
          <div
            dangerouslySetInnerHTML={{
              __html: stateProductDetail?.description,
            }}
            style={{ padding: "10px" }}
          />
        </div>
      </WrapperProductDescription>
    </Loading>
  );
};

export default ProductDetailsComponents;
