import React, { useEffect, useMemo, useState } from 'react'
import { WrapperInfo, WrapperLeft, WrapperRight, WrapperTotal, WrapperRadio, WrapperContainer, WrapperContainer1 } from './style';

import { useDispatch, useSelector } from 'react-redux';
import { Form, Radio } from 'antd';

// cái xử lý bên state order
import { convertPrice } from '../../utils';
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/loadingComponents/Loading';
import InputComponents from '../../components/InputComponents/InputComponents';

// thanh toán
import { PayPalButton } from "react-paypal-button-v2";


// link tới trang --UserService--
import * as UserService from '../../services/UserService'
// link tới trang --OrderService--
import * as OrderService from '../../services/OrderService'

// link tới trang thanh toán
import * as PaymentService from '../../services/PaymentService'

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from '../../hooks/useMutationHooks'

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import { removeAllOrderProduct } from '../../redux/slides/orderSlide';

const PaymentPage = () => {
  const navigator = useNavigate()
  // lấy ra cái thằng order hiển thị lên cái thanh giỏ hàng có bao nhiêu sản phẩm
  const order = useSelector((state) => state.order)
  // lấy ra cái thằng user ra để bắt đầu thanh toán
  const user = useSelector((state) => state.user)
  const [delivery, setDelivery] = useState('fast')
  const [payment, setPayment] = useState('later_money')
  // dùng để mở cái bảng updateInfo lên
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)

  // tạo --useState-- để chứa dữ liệu dùng để --update--
  const [stateUserDetail, setstateUserDetail] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
  })

  // dùng để thanh toán
  const [sdkReady, setSdkReady] = useState(false)
  // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
  const [form] = Form.useForm();
  // dùng để gọi hàm từ trang --orderstate--
  const disPatch = useDispatch()

  // // tiến hành --gán-- dữ liệu lên thanh --input-- để -update--  
  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  useEffect(() => {
    if (isOpenModalUpdateInfo) {
      setstateUserDetail({
        name: user?.name,
        address: user?.address,
        city: user?.city,
        phone: user?.phone,
      })
    }
  }, [isOpenModalUpdateInfo])

  // mở ra cái bảng thay đổi địa chỉ
  const handleChangeAddress = () => {
    setIsOpenModalUpdateInfo(true)
  }

  // ko biết sao dùng 2 cái map cùng lúc để load dữ liệu ra được nên ta dùng cái --useMeno-- để load củng dx 
  // cái giá tiền tạm tính
  const priceMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      return total + ((cur.price * cur.amount))
    }, 0)
    return result
  }, [order])

  // ko biết sao dùng 2 cái map cùng lúc để load dữ liệu ra được nên ta dùng cái --useMeno-- để load củng dx 
  // tính cái giảm giá
  const priceDiscountMemo = useMemo(() => {
    const result = order?.orderItemsSelected?.reduce((total, cur) => {
      const discount = ((cur.discount || 0) / 100) * (cur.price || 0) * (cur.amount || 0); // Nhân với số lượng để tính tổng giảm giá
      return total + discount;
    }, 0)
    return result
  }, [order])

  // ko biết sao dùng 2 cái map cùng lúc để load dữ liệu ra được nên ta dùng cái --useMeno-- để load củng dx 
  // tính phí giao hàng 
  const diliveryPriceMemo = useMemo(() => {
    if (priceMemo === 0) {
      return 0; // Phí giao hàng 0 khi tổng tạm tính bằng 0
    } else if (priceMemo < 200000) {
      return 20000; // Phí giao hàng 20k cho đơn hàng < 200k
    } else if (priceMemo >= 200000 && priceMemo <= 500000) {
      return 10000; // Phí giao hàng 10k cho đơn hàng từ 200k đến 500k
    } else {
      return 0; // Miễn phí giao hàng cho đơn hàng > 500k
    }
  }, [priceMemo])

  // ko biết sao dùng 2 cái map cùng lúc để load dữ liệu ra được nên ta dùng cái --useMeno-- để load củng dx 
  // tổng giá tiền 
  const totalPriceMemo = useMemo(() => {
    return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
  }, [priceMemo, priceDiscountMemo, priceMemo])

  // bắt đầu chuyển sang trang xác nhận mua hàng và thanh toán ------------------------
  const handleAddOrder = () => {
    if (user?.access_token && order?.orderItemsSelected && user?.name && user?.address && user?.phone
      && user?.city && priceMemo && user?.id && user?.email) {
      mutationAddOrder.mutate(
        {
          token: user?.access_token,
          orderItems: order?.orderItemsSelected,
          fullName: user?.name,
          address: user?.address,
          phone: user?.phone,
          city: user?.city,
          paymentMethod: payment,
          itemsPrice: priceMemo,
          shippingPrice: diliveryPriceMemo,
          totalPrice: totalPriceMemo,
          user: user?.id,
          email: user?.email
        }
      )
    }
  }

  // bắt đầu làm dữ liệu xuống backend để --update--
  const mutationUpdate = useMutationHooks(
    (data) => {
      // console.log('data1', data)
      const { id, token, ...rests } = data
      const res = UserService.updateUser(id, { ...rests }, token)
      // trả về cái data
      return res
    },
  )

  // bắt đầu làm dữ liệu xuống backend để --update--
  const mutationAddOrder = useMutationHooks(
    (data) => {
      // console.log('data1', data)
      const { token, ...rests } = data
      const res = OrderService.createOrder({ ...rests }, token)
      // trả về cái data
      return res
    },
  )

  // lấy được isPending là dữ liệu sau khi update
  const { isPending, data } = mutationUpdate
  const { isPending: isPendingAddOrder, isSuccess, isError, data: dataOrder } = mutationAddOrder
  // console.log('data order', data)
  // console.log('isPending order', isPending)
  // console.log('isPendingAddOrder order', isPendingAddOrder)

  // sử dụng để gọi tới hàm và in ra thông báo --delete many-- thành công hay thấ bại
  useEffect(() => {
    // nếu isSuccess===true
    if (isSuccess && dataOrder?.status === 'OK') {
      // khi đặt thành công rồi thì cái sản phẩm trong giỏ hàng sẽ mất đi
      // chứa mảng id đã đặt thành công
      const arrayOrderId = []
      order?.orderItemsSelected?.forEach((element) => {
        // lúc này đã lấy được mảng id đã đặt thành công
        arrayOrderId.push(element.product)
      });
      // sau đó gọi tới hàm xóa toàn bộ dữ liệu trong state của bên phía --orderSlide--
      disPatch(removeAllOrderProduct({ listChecked: arrayOrderId }))
      // thông báo thành công
      message.success('Đặt Hàng Thành Công')
      // sau khi đặt hàng thành công sẽ chuuyển đến trang này kèm theo dữ liệu đã order
      navigator('/orderSuccess', {
        state: {
          // phương thức giao hàng
          delivery,
          // phương thức thanh toán
          payment,
          // thông tin sản phẩm
          orders: order?.orderItemsSelected,
          // tổng tiền
          totalPriceMemo: totalPriceMemo
        }
      })
    }
    else if (dataOrder?.status === 'ERR') {
      alert(dataOrder?.message)
    }
  }, [isError, isSuccess])

  // đóng cái bản updateInfo lại
  const handleCancelUpdateInfo = () => {
    setstateUserDetail({
      name: '',
      phone: '',
      address: '',
      city: '',
    })
    // reser lại cái form
    form.resetFields()
    setIsOpenModalUpdateInfo(false)
  }

  // thanh toán thành công
  const onSuccessPaypal = (details, data) => {
    mutationAddOrder.mutate(
      {
        token: user?.access_token,
        orderItems: order?.orderItemsSelected,
        fullName: user?.name,
        address: user?.address,
        phone: user?.phone,
        city: user?.city,
        paymentMethod: payment,
        itemsPrice: priceMemo,
        shippingPrice: diliveryPriceMemo,
        totalPrice: totalPriceMemo,
        user: user?.id,
        // trạng thái thanh toán
        isPaid: true,
        // thời gian đặt hàng
        paidAt: details.update_time
      }
    )
    // console.log('details, data', details, data)
  }

  // bắt đầu update ------------------
  const handleUpdateInfoUser = () => {
    // console.log('stateUserDetail', stateUserDetail)
    // khi có 4 thằng này thì bắt đầu update
    const { name, phone, city, address } = stateUserDetail
    if (name && phone && city && address) {
      mutationUpdate.mutate({ id: user?.id, ...stateUserDetail, token: user?.access_token }, {
        // khi thêm thành công thì set cho --setIsOpenModalUpdateInfo(false)-- để đóng cửa sổ lại
        onSuccess: () => {

          // sau khi thêm dữ liệu xong thì mình sẽ sét dữ liệu bên phía state luôn
          disPatch(updateUser({ name, phone, city, address }))

          // disPatch(UserService.updateUser({name, phone, city, address }))
          setIsOpenModalUpdateInfo(false)

          // Reload trang
          window.location.reload();
        }
      })

    }
  }

  // hàm này dùng để --gán-- dữ liệu từ --thanh input-- vào các biến --của stateUserDetail--
  const handleOnchangeDetail = (e) => {
    // console.log('e.target.name', e.target, e.target.value)
    setstateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
  }

  const handleDilivery = (e) => {
    setDelivery(e.target.value)
  }

  const handlePatment = (e) => {
    setPayment(e.target.value)
  }

  // thanh toán
  const addPaypalScript = async () => {
    // sau khi nhận được cái --CLIENT_ID--
    const { data } = await PaymentService.getConfig()
    // console.log('data config', data)
    // thì bắt đầu làm scrip
    const script = document.createElement('script')
    // add nó về kiểu --text/javascrupt--
    script.type = 'text/javascript'

    // bắt đầu tiến hành
    script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
    // sau đó phải sét cho cái scrip này là bất đồng bộ
    script.async = true;

    // sau đó mới chạy (load) cái scrip
    script.onload = () => {
      // lúc đang load thì cho --setSdkReady-- bằng true
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    // nếu đã tồn tại cái --paypal-- thì sẽ chạy vào hàm --addPaypalScript()-- để sét --setSdkReady(true)-- 
    if (!window.paypal) {
      addPaypalScript()
    } else {
      // còn đã tồn tại rồi thì cứ sét tiếp cho nó bằng true
      setSdkReady(true)
    }

  }, [])


  return (
    <WrapperContainer>
      <Loading isPending={isPendingAddOrder}>
        <WrapperContainer1>
          <h3 style={{padding: '10px 0px'}}>Thanh Toán</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            <WrapperLeft>
              <WrapperInfo>
                <div>
                  <label>Chọn Phương Thức Giao Hàng</label>
                  <WrapperRadio onChange={handleDilivery} value={delivery}>
                    <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao Hàng Tiết Kiệm</Radio>
                    <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao Hàng Tiết Kiệm</Radio>
                  </WrapperRadio>
                </div>
              </WrapperInfo>
              <WrapperInfo>
                <label>Chọn Phương Thức Thanh Toán</label>
                <WrapperRadio onChange={handlePatment}>
                  <Radio value="later_money"> Thanh Toán Tiền Mặt Khi Nhận Hàng</Radio>
                  <Radio value="paypal"> paypal</Radio>
                </WrapperRadio>
              </WrapperInfo>
            </WrapperLeft>
            <WrapperRight>
              <div style={{ width: '100%' }}>

                {/* hiển thị cái địa chỉ ra kèm nút thay đổi địa chỉ */}
                <WrapperInfo>
                  <div>
                    <span>Địa Chỉ: </span>
                    <span style={{ fontWeight: 'bold' }}>{`${user?.address} - ${user?.city} `}</span>
                    <br />
                    <span onClick={handleChangeAddress} style={{ color: 'blue', cursor: 'pointer' }}>Thay Đổi Địa Chỉ Nhận Hàng</span>
                  </div>
                </WrapperInfo>

                <WrapperInfo>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Tạm tính</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Giảm giá</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{`${priceDiscountMemo}%`}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Thuế</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0%</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span>Phí giao hàng</span>
                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                  </div>
                </WrapperInfo>
                <WrapperTotal>
                  <span>Tổng tiền</span>
                  <span style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                  </span>
                </WrapperTotal>
              </div>

              {/*  */}
              {payment === 'paypal' && sdkReady ? (
                <div style={{ width: '320px' }}>
                  <PayPalButton
                    amount={totalPriceMemo}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={onSuccessPaypal}
                    onError={() => {
                      alert('lỗi')
                    }}
                  />
                </div>
              ) : (
                <ButtonComponents
                  onClick={() => handleAddOrder()}
                  size={40}
                  styleButon={{
                    background: 'rgb(255, 57, 69)',
                    height: '48px',
                    width: '100%',
                    border: 'none',
                    borderRadius: '4px',
                    top: '10px'
                  }}
                  textButton={'Đặt Hàng'}
                  styleTextButon={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                ></ButtonComponents>
              )}

            </WrapperRight>
          </div>
        </WrapperContainer1>

        <ModalComponent title="Cập nhật thông tin giao hàng" forceRender open={isOpenModalUpdateInfo} onCancel={handleCancelUpdateInfo} onOk={handleUpdateInfoUser}>
          <Loading isPending={isPending}>
            <Form
              name="basic"
              labelCol={{ span: 2 }}
              wrapperCol={{ span: 22 }}
              // onFinish={handleUpdateInfoUser}
              autoComplete="on"
              // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
              form={form}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: 'Please input yor Name' }]}
              >
                <InputComponents value={stateUserDetail['name']} onChange={handleOnchangeDetail} name="name" />
              </Form.Item>

              <Form.Item
                label="City"
                name="city"
                rules={[{ required: true, message: 'Please input yor city' }]}
              >
                <InputComponents value={stateUserDetail['city']} onChange={handleOnchangeDetail} name="city" />
              </Form.Item>

              <Form.Item
                label="Phone"
                name="phone"
                rules={[{ required: true, message: 'Please input yor phone' }]}
              >
                <InputComponents value={stateUserDetail.phone} onChange={handleOnchangeDetail} name="phone" />
              </Form.Item>

              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: 'Please input yor address' }]}
              >
                <InputComponents value={stateUserDetail.address} onChange={handleOnchangeDetail} name="address" />
              </Form.Item>

            </Form>
          </Loading>
        </ModalComponent>
      </Loading>
    </WrapperContainer>
  )
}

export default PaymentPage