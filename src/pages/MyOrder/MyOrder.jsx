import React, { useEffect } from 'react'
// link tới trang --OrderService--
import * as OrderService from '../../services/OrderService'

import { useSelector } from 'react-redux'
import { useMutationHooks } from '../../hooks/useMutationHooks'
import Loading from '../../components/loadingComponents/Loading'

import { convertPrice } from '../../utils';
import { WrapperItemOrder, WrapperListOrder, WrapperHeaderItem, WrapperFooterItem, WrapperContainer, WrapperStatus, WrapperWidthOrder } from './style';
import * as message from '../../components/Message/Message'
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';
import { useLocation, useNavigate } from 'react-router-dom'
// import { useQuery } from '@tanstack/react-query'

const MyOrder = () => {

  // lấy ra cái thằng user ra để bắt đầu thanh toán
  const user = useSelector((state) => state.user)
  // console.log('userid', user?.id)
  // console.log('user access_token', user?.access_token)

  const navigate = useNavigate()

  // dùng để lấy dữ liệu gửi cùng với url bên phía headercomponent.jsx
  const location = useLocation()
  // nhằm tăng tốc độ load dư liệu lên
  const { state } = location
  // chứa thằng state ta gửi bên kia gồm id và access_token
  // console.log('location', location)


  useEffect(() => {
    mutationMyOrder.mutate({ id: state?.id, token: state?.access_token })
  }, [state?.id && state?.access_token])

  // bắt đầu làm dữ liệu xuống backend để --update--
  const mutationMyOrder = useMutationHooks(
    (data) => {
      // console.log('data1', data)
      const { id, token } = data
      const res = OrderService.getAllOrderByUserId(id, token)
      // trả về cái data
      return res
    }
  )

  // lấy được isPending là dữ liệu sau khi update
  const { isPending, data } = mutationMyOrder
  // console.log('mutationMyOrder order', mutationMyOrder)
  // console.log('data order', data)


  // xem chi tiết đơn hàng
  const handleDetailsOrder = (id) => {
    navigate(`/details-order/${id}`, {
      state: {
        token: state?.token
      }
    })
  }

  // xem chi tiết đơn hàng
  const handleBillExport  = (id) => {
    navigate(`/bill-export/${id}`, {
      state: {
        token: state?.token
      }
    })
  }


  const mutation = useMutationHooks(
    (data) => {
      const { id, token } = data
      const res = OrderService.cancelOrder(id, token)
      return res
    }
  )

  const handleCanceOrder = (order) => {
    mutation.mutate({ id: order._id, token: state?.token }, {
      onSuccess: () => {
        window.location.reload()
        alert('Hủy Đơn Hàng Thành Công')
      },
    })
  }
  const { isPending: isPendingCancel, isSuccess: isSuccessCancel, isError: isErrorCancle, data: dataCancel } = mutation

  useEffect(() => {
    if (isSuccessCancel && dataCancel?.status === 'OK') {
      message.success()
    } else if (isSuccessCancel && dataCancel?.status === 'ERR') {
      message.error()
    } else if (isErrorCancle) {
      message.error()
    }
  }, [isErrorCancle, isSuccessCancel])


  // hiện tên với image của sản phẩm
  const renderProduct = (data) => {
    return data?.map((order) => {
      return <WrapperHeaderItem key={order?._id}>
        <img src={order?.image}
          style={{
            width: '70px',
            height: '70px',
            objectFit: 'cover',
            border: '1px solid rgb(238, 238, 238)',
            padding: '2px'
          }}
        />
        <div style={{
          width: 260,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          marginLeft: '10px'
        }}>{order?.name}</div>
        <span style={{ fontSize: '13px', color: '#242424', marginLeft: 'auto' }}>{convertPrice(order?.price)}</span>
      </WrapperHeaderItem>
    })
  }


  return (
    <Loading isPending={isPending}>
      <WrapperContainer>
        <WrapperWidthOrder>
          <br />
          <h2 style={{ textAlign: 'center' }}>Đơn hàng của tôi</h2>
          <WrapperListOrder>
            {data?.data?.map((order) => {
              return (
                <WrapperItemOrder key={order?._id}>
                  <WrapperStatus>
                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Trạng thái</span>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Giao hàng: </span>
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}`}</span>
                    </div>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Thanh toán: </span>
                      <span style={{ color: 'rgb(90, 32, 193)', fontWeight: 'bold' }}>{`${order.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}`}</span>
                    </div>
                  </WrapperStatus>
                  {renderProduct(order?.orderItems)}
                  <WrapperFooterItem>
                    <div>
                      <span style={{ color: 'rgb(255, 66, 78)' }}>Tổng tiền: </span>
                      <span
                        style={{ fontSize: '13px', color: 'rgb(56, 56, 61)', fontWeight: 700 }}
                      >{convertPrice(order?.totalPrice)}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <ButtonComponents
                        onClick={() => handleCanceOrder(order)}
                        size={40}
                        styleButon={{
                          height: '36px',
                          border: '1px solid #9255FD',
                          borderRadius: '4px'
                        }}
                        textButton={'Hủy đơn hàng'}
                        styleTextButon={{ color: '#9255FD', fontSize: '14px' }}
                      >
                      </ButtonComponents>
                      <ButtonComponents
                        onClick={() => handleDetailsOrder(order?._id)}
                        size={40}
                        styleButon={{
                          height: '36px',
                          border: '1px solid #9255FD',
                          borderRadius: '4px'
                        }}
                        textButton={'Xem chi tiết'}
                        styleTextButon={{ color: '#9255FD', fontSize: '14px' }}
                      >
                      </ButtonComponents>
                      <ButtonComponents
                        onClick={() => handleBillExport(order?._id)}
                        size={40}
                        styleButon={{
                          height: '36px',
                          border: '1px solid #9255FD',
                          borderRadius: '4px'
                        }}
                        textButton={'Xuất bill'}
                        styleTextButon={{ color: '#9255FD', fontSize: '14px' }}
                      >
                      </ButtonComponents>
                    </div>
                  </WrapperFooterItem>
                </WrapperItemOrder>
              )
            })}
          </WrapperListOrder>
        </WrapperWidthOrder>
        <br /><br /><br /><br />
      </WrapperContainer>
    </Loading>
  )
}

export default MyOrder