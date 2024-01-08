import { configureStore } from '@reduxjs/toolkit'

import ProductSliceReducer from './slices/productSlice'
import LoadingSliceReducer from './slices/loadingSlice' 
import LoginSliceReducer from './slices/loginSlice' 
 
export const store = configureStore({
  reducer: {

    "product" : ProductSliceReducer ,
    "loading" : LoadingSliceReducer  , 
    "login" : LoginSliceReducer
  },
})
