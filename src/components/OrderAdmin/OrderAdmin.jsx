import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Space } from 'antd'
import TableComponent from '../TableComponent/TableComponent'
import { SearchOutlined } from '@ant-design/icons'
import InputComponents from '../InputComponents/InputComponents'

// link tới trang --OrderService--
import * as OrderService from '../../services/OrderService'

import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import { oderContant } from '../../contant'

const OrderAdmin = () => {
  const [isDelivered, setIsDelivered] = useState(true);
  const [OrderConfirmation, setOrderConfirmation] = useState(true);
  const [reloadData, setReloadData] = useState(false);
  const [shippingStatus, setShippingStatus] = useState(true);

  // thanh tìm kiếm
  const searchInput = useRef(null);

  // lấy token
  const user = useSelector((state) => state.user)



  // hàm dùng để loard dữ liệu lên trên client phía admin
  const getAllOrder = async () => {
    const res = await OrderService.getAllOrder(user?.access_token)
    // console.log('res', res)
    return res
  }

  // dùng để loard dữ liệu lên trên client phía admin
  const queryOrder = useQuery({ queryKey: ['order'], queryFn: getAllOrder })
  const { isPending: isPendingOrder, data: orders } = queryOrder
  // lúc này đã có dữ liệu thông qua --data: users--
  // console.log('data: users', orders)

  useEffect(() => {
    if (reloadData) {
      queryOrder.refetch();
      setReloadData(false); // Sau khi tải lại dữ liệu, đặt lại giá trị của reloadData thành false
    }
  }, [reloadData]);



  const hanldeShipped = async (id, isDelivered) => {
    try {
      const res = await OrderService.updateOrder(id, { isDelivered }, user?.access_token);
      setReloadData(true);
      return res;
    } catch (error) {
      console.error('Error while updating order:', error);
    }
  }
  const hanldeShippingStatus = async (id, shippingStatus) => {
    try {
      const res = await OrderService.updateOrder(id, { shippingStatus }, user?.access_token);
      setReloadData(true);
      return res;
    } catch (error) {
      console.error('Error while updating order:', error);
    }
  }

  const hanldeOrderConfirmation = async (id, OrderConfirmation) => {
    try {
      const res = await OrderService.updateOrder(id, { OrderConfirmation }, user?.access_token);
      setReloadData(true);
      return res;
    } catch (error) {
      console.error('Error while updating order:', error);
    }
  }


  // nút tìm kiếm
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    // setSearchText(selectedKeys[0]);
    // setSearchedColumn(dataIndex);
  };
  // nút reset lại thanh tìm kiếm
  const handleReset = (clearFilters) => {
    clearFilters();
    // setSearchText('');
  };

  // thanh tìm kiếm của --ant thư viện của react--
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponents
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  // dữ liệu trong bảng map với --database-- lấy từ dưới backend
  const columns = [
    {
      title: 'Tên Khách',
      dataIndex: 'userName',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.userName.length - b.userName.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('userName')
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.phone.length - b.phone.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('phone')
    },
    {
      title: 'Địa Chỉ',
      dataIndex: 'address',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.address.length - b.address.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('address')
    },
    {
      title: 'Giá SP',
      dataIndex: 'itemsPrice',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.itemsPrice.length - b.itemsPrice.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('itemsPrice')
    },
    {
      title: 'Phí Giao Hàng',
      dataIndex: 'shippingPrice',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.shippingPrice.length - b.shippingPrice.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('shippingPrice')
    },
    {
      title: 'Trạng Thái Thanh Toán',
      dataIndex: 'isPaid',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.isPaid.length - b.isPaid.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('isPaid')
    },
    {
      title: 'Xác Nhận Đơn',
      dataIndex: 'OrderConfirmation',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.OrderConfirmation.length - b.OrderConfirmation.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('OrderConfirmation')
    },
    {
      title: 'Giao Đơn Cho shipping',
      dataIndex: 'isDelivered',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.isDelivered.length - b.isDelivered.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('isDelivered')
    },
    {
      title: 'shipping Giao Đơn Cho Khách',
      dataIndex: 'shippingStatus',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.shippingStatus.length - b.shippingStatus.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('shippingStatus')
    },
    {
      title: 'Tình Trạng Đơn Hàng Phía Khách',
      dataIndex: 'DeliveryStatus',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.DeliveryStatus.length - b.DeliveryStatus.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('DeliveryStatus')
    },
    {
      title: 'Trạng Thái Hủy Đơn',
      dataIndex: 'cancellationStatus',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.cancellationStatus.length - b.cancellationStatus.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('cancellationStatus')
    },
    {
      title: 'Trạng Thái Trả Đơn',
      dataIndex: 'returnStatus',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.returnStatus.length - b.returnStatus.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('returnStatus')
    },
    {
      title: 'Phương Thức Thanh Toán',
      dataIndex: 'paymentMethod',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.paymentMethod.length - b.paymentMethod.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('paymentMethod')
    },
    {
      title: 'Tổng Giá Tiền',
      dataIndex: 'totalPrice',
      // dùng để sắp xếp theo tên
      sorter: (a, b) => a.totalPrice.length - b.totalPrice.length,
      // thanh tìm kiếm
      ...getColumnSearchProps('totalPrice')
    }
  ];

  // chuyển dữ liệu vè dạng rồi cho zo bảng
  const dataTable = orders?.data.length && orders?.data.map((order) => {
    return {
      ...order, key: order._id, userName: order?.shippingAddress?.fullName, phone: order?.shippingAddress?.phone,
      address: order?.shippingAddress?.address, paymentMethod: oderContant.payment[order?.paymentMethod],
      isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán', isDelivered: order?.isDelivered ? "Đã giao hàng" : <button onClick={() => hanldeShipped(order?._id, isDelivered)}>Xác nhận giao hàng</button>,
      OrderConfirmation: order?.OrderConfirmation ? "Đã xác nhận" : <button onClick={() => hanldeOrderConfirmation(order?._id, OrderConfirmation)}>Xác nhận đơn hàng</button>,
      DeliveryStatus: order?.DeliveryStatus ? 'Đã nhận hàng' : 'Chưa nhận hàng',
      cancellationStatus: order?.cancellationStatus ? 'Đã hủy đơn' : 'Chưa hủy đơn',
      returnStatus: order?.returnStatus ? 'Đơn hàng đã bị trả lại' : 'Đơn hàng chưa bị trả lại',
      shippingStatus: order?.shippingStatus ? 'Đã được giao đến khách' : <button onClick={() => hanldeShippingStatus(order?._id, shippingStatus)}>Xác nhận đã giao ĐH cho Khách</button>,
    }
  })

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>

      <div style={{ marginTop: '20px' }}>
        {/* sau khi đã có dữ liệu thì ta chuyền xuống table */}
        <TableComponent columns={columns} isPending={isPendingOrder} data={dataTable} />
      </div>

    </div>
  )
}

export default OrderAdmin


