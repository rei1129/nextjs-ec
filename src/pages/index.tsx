import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux'
import firebase from 'firebase/compat/app'
import '../service/firebase'
import 'firebase/compat/auth'
import 'firebase/compat/firestore'
import { setLoginUser, deleteLoginUser, fetchCartItem, fetchCoffee, fetchTopping } from '../actions/action';
import type { NextPage } from 'next';
import { createStore } from 'redux';
import reducer from '../reducers';
import Home from './home';

const store = createStore(reducer)

export type User = firebase.User
export type Coffee = {
  id?: number,
  name?: string,
  detail?: string,
  lsizePrice?: number,
  msizePrice?: number,
  pic?: string
}[]
export type Topping = {
  id?: number,
  name?: string,
  lsizePrice?: number,
  msizePrice?: number,
}[]
export type CartType = {
  id?: string,
  userName: string,
  address: string,
  addressNumber: string,
  phoneNumber: string,
  cartItemList: {
    id: number,
    quantity: number,
    total: number,
    size: string,
    topping: string[]
  }[],
  mailAddress: string,
  deliveryDate: string,
  deliveryTime: string,
  orderDate: string,
  status: number,
}

const MyApp:NextPage = () => {
  const dispatch = useDispatch()

  const setUser = (user: User) => {
    dispatch(setLoginUser(user))
  }

  const deleteUser = () => {
    dispatch(deleteLoginUser())
  }

  const fetchCart = (user: User) => {
    let cartItem: any = {};
    firebase
      .firestore()
      .collection(`users/${user.uid}/carts`)
      .get().then(snapshot => {
        if (snapshot.empty) {
          firebase
            .firestore()
            .collection(`users/${user.uid}/carts`)
            .add({
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
            }).then(doc => {
              cartItem = {
                id: doc.id,
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
              }
            })
        }
        snapshot.forEach(doc => {
          if (doc.data().status === 0) {
            let cartData = Object.assign({}, doc.data())
            cartItem = { ...cartData, id: doc.id }
          }
        })
        dispatch(fetchCartItem(cartItem))
      })
  }

  const setCart = () => {
    let cartItem: CartType = {
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
    }
    dispatch(fetchCartItem(cartItem))
  }

  const setCoffee = () => {
    let coffee: Coffee = []
    firebase
      .firestore()
      .collection(`product`)
      .get().then(snapshot => {
        snapshot.forEach(doc => {
          coffee.push(doc.data())
        })
        dispatch(fetchCoffee(coffee))
      })
  }

  const setTopping = () => {
    let topping: Topping = []
    firebase
      .firestore()
      .collection(`topping`)
      .get().then((snapshot) => {
        snapshot.forEach((doc) => {
          topping.push(doc.data())
        })
        dispatch(fetchTopping(topping))
      })
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user)
        fetchCart(user)
      } else {
        deleteUser()
        setCart()
      }
      setCoffee()
      setTopping()
    })
  }, [])



  return (
    <React.Fragment>
      <Home />
    </React.Fragment>
  )
}

export default MyApp