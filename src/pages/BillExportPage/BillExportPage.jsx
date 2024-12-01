import React, { useRef } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import * as OrderService from '../../services/OrderService';
import { useQuery } from '@tanstack/react-query';
import { oderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { useMemo } from 'react';
import Loading from '../../components/loadingComponents/Loading';
import {toPng} from 'html-to-image';
import download from 'downloadjs';
import { Wrapper, Header, Section, Label, Content, ProductList, ProductItem, ProductDetails, ProductName, PriceDetails, ColumnLabel } from './style';

const BillExportPage = () => {
    const params = useParams();
    const location = useLocation();
    const { state } = location;
    const { id } = params;
    const billRef = useRef(null); // Định nghĩa useRef cho billRef

    const fetchDetailsOrder = async () => {
        const res = await OrderService.getDetailsOrder(id, state?.token);
        return res.data;
    };

    const queryOrder = useQuery({
        queryKey: ['orders-details', id],
        queryFn: fetchDetailsOrder,
        enabled: !!id,
    });

    const { isPending, data } = queryOrder;

    const priceMemo = useMemo(() => {
        const result = data?.orderItems?.reduce((total, cur) => {
            return total + cur.price * cur.amount;
        }, 0);
        return result;
    }, [data]);

    // Hàm xử lý tải hóa đơn dưới dạng hình ảnh
    const handleDownload = async () => {
        if (billRef.current) {
            const dataUrl = await toPng(billRef.current);
            download(dataUrl, 'bill.png');
        }
    };

    return (
        <Loading isPending={isPending}>
            <Wrapper ref={billRef}> {/* Sử dụng billRef để tham chiếu đến phần tử Wrapper */}
                <Header>
                    <h2>HÓA ĐƠN THƯƠNG MẠI</h2>
                </Header>
                <Section>
                    <Label>Ngày lên đơn</Label>
                    <Content>
                        <div>{data?.updatedAt}</div>
                    </Content>
                </Section>
                <Section>
                    <Label>Địa chỉ người kho hàng</Label>
                    <Content>
                        <div>TP Hồ Chí Minh</div>
                    </Content>
                </Section>
                <Section>
                    <Label>Địa chỉ người nhận</Label>
                    <Content>
                        <div>{data?.shippingAddress?.fullName}</div>
                        <div>Địa chỉ: {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}</div>
                        <div>Điện thoại: {data?.shippingAddress?.phone}</div>
                    </Content>
                </Section>
                <Section>
                    <Label>Hình thức giao hàng</Label>
                    <Content>
                        <div>FAST - Giao hàng tiết kiệm</div>
                        <div>Phí giao hàng: {convertPrice(data?.shippingPrice)}</div>
                    </Content>
                </Section>
                <Section>
                    <Label>Hình thức thanh toán</Label>
                    <Content>
                        <div>{oderContant.payment[data?.paymentMethod]}</div>
                        <div>{data?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                    </Content>
                </Section>
                <ProductList>
                    <ProductItem>
                        <ColumnLabel>Tên sản phẩm</ColumnLabel>
                        <ColumnLabel>Giá</ColumnLabel>
                        <ColumnLabel>Số lượng</ColumnLabel>
                        <ColumnLabel>Giảm giá</ColumnLabel>
                    </ProductItem>
                    {data?.orderItems?.map((order, index) => (
                        <ProductItem key={index}>
                            <ProductDetails>
                                <img
                                    src={order?.image}
                                    alt={order?.name}
                                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                />
                                <ProductName>{order?.name}</ProductName>
                            </ProductDetails>
                            <div style={{ textAlign: 'center' }}>{convertPrice(order?.price)}</div>
                            <div style={{ textAlign: 'center' }}>{order?.amount}</div>
                            <div style={{ textAlign: 'center' }}>{order?.discount ? convertPrice(priceMemo * order?.discount / 100) : '0 VND'}</div>
                        </ProductItem>
                    ))}
                </ProductList>
                <PriceDetails>
                    <div>
                        <div><b>Tổng cộng:</b> <b style={{ color: 'red' }}>{convertPrice(data?.totalPrice)}</b></div>
                    </div>
                </PriceDetails>
                <div style={{ textAlign: 'center', marginTop: '27px' }}>
                    <button onClick={handleDownload} style={{ 
                        padding: '10px 20px', 
                        backgroundColor: '#3498db', 
                        color: '#fff', 
                        border: 'none', 
                        borderRadius: '5px', 
                        cursor: 'pointer', 
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                        transition: 'background-color 0.3s ease',
                    }}>
                        Xuất Hóa Đơn
                    </button>
                </div>
            </Wrapper>
        </Loading>
    );
};

export default BillExportPage;
