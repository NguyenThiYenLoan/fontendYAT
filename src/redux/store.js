import { combineReducers, configureStore } from '@reduxjs/toolkit'
/* gán thư mục (.slides/counterSlice) vào tên (counterReducer) */
import productReducer from './slides/productSlide'
import userReducer from './slides/userSlide'
import orderProduct from './slides/orderSlide'

// thư viện dùng để duy trì cái state khi reload lại ----
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER

} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// đoạn hàm xử lý việc duy trì state
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  // này dùng để ko cho cái thằng nào lưu vào sotre để duy trì
  blacklist: ['product', 'user']
}

// là --reducer-- tổng hợp mà bạn nhận được từ việc kết hợp các reducer con
const rootReducer = combineReducers({
  product: productReducer,
  user: userReducer,
  order: orderProduct
})

// persistReducer: Tạo ra một --reducer-- mới đã được cấu hình để hỗ trợ việc lưu trữ và khôi phục state từ bộ nhớ
const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware
      // trả về các middleware mặc định của Redux Toolkit
    getDefaultMiddleware({
      // serializableCheck
        // Cấu hình này được sử dụng để kiểm tra khả năng serializability của các action và state
      serializableCheck: {
        // FLUSH: 
          // Xóa bỏ tất cả các thay đổi chưa được lưu vào bộ nhớ, Thường dùng để đồng bộ hóa store với bộ nhớ
        // REHYDRATE
          // Thực hiện khôi phục state từ bộ nhớ. Điều này xảy ra khi ứng dụng khởi động lại và state được nạp từ bộ nhớ vào Redux store
        // PAUSE
          // Tạm dừng quá trình lưu trữ state vào bộ nhớ. Hữu ích khi bạn muốn tạm thời ngừng việc lưu trữ
        // PERSIST
          // Đánh dấu rằng state cần được lưu trữ vào bộ nhớ. Đây là action type được gửi khi state thay đổi và cần lưu trữ
        // PURGE
          // Xóa sạch state từ bộ nhớ. Thường được sử dụng để reset toàn bộ state trong bộ nhớ
        // REGISTER
          // Đăng ký một persistor mới với redux-persist. Thường được gọi khi persistor được tạo ra


        // ignoreActions 
          //Bỏ qua các action types của redux-persist
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

// persistStore: Tạo một --persistor-- để điều khiển quá trình lưu trữ và khôi phục state từ bộ nhớ
export let persistor = persistStore(store)