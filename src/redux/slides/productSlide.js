import { createSlice } from '@reduxjs/toolkit'

// Đây là state ban đầu cho slice này
const initialState = {
  search: '',
}

export const productSlide = createSlice({
  // tên slice
  name: 'product',
  initialState,
  // Đây là một đối tượng chứa các hàm reducer để xử lý các action cụ thể
  reducers: {
    searchProduct: (state, action) => {
      // vì cái action là 1 cái String nên ta cho 2 cái bằng nhau
      state.search = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { searchProduct } = productSlide.actions

export default productSlide.reducer