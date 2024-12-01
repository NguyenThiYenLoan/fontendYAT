import React, { useEffect, useMemo, useState } from 'react'
import { WrapperCountOrder, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal, WrapperStyleHeaderDilivery, WrapperContainer, WrapperContainer1, WrapperName, WrapperImg, WrapperHeaderDivSpan, WrapperHeaderDiv } from './style';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { WrapperInputNumber } from '../../components/ProductDetailsComponents/style';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox, Form } from 'antd';

// cái xử lý bên state order
import { decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder, loadOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../utils';
import ButtonComponents from '../../components/ButtonComponents/ButtonComponents';
import ModalComponent from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/loadingComponents/Loading';
import InputComponents from '../../components/InputComponents/InputComponents';
// link tới trang --UserService--
import * as UserService from '../../services/UserService'

// link tới trang dùng để lấy dữ liệu dưới backend lên
import { useMutationHooks } from '../../hooks/useMutationHooks'

// link tới trang làm thông báo cho ta biết đã đăng ký thành công
import * as message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/userSlide';
import { useNavigate } from 'react-router-dom';
import Step from '../../components/step/Step';

const OrderPage = () => {
  const navigate = useNavigate()

  // lấy ra cái thằng user ra để bắt đầu thanh toán
  const user = useSelector((state) => state.user)
  // check xem trong user có gì rồi
  // console.log('user11', user)

  // dùng để mở cái bảng updateInfo lên
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)

  // tạo --useState-- để chứa dữ liệu dùng để --update--
  const [stateUserDetail, setstateUserDetail] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    id: user?.id,
  })

  // này dùng để khi tắt cái khung thêm đi thì dữ liệu thêm trên khung trước đó sẽ mất đi để ta thêm lại cái khác
  const [form] = Form.useForm();


  // tạo ra để chứa --id--
  const [listChecked, setListChecked] = useState([])

  // lấy ra cái thằng order hiển thị lên cái thanh giỏ hàng có bao nhiêu sản phẩm
  const order = useSelector((state) => state.order)
  // dùng để gọi hàm từ trang --orderstate--
  const disPatch = useDispatch()

  const onChange = (e) => {
    // hiển thị cái id ra thông qua --${e.target.value}-
    // console.log(`checked = ${e.target.value}`);

    // nếu --listChecked-- nó đã check rồi thì ta sẽ
    if (listChecked.includes(e.target.value)) {
      // xóa đi những id bị trùng
      // in ra những cái --id-- khác với --id:  e.target.value--
      const newListChecked = listChecked.filter((item) => item !== e.target.value)
      setListChecked(newListChecked)
    } else {
      // nếu chưa có thì thêm nó trực tiếp vào
      // giữ nguyên --id củ-- và thêm vào --e.target.value-- id mới vào
      setListChecked([...listChecked, e.target.value])
    }
  }
  // console.log('listChecked', listChecked)

  // nhận vào cái --typt là tăng hay giảm ấy-- với cái --id--
  const handleChangeCount = (type, idProduct) => {
    const product = order?.orderItems?.find(item => item.product === idProduct);

    if (type === "increase") {
      disPatch(increaseAmount({ idProduct }));
    } else if (type === "decrease" && product?.amount > 1) {
      // Chỉ cho phép giảm số lượng khi sản phẩm có số lượng lớn hơn 1
      disPatch(decreaseAmount({ idProduct }));
    }
  };

  const handleDeleteOrder = (idProduct) => {
    disPatch(removeOrderProduct({ idProduct }))
  }

  const handleDeleteAllOrder = () => {
    // nếu tồn tại lớn hơn 0
    if (listChecked?.length > 0) {
      disPatch(removeAllOrderProduct({ listChecked }))
    }
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


  // dùng để checkbox tất cả
  const handleOnchangeCheckAll = (e) => {
    // khi click vào thì là true còn bỏ click thì là false
    // console.log('e.target', e.target.checked)
    if (e.target.checked) {
      // tạo ra 1 cái mảng chứa --id--
      const newListChecked = []
      // dúng --forEach-- để làm vòng lặp
      order?.orderItems?.forEach((item) => {
        // chuyền --item.product-- tức là --id-- vào mảng đã tạo --newListChecked-- thông qua --push-
        newListChecked.push(item.product)
      })
      // thì chuyền tất cả id vào
      setListChecked(newListChecked)
    } else {
      setListChecked([])
    }
  }

  // console.log('order', order)



  // dùng này để xác định khi mà click vào checkbox mới bắt đầu tính
  // khi cái --listChecked-- thay đổi thì bắt đầu thực hiện
  useEffect(() => {
    disPatch(selectedOrder({ listChecked }))
  }, [listChecked])



  // tiến hành --gán-- dữ liệu lên thanh --input-- để -update--  
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


  // bắt đầu chuyển sang trang xác nhận mua hàng và thanh toán ------------------------
  const handleAddCard = () => {
    // kiểm tra xem có user chưa
    // console.log('user', user)
    if (!order?.orderItemsSelected?.length) {
      message.error('Vui lòng chọn sản phẩm cần mua')
    } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
      // nếu ko có 4 thông tin này thì mở bảng lên
      setIsOpenModalUpdateInfo(true)
    } else {
      navigate('/payment')
      localStorage.removeItem('orders');
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
    }
  )

  // lấy được isPending là dữ liệu sau khi update
  const { isPending, data } = mutationUpdate
  // console.log('data order', data)
  // console.log('isPending order', isPending)


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


  // hàm này dùng để --gán-- dữ liệu từ --thanh input-- vào các biến --của stateUserDetail--
  const handleOnchangeDetail = (e) => {
    // console.log('e.target.name', e.target, e.target.value)
    setstateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value
    })
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

  // tạo thanh dy chuyển giá tiền
  const itemsDelivery = [
    {
      title: 'Freeship 20K',
      description: 'Đơn Hàng < 200K',
    },
    {
      title: 'Freeship 10K',
      description: 'Đơn Hàng 200K-500K',
      subTitle: 'Left 00:00:08',
    },
    {
      title: 'Freeship',
      description: 'Đơn Hàng >= 500K',
    },
  ]


  useEffect(() => {
    // Kiểm tra đăng nhập ở đây và dispatch action login nếu cần

    // Kiểm tra xem có dữ liệu đơn hàng trước đó được lưu trữ không
    const orders = JSON.parse(localStorage.getItem('orders'));
    if (orders && user?.id && orders[user?.id]) {
      // Nạp dữ liệu đơn hàng vào Redux
      disPatch(loadOrder(orders[user?.id]));
    }
  }, [user?.id]);

  const updateQuantity = (newQuantity, idProduct) => {
    if (newQuantity >= 1) {
      // Cập nhật số lượng qua Input field khi số lượng hợp lệ
      disPatch(increaseAmount({ idProduct, amount: newQuantity }));
    }
  };


  // console.log('order?.orderItemsSelected?.length', order?.orderItemsSelected?.length)
  return (
    <WrapperContainer>
      <WrapperContainer1>
        <br />
        <h2>Giỏ hàng</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <WrapperLeft>
            <WrapperStyleHeaderDilivery>
              {/* thanh dy chuyển giá ship */}
              <Step
                items={itemsDelivery}
                current={
                  diliveryPriceMemo === 10000 ? 2
                    : diliveryPriceMemo === 20000 ? 1
                      : order?.orderItemsSelected?.length === 0 ? 0 : 3}
              />
            </WrapperStyleHeaderDilivery>

            <WrapperStyleHeader>
              <span style={{ display: 'inline-block', width: '35%' }}>
                <Checkbox onChange={handleOnchangeCheckAll} ></Checkbox>
                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
              </span>
              <WrapperHeaderDiv>
                <WrapperHeaderDivSpan>Đơn giá</WrapperHeaderDivSpan>
                <WrapperHeaderDivSpan>Số lượng</WrapperHeaderDivSpan>
                <WrapperHeaderDivSpan>Thành tiền</WrapperHeaderDivSpan>
                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleDeleteAllOrder} />
              </WrapperHeaderDiv>
            </WrapperStyleHeader>
            <WrapperListOrder>
              {order?.orderItems?.map((order, index) => {
                return (
                  <WrapperItemOrder key={index}>
                    <div style={{ width: '35%', display: 'flex', alignItems: 'center', gap: 4 }}>
                      {/* khi clik vào thì sẽ hiển thị ra id thông qua value={order?.product}  */}
                      {/* checked={listChecked.includes(order?.product): hiển thị khi kik vào toàn bộ thì sẽ truyền id zo */}
                      {/* hiển thị bằng hàm --onChange-- từ hàm  */}
                      <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)} ></Checkbox>
                      <WrapperImg src={order?.image} />
                      <WrapperName>{order?.name}</WrapperName>
                    </div>
                    <div style={{ width: '65%', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span>
                        <span style={{ fontSize: '13px', color: '#242424' }}>{convertPrice(order?.price)}</span>
                        {/* <WrapperPriceDiscount>
                          ({order?.amount})
                        </WrapperPriceDiscount> */}
                      </span>
                      <WrapperCountOrder>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                          <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                        <WrapperInputNumber
                          value={order?.amount || 1} // dùng value để kiểm soát
                          size="small"
                          min={1}
                          onChange={(value) => {
                            const quantity = parseInt(value, 10);
                            updateQuantity(isNaN(quantity) ? 1 : quantity, order?.product);
                          }}
                        />

                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
                          <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                        </button>
                      </WrapperCountOrder>
                      <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order?.price * order?.amount)}</span>

                      {/* xóa từng sản phẩm */}
                      <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                    </div>
                  </WrapperItemOrder>
                )
              })}
            </WrapperListOrder>
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
            <ButtonComponents
              onClick={() => handleAddCard()}
              size={40}
              styleButon={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                top: '10px'
              }}
              textButton={'Mua hàng'}
              styleTextButon={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
            ></ButtonComponents>
          </WrapperRight>
        </div>
      </WrapperContainer1>

      <ModalComponent title="Cập nhật thông tin giao hàng" forceRender open={isOpenModalUpdateInfo} onCancel={handleCancelUpdateInfo} onOk={handleUpdateInfoUser}>
        <Loading isPending={isPending}>
          <Form
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
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
    </WrapperContainer>
  )
}

export default OrderPage