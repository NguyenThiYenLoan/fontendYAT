import { createSlice } from '@reduxjs/toolkit'

// Đây là state ban đầu cho slice này
const initialState = {
    orderItems: [],
    orderItemsSelected: [],
    shippingAddress: {},
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    OrderConfirmation: false,
    DeliveryStatus: false,
}

export const orderSlide = createSlice({
  // tên slice
  name: 'order',
  initialState,
  // Đây là một đối tượng chứa các hàm reducer để xử lý các action cụ thể
  reducers: {
    addOrderProduct: (state, action) => {
        // Đảm bảo rằng orderItems là một mảng
        if (!Array.isArray(state.orderItems)) {
            state.orderItems = []; // Khởi tạo nếu không phải mảng
        }
    
        const { orderItem } = action.payload;
        const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
    
        // Nếu đã tồn tại thì cộng với số lượng đã chuyền lên
        if (itemOrder) {
            itemOrder.amount += orderItem.amount;
        } else {
            // Nếu chưa tồn tại trong giỏ hàng
            state.orderItems.push(orderItem);
        }
    
        // Lưu giỏ hàng vào localStorage
        localStorage.setItem('orders', JSON.stringify(state.orderItems));
    },
    
    // dùng để tăng số lượng
    increaseAmount: (state, action) => {
        // console.log({state, action})

        // lúc này bên phía --productDetailComponent-- gửi qua cái --idProduct-- thì ta lấy thông qua --action--
        const {idProduct} = action.payload
        // tìm ra những thằng ko có trong --idProduct-- thì lúc đó ta sẽ gán cho nó rổng
        
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        itemOrder.amount++
        // này cho cái khi click vào thì mới tính
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
        if(itemOrderSelected) {
            itemOrderSelected.amount++
        }
    },
    // dùng để giảm số lượng
    decreaseAmount: (state, action) => {
        // console.log({state, action})

        // lúc này bên phía --productDetailComponent-- gửi qua cái --idProduct-- thì ta lấy thông qua --action--
        const {idProduct} = action.payload
        // tìm ra những thằng ko có trong --idProduct-- thì lúc đó ta sẽ gán cho nó rổng
        const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
        itemOrder.amount--
        // này cho cái khi click vào thì mới tính
        const itemOrderSelected = state?.orderItemsSelected?.find((item) => item?.product === idProduct)
        if(itemOrderSelected) {
            itemOrderSelected.amount--
        }
    },
    // xóa sản phẩm từ trang order
    removeOrderProduct: (state, action) => {
        // console.log({state, action})

        // lúc này bên phía --productDetailComponent-- gửi qua cái --idProduct-- thì ta lấy thông qua --action--
        const {idProduct} = action.payload
        // tìm ra những thằng ko có trong --idProduct-- thì lúc đó ta sẽ gán cho nó rổng
        const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
        state.orderItems = itemOrder

        // này cho cái khi click vào thì mới tính 
        const itemOrderSelected = state?.orderItemsSelected?.filter((item) => item?.product !== idProduct)
        state.orderItemsSelected = itemOrderSelected

        // Cập nhật localStorage với dữ liệu giỏ hàng mới
        localStorage.setItem('orders', JSON.stringify(state.orderItems));
    },
    // xóa tất cả sản phẩm từ trang order
    removeAllOrderProduct: (state, action) => {
        // console.log({state, action})

        // lúc này bên phía --productDetailComponent-- gửi qua cái --idProduct-- thì ta lấy thông qua --action--
        const { listChecked } = action.payload
        // hiển thị những cái thằng id ko nằm trong --listChecked--
        const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
        state.orderItems = itemOrders

        // này cho cái khi click vào thì mới tính 
        const itemOrdersSelected = state?.orderItemsSelected?.filter((item) => !listChecked.includes(item.product))
        state.orderItemsSelected = itemOrdersSelected

        // Cập nhật localStorage để phản ánh trạng thái mới của giỏ hàng
        localStorage.setItem('orders', JSON.stringify(state.orderItems));
    },
    // Dùng để khi click vào mới bắt đầu tính cái bạn tạm tiền phí chuyển với sale và tông tiền
    selectedOrder: (state, action) => {
        // console.log({state, action})

        // lúc này bên phía --productDetailComponent-- gửi qua cái --idProduct-- thì ta lấy thông qua --action--
        const { listChecked } = action.payload

        // tạo ra 1 cái mảng khác để chứa dữ liệu trùng với cái --orderItems-- để --push-- dữ liệu qua
        const orderSelected = []

        // ta sẽ sử dụng vòng lặp để --push-- dữ liệu vào với những cái thỏa điều kiện if
        state.orderItems.forEach((order) => {
            // nếu bên trong cái --listChecked-- có tồn tại id thì thực hiện --push--
            if(listChecked.includes(order.product)) {
                orderSelected.push(order)
            };
        });
        // sau khi đã có dữ liệu thì truyền vào --orderItemsSelected--
        state.orderItemsSelected = orderSelected
    },
    resetOrder: state => {
        return initialState; // Trả về trạng thái ban đầu để xóa tất cả dữ liệu đơn hàng
    },
    loadOrder: (state, action) => {
        // console.log({state, action})

        // lúc này bên phía --productDetailComponent-- gửi qua cái --orderItems-- thì ta lấy thông qua --action--
        const {orderItem} = action.payload
        // này check xem nó đã tồn tại trong --order-- hay chưa thông qua --id-- để check
        // lúc này --itemOrder-- chính là cái --state.orderItems--
        const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem?.product)
        // console.log('itemOrder', itemOrder)

        // nếu đã tồn tại thì cộng với số lượng đã chuyền lên
        if (itemOrder) {
            itemOrder.amount += orderItem?.amount
        } else {
            // nếu chưa tồn tại trong giỏ hàng
            state.orderItems.push(orderItem)
        }
    },
    loadOrder1: (state) => {
        const storedOrders = localStorage.getItem('orders');
        if (storedOrders) {
            state.orderItems = JSON.parse(storedOrders);
        } 
    }
    
  },
})

export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, selectedOrder, resetOrder, loadOrder, loadOrder1  } = orderSlide.actions

export default orderSlide.reducer