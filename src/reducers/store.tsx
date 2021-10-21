import { SETLOGINUSER, DELETELOGINUSER, FETCHCARTITEM, FETCHCOFFEE, FETCHTOPPING, ADDITEM, DELETEITEM, RESETCART } from '../actions/action'
import {User,Coffee,Topping,CartType} from '../pages/index'

export type State = {
  loginUser: User | null,
  cart: CartType,
  coffee: Coffee,
  topping: Topping,
}

const initialState: State = {
  loginUser: null,
  cart: {
    id: "",
    orderDate: "",
    userName: "",
    mailAddress: "",
    addressNumber: "",
    address: "",
    phoneNumber: "",
    deliveryDate: "",
    deliveryTime: "",
    status: 0,
    cartItemList: [],
  },
  coffee: [],
  topping: [],
}

export const store = (state = initialState, action: any) => {
  switch (action.type) {
    case SETLOGINUSER:
      return { ...state, loginUser: action.loginUser }

    case DELETELOGINUSER:
      return { ...state, loginUser: null, cart: [] }

    case FETCHCARTITEM:
      let cartItem = Object.assign({}, state.cart)
      cartItem = action.Cart
      return { ...state, cart: cartItem }

    case FETCHCOFFEE:
      let coffeeItem = state.coffee.slice()
      coffeeItem = action.Coffee
      return { ...state, coffee: coffeeItem }

    case FETCHTOPPING:
      let toppingItem = state.topping.slice()
      toppingItem = action.Topping
      return { ...state, topping: toppingItem }

    case ADDITEM:
      let cartInfo = Object.assign({}, state.cart)
      cartInfo.cartItemList.push(action.cartItemList)
      return { ...state, cart: cartInfo }

    case DELETEITEM:
      let newCart = Object.assign({}, state.cart)
      newCart.cartItemList = action.cartItemList
      return { ...state, cart: newCart }

    case RESETCART:
      let copyCart = Object.assign({}, state.cart)
      copyCart.cartItemList = []
      return { ...state, cart: copyCart }

    default:
      return state
  }
}