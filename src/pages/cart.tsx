import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { deleteItem } from '../actions/action';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { makeStyles, createStyles } from '@material-ui/styles';
import { User, Coffee, CartType } from './index'
import type { NextPage } from 'next';
import Link from 'next/link';

const loginSelector = (state: any) => state.store.loginUser
const coffeeSelector = (state: any) => state.store.coffee
const cartSelector = (state: any) => state.store.cart

export const Cart: React.FC = () => {
  const classes = useStyle()
  const dispatch = useDispatch()

  const login: User = useSelector(loginSelector)
  const coffee: Coffee = useSelector(coffeeSelector)
  const cart: CartType = useSelector(cartSelector)

  const [myCart, setMyCart] = useState<Mycart>([])
  const [cartItem, setCartItem] = useState<CartInfo>([])
  const [choiceCoffee, setChoiceCoffee] = useState<any>([])

  type Mycart = {
    coffee: {
      id?: number | undefined;
      name?: string | undefined;
      detail?: string | undefined;
      lsizePrice?: number | undefined;
      msizePrice?: number | undefined;
      pic?: string | undefined;
    };
    cart: {
      id: number;
      quantity: number;
      total: number;
      size: string;
      topping: string[];
    };
  }[]

  type CartInfo = {
    id: number;
    quantity: number;
    total: number;
    size: string;
    topping: string[];
  }[]

  useEffect(() => {
    let info: Mycart = []
    let carts: CartInfo = []
    let coffees: Coffee = []
    if (cart) {
      for (let i = 0; i < coffee.length; i++) {
        for (let j = 0; j < cart.cartItemList.length; j++) {
          if (coffee[i].id === cart.cartItemList[j].id) {
            info.push({
              coffee: coffee[i],
              cart: cart.cartItemList[j]
            })
            coffees.push(coffee[i])
            carts.push(cart.cartItemList[j])
          }
        }
      }
      setMyCart(info)
      setChoiceCoffee(coffees)
      setCartItem(carts)
    }
  }, [])


  const googleLogin = () => {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  }

  const deleteCart = () => {
    if (login) {
      firebase.firestore()
        .collection(`users/${login.uid}/carts`)
        .doc(cart.id)
        .update({ cartItemList: cartItem })
    }
  }

  const delItem = (index: number) => {
    let info = myCart.slice()
    let carts = cartItem.slice()
    let coffees = choiceCoffee.slice()
    info.splice(index, 1)
    carts.splice(index, 1)
    coffees.splice(index, 1)
    setMyCart(info)
    setCartItem(carts)
    setChoiceCoffee(coffees)
    dispatch(deleteItem(carts))
    deleteCart()
  }

  const culcTax = () => {
    let totalTax = 0
    cartItem.forEach((item) => {
      totalTax += item.total
    })
    totalTax = totalTax * 0.1
    return totalTax
  }

  const culcPrice = () => {
    let totalPrice = 0
    cartItem.forEach((item) => {
      totalPrice += item.total
    })
    totalPrice = totalPrice + totalPrice * 0.1
    return totalPrice
  }

  const goCheck = () => {
    <Link href={`/check`}></Link>
  }


  return (
    <div className={classes.body}>
      {login
        ? <h1><u className={classes.underline}>{login.displayName}さんのショッピングカート</u></h1>
        : <h1><u className={classes.underline}>ショッピングカート</u></h1>}

      {myCart.length === 0
        ? <div>カートに商品はありません。</div>
        :
        <div>
          <table className={classes.table}>
            <tr className={classes.title}>
              <th>商品名</th>
              <th>商品イメージ</th>
              <th>サイズ</th>
              <th>数量</th>
              <th>トッピング</th>
              <th>小計(税抜)</th>
              <th>削除</th>
            </tr>
            {
              myCart.map((item, index: number) => {
                return (
                  <tr className={classes.cartItem}>
                    <td>{item.coffee.name}</td>
                    <td><img src={item.coffee.pic} alt="product" width="150px" height="150px" className={classes.pic} /></td>
                    <td>{item.cart.size}</td>
                    <td>{item.cart.quantity}</td>
                    <td>{item.cart.topping.map((topping) => {
                      return <div>{topping}</div>
                    })}</td>
                    <td>{item.cart.total}</td>
                    <td><button onClick={() => delItem(index)} className={classes.button}>削除</button></td>
                  </tr>
                )
              })
            }
          </table>
          <div className={classes.price}>
            <div>消費税：{culcTax()} 円</div>
            <div><u className={classes.underline}>合計金額：{culcPrice()} 円 (税込)</u></div>
          </div>
          <div>
            {
              login ?
                <Link href={`/check`}><button className={classes.button}>注文に進むへ</button></Link> :

                // <button onClick={() => { goCheck() }} className={classes.button}>注文に進む</button> :
                <button onClick={() => { googleLogin() }} className={classes.button}>ログインして注文する</button>
            }
          </div>
        </div>
      }
    </div>
  )
}

export default Cart

const useStyle = makeStyles(() =>
  createStyles({
    "body": {
      textAlign: "center",
      paddingTop: "100px", // ヘッダーの後ろに要素が隠れないようにするため
      minHeight: "81vh", //コンテナ要素が少ない時にfooterを画面下部に表示する用(100vhでビューポート100%)
      backgroundColor: "#eece9a15",
    },
    "table": {
      width: "80%",
      margin: "3px auto",
      paddingTop: "10px",
      borderBottom: "solid 5px #c4872d",
    },
    "title": {
      fontSize: "15px",
      fontWeight: 700,
      background: "#c4872d",
      color: "#fff",
    },
    "cartItem": {
      fontWeight: 600,
    },
    "pic": {
      width: "200px",
      height: "200px"
    },
    "button": {
      borderColor: "#c4872d",
      color: "#c4872d",
      fontWeight: 600,
      marginBottom: "8px",
      backgroundColor: "#fff",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#c4872d",
        color: "#fff"
      }
    },
    "price": {
      fontSize: "18px",
      fontWeight: 700,
      margin: "20px auto",
    },
    "underline": {
      textDecoration: "none",
      borderBottom: "double 5px #c4872d",
    }
  })
)