import React, { useState } from 'react'
import { WrapperInfo, WrapperContainer, WrapperValue, WrapperItemOrder, WrapperItemOrderInfo, WrapperContener, WrapperContener1, WrapperImgAndName, WrapperImg, WrapperName } from './style';

import { useSelector } from 'react-redux';

import Loading from '../../components/loadingComponents/Loading';
import { useLocation } from 'react-router-dom';
import { oderContant } from '../../contant';
import { convertPrice } from '../../utils';
import { useNavigate } from 'react-router-dom'


const OrderSuccess = () => {

  // lấy ra cái thằng order hiển thị lên cái thanh giỏ hàng có bao nhiêu sản phẩm
  const order = useSelector((state) => state.order)

  // lấy ra cái thằng user ra để bắt đầu thanh toán
  const user = useSelector((state) => state.user)

  const navigate = useNavigate() 

  // lấy dữ liệu chuyền qua từ --navigate-- bên phía --PaymentPage.jsx--
  // lúc này nhậc đưỡc dữ liệu gửi qua kèm theo --pathName--
  const location = useLocation()
  // console.log('location', location)
  // sau khi kiểm tra có gì rồi lấy dữ liệu ra
  const { state } = location

  // tạo ra để chứa --id--
  const [listChecked, setListChecked] = useState([state?.orders?.product])


  return (
    <WrapperContener>
      <Loading isPending={false}>
        <WrapperContener1>
          <br/>
          <h3 style={{textAlign: 'center', marginBottom: '20px'}}>Đơn Hàng Đã Đặt Thành Công</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <WrapperContainer>
              <WrapperInfo>
                <div>
                  <label>Phương Thức Giao Hàng</label>
                  <WrapperValue>
                    <span style={{ color: '#ea8500', fontWeight: 'bold' }}>{oderContant.delivery[state?.delivery]}</span> Giao Hàng Tiết Kiệm
                  </WrapperValue>
                </div>
              </WrapperInfo>

              <WrapperInfo>
                <label>Phương Thức Thanh Toán</label>
                <WrapperValue>
                  {oderContant.payment[state?.payment]}
                </WrapperValue>
              </WrapperInfo>

              <WrapperItemOrderInfo >
                {state.orders?.map((order, index) => {
                  return (
                    <WrapperItemOrder key={index}>
                      <WrapperImgAndName>
                        {/* khi clik vào thì sẽ hiển thị ra id thông qua value={order?.product}  */}
                        {/* checked={listChecked.includes(order?.product): hiển thị khi kik vào toàn bộ thì sẽ truyền id zo */}
                        {/* hiển thị bằng hàm --onChange-- từ hàm  */}
                        {/* onChange={onChange}   */}

                        <WrapperImg src={order?.image}/>
                        <WrapperName>{order?.name}</WrapperName>
                      </WrapperImgAndName>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Giá Tiền: &nbsp; {convertPrice(order?.price)}</span>
                        </span>

                        <span>
                          <span style={{ fontSize: '13px', color: '#242424' }}>Số Lượng: &nbsp; {order?.amount}</span>
                        </span>

                      </div>
                    </WrapperItemOrder>
                  )
                })}
              </WrapperItemOrderInfo>

              <span>
                <br/>
                <span style={{ fontSize: '15px', color: '#242424', color: 'red' }}>Tổng Tiền: &nbsp; {convertPrice(state?.totalPriceMemo)}</span>
              </span> <br/><br/><br/>

              <div style={{textAlign: 'center'}}>
               <button style={{width: '160px', height: '35px'}} onClick={() => navigate('/')}>Quay về trang chủ</button>
              </div>
              

            </WrapperContainer>
          </div>
        </WrapperContener1>
      </Loading>
    </WrapperContener>
  )
}

export default OrderSuccess