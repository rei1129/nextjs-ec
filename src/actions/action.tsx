import {User,Coffee,Topping,CartType} from '../pages/index'

export const SETLOGINUSER='setLoginUser'
export const DELETELOGINUSER='setLoginUser'
export const FETCHCARTITEM='fetchCartItem'
export const FETCHCOFFEE='fetchCoffee'
export const FETCHTOPPING='fetchTopping'
export const ADDITEM='addItem'
export const DELETEITEM='deleteItem'
export const RESETCART='resetCart'

export const setLoginUser=(user:User)=>({
  type:SETLOGINUSER,
  loginUser:user
})

export const deleteLoginUser=()=>({
  type:DELETELOGINUSER,
})

export const fetchCartItem=(cartItem:CartType)=>({
  type:FETCHCARTITEM,
  Cart: cartItem
})

export const fetchCoffee=(coffee:Coffee)=>({
  type:FETCHCOFFEE,
  Coffee: coffee
})

export const fetchTopping=(topping:Topping)=>({
  type:FETCHTOPPING,
  Topping: topping
})

export const addItem=(itemInfo:any)=>({
  type:ADDITEM,
  cartItemList: itemInfo
})

export const deleteItem=(cartItem:any)=>({
  type:DELETEITEM,
  cartItemList: cartItem
})

export const resetCart=()=>({
  type:RESETCART,
})