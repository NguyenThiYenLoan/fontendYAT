/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react'
import {
  WrapperAllPrice,
  WrapperItem,
  WrapperItemLabel,
  WrapperContent,
  WrapperTextPrice,
  Wrapper,
  ContenHeading,
  WrapperContentText,
  ContentOrderingProcess,
  ContentUser,
  ContentUserInfor,
  ContentOrderingProcessHeading,
  ContentOrderingProcessImage,
  ContentUserInforContainer,
  ContentUserInforLabel,
  ContentUserInforLabelText,
  ContentProduct,
  ContentProductInfor,
  ContentNameProductText,
  ContentProductTotal,
  ContentNameProductImg,
  WrapperItemTotal,
  ContentOrderingProcessBody,
  ContentOrderingProcessInfor,
} from "./style";
import DatHang from "../../assets/images/DatHang.png";
import ThanhToan from "../../assets/images/ThanhToan.png";
import VanChuyen from "../../assets/images/VanChuyen.png";
import NhanHang from "../../assets/images/NhanHang.png";
import HoanThanh from "../../assets/images/HoanThanh.png";
import { useLocation, useParams } from "react-router-dom";
import * as OrderService from "../../services/OrderService";
import { useQuery } from "@tanstack/react-query";
import { oderContant } from "../../contant";
import { convertPrice } from "../../utils";
import { useMemo } from "react";
import Loading from "../../components/loadingComponents/Loading";
import { Col, Image, Row } from "antd";
import { Checkbox, Rate } from "antd";
import {
  UserOutlined,
  CarOutlined,
  PayCircleOutlined,
} from "@ant-design/icons";
import { useMutationHooks } from '../../hooks/useMutationHooks'

const DetailsOrderPage = () => {
  const params = useParams();
  const location = useLocation();
  const { state } = location;
  const { id } = params;
  const [DeliveryStatus, setDeliveryStatus] = useState(true);
  const [cancellationStatus, setcancellationStatus] = useState(true);
  // console.log('state ---', state)
  // console.log('id ---', id)

  const fetchDetailsOrder = async () => {
    const res = await OrderService.getDetailsOrder(id, state?.token);
    return res.data;
  };

  const queryOrder = useQuery({
    queryKey: ["orders-details"],
    queryFn: fetchDetailsOrder,
    config: { enable: id },
  });
  const { isPending, data } = queryOrder;
  // console.log('data11', data)

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, cur) => {
      return total + cur.price * cur.amount;
    }, 0);
    return result;
  }, [data]);

  const renderContent = (type, options) => {
    switch (type) {
      case "checkbox":
        return (
          <Checkbox.Group
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              gap: "12px",
              marginTop: "15px",
              marginBottom: "15px",
            }}
          >
            {options.map((option, index) => {
              return (
                <Checkbox
                  key={index}
                  style={{ marginLeft: 0 }}
                  value={option.value}
                >
                  {option.label} Lựa Chọn
                </Checkbox>
              );
            })}
          </Checkbox.Group>
        );
      case "star":
        return options.map((option, index) => {
          return (
            <div key={index} style={{ display: "flex" }}>
              <Rate
                style={{ fontSize: "12px" }}
                disabled
                defaultValue={option}
              />
              <span>&emsp; {`từ ${option} sao`} </span>
            </div>
          );
        });
      case "price":
        return options.map((option, index) => {
          return (
            <WrapperTextPrice style={{ marginBottom: "-20px" }} key={index}>
              {option}
            </WrapperTextPrice>
          );
        });
      default:
        return {};
    }
  };


  const mutationUpdateOrder1 = useMutationHooks(
    (data) => {
      const { id, cancellationStatus, access_token } = data
      const res = OrderService.updateOrder2(id, cancellationStatus, access_token)
      return res
    }
  )
  const fetchUpdateOrder1 = () => {
    mutationUpdateOrder1.mutate({ id: id, cancellationStatus: cancellationStatus, access_token: state?.token })
  }

  const mutationUpdateOrder = useMutationHooks(
    (data) => {
      const { id, DeliveryStatus, access_token } = data
      const res = OrderService.updateOrder1(id, DeliveryStatus, access_token)
      return res
    }
  )
  const fetchUpdateOrder = () => {
    mutationUpdateOrder.mutate({ id: id, DeliveryStatus: DeliveryStatus, access_token: state?.token })
  }

  return (
    <Loading isPending={isPending}>
      <Wrapper>
        <Col span={24}>
          <WrapperContent>
            <ContenHeading>
              <WrapperContentText>Chi tiết đơn hàng</WrapperContentText>
            </ContenHeading>
            <ContentOrderingProcess>
              <ContentOrderingProcessHeading>
                Quy trình đặt hàng
              </ContentOrderingProcessHeading>
              <ContentOrderingProcessBody>
                <ContentOrderingProcessInfor>
                  <ul>
                    <li>
                      <ContentOrderingProcessImage
                        src={DatHang}
                        preview="false"
                        alt="image"
                      />
                    </li>
                    <li>
                      <span>Đặt hàng</span>
                    </li>
                  </ul>
                </ContentOrderingProcessInfor>

                <ContentOrderingProcessInfor>
                  <ul>
                    <li>
                      <ContentOrderingProcessImage
                        src={ThanhToan}
                        preview="false"
                        alt="image"
                      />
                    </li>
                    <li>
                      <span>Thanh toán</span>
                    </li>
                  </ul>
                </ContentOrderingProcessInfor>

                <ContentOrderingProcessInfor>
                  <ul>
                    <li>
                      <ContentOrderingProcessImage
                        src={VanChuyen}
                        preview="false"
                        alt="image"
                      />
                    </li>
                    <li>
                      <span>Giao hàng</span>
                    </li>
                  </ul>
                </ContentOrderingProcessInfor>

                <ContentOrderingProcessInfor>
                  <ul>
                    <li>
                      <ContentOrderingProcessImage
                        src={NhanHang}
                        preview="false"
                        alt="image"
                      />
                    </li>
                    <li>
                      <span>Nhận hàng</span>
                    </li>
                  </ul>
                </ContentOrderingProcessInfor>

                <ContentOrderingProcessInfor>
                  <ul>
                    <li>
                      <ContentOrderingProcessImage
                        src={HoanThanh}
                        preview="false"
                        alt="image"
                      />
                    </li>
                    <li>
                      <span>Hoàn thành</span>
                    </li>
                  </ul>
                </ContentOrderingProcessInfor>
              </ContentOrderingProcessBody>
            </ContentOrderingProcess>

            <ContentUser>
              <ContentUserInforContainer>
                <ContentUserInforLabel>
                  <UserOutlined />
                  <ContentUserInforLabelText>
                    Địa chỉ người nhận
                  </ContentUserInforLabelText>
                </ContentUserInforLabel>
                <ContentUserInfor>
                  <div className="name-info">
                    {data?.shippingAddress?.fullName}
                  </div>
                  <div className="address-info">
                    <span>Địa chỉ: </span>{" "}
                    {`${data?.shippingAddress?.address} ${data?.shippingAddress?.city}`}
                  </div>
                  <div className="phone-info">
                    <span>Điện thoại: </span> {data?.shippingAddress?.phone}
                  </div>
                </ContentUserInfor>
              </ContentUserInforContainer>

              <ContentUserInforContainer>
                <ContentUserInforLabel>
                  <CarOutlined />
                  <ContentUserInforLabelText>
                    Đơn vị vận chuyển
                  </ContentUserInforLabelText>
                </ContentUserInforLabel>
                <ContentUserInfor>
                  <div className="delivery-info">
                    <span className="name-delivery">FAST </span>Giao hàng tiết
                    kiệm
                  </div>
                  <div className="delivery-fee">
                    <span>Phí giao hàng: </span> {data?.shippingPrice}
                  </div>
                </ContentUserInfor>
              </ContentUserInforContainer>

              <ContentUserInforContainer style={{ border: "none" }}>
                <ContentUserInforLabel>
                  <PayCircleOutlined />
                  <ContentUserInforLabelText>
                    Phương thức thanh toán
                  </ContentUserInforLabelText>
                </ContentUserInforLabel>
                <ContentUserInfor>
                  <div className="payment-info">
                    {oderContant.payment[data?.paymentMethod]}
                  </div>
                  <div className="status-payment">
                    {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                  </div>
                </ContentUserInfor>
              </ContentUserInforContainer>
            </ContentUser>

            <ContentProduct>
              {data?.orderItems?.map((order, index) => {
                return (
                  <ContentProductInfor key={index}>
                    <ContentNameProductImg>
                      <img
                        src={order?.image}
                        style={{
                          width: "94px",
                          height: "94px",
                          objectFit: "cover",
                          border: "1px solid #eee",
                          padding: "2px",
                        }}
                      />
                    </ContentNameProductImg>
                    <ContentNameProductText>
                      <WrapperItem>
                        Tên Sản Phẩm:{" "}
                        <span style={{ color: "#454545", fontWeight: "bold" }}>
                          {order?.name}
                        </span>{" "}
                      </WrapperItem>
                      <WrapperItem>
                        {" "}
                        Giá: <span>{convertPrice(order?.price)}</span>
                      </WrapperItem>
                      <WrapperItem> Số lượng: {order?.amount}</WrapperItem>
                      <WrapperItem>
                        {" "}
                        Giảm giá:{" "}
                        {order?.discount
                          ? convertPrice((priceMemo * order?.discount) / 100)
                          : "0 VND"}
                      </WrapperItem>
                    </ContentNameProductText>
                  </ContentProductInfor>
                );
              })}

              <ContentProductTotal>
                <WrapperAllPrice>
                  <WrapperItemLabel>Tạm tính</WrapperItemLabel>
                  <WrapperItemTotal>{convertPrice(priceMemo)}</WrapperItemTotal>
                </WrapperAllPrice>
                <WrapperAllPrice>
                  <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
                  <WrapperItemTotal>
                    {convertPrice(data?.shippingPrice)}
                  </WrapperItemTotal>
                </WrapperAllPrice>
                <WrapperAllPrice>
                  <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
                  <WrapperItemTotal>
                    {convertPrice(data?.totalPrice)}
                  </WrapperItemTotal>
                </WrapperAllPrice>
              </ContentProductTotal>
            </ContentProduct>

            <ContenHeading>
              {
                data?.cancellationStatus ? (
                  <button
                    type="button"
                    style={{ width: '50%', backgroundColor: '#ccc',  color: 'white', cursor: 'not-allowed', }}
                    onClick={fetchUpdateOrder1}
                    disabled={true} 
                  >
                    Hủy Đơn
                  </button>
                ) : (
                  <button
                    type="button"
                    style={{ width: '50%', backgroundColor: '#003468', color: 'white',cursor: 'pointer' }}
                    onClick={fetchUpdateOrder1}
                  >
                    Hủy Đơn
                  </button>
                )
              }

              {
                data?.DeliveryStatus ? (
                  <button
                    type="button"
                    style={{ width: '50%', backgroundColor: '#ccc',  color: 'white', cursor: 'not-allowed', }}
                    onClick={fetchUpdateOrder}
                    disabled={true} // Vô hiệu hóa nút khi DeliveryStatus là true
                  >
                    Xác Nhận Đã Nhận Được Hàng
                  </button>
                ) : (
                  <button
                    type="button"
                    style={{ width: '50%', backgroundColor: '#003468', color: 'white', cursor: 'pointer'}}
                    onClick={fetchUpdateOrder}
                  >
                    Xác Nhận Đã Nhận Được Hàng
                  </button>
                )
              }

            </ContenHeading>
          </WrapperContent>
        </Col>
      </Wrapper>
    </Loading>
  );
};

export default DetailsOrderPage;
