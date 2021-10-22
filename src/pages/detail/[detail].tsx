import React, { useState,useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from '../../actions/action';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore'
import { makeStyles, createStyles } from '@material-ui/styles';
import { User, Topping, CartType } from '../../pages/index';
import type { NextPage } from 'next';
import { useRouter } from "next/router";
import Link from "next/link";

const loginSelector = (state: any) => state.store.loginUser
const cartSelector = (state: any) => state.store.cart
const coffeeSelector = (state: any) => state.store.coffee
const toppingSelector = (state: any) => state.store.topping

type Coffee = {
  id: number,
  name: string,
  detail: string,
  lsizePrice: number,
  msizePrice: number,
  pic: string
}[]
type Cafe = {
  id: number,
  name: string,
  detail: string,
  lsizePrice: number,
  msizePrice: number,
  pic: string
}

const Detail: React.FC = () => {
  const classes = useStyle()
  
  const router = useRouter()
  const number = router.query.detail

  const dispatch = useDispatch()

  const login: User = useSelector(loginSelector)
  const cart: CartType = useSelector(cartSelector)
  const coffee: Coffee = useSelector(coffeeSelector)
  const topping: Topping = useSelector(toppingSelector)

  const [select,setSelect]=useState<Cafe>({
    id: 0,
    name: "",
    detail: "",
    lsizePrice: 0,
    msizePrice: 0,
    pic: "",
})
  const [flag, setFlag] = useState<boolean>(false)
  const [size, setSize] = useState<string>('')
  const [quantity, setQuantity] = useState<string>("1")
  const [toppings, setToppings] = useState<Topping>([])
  const [error, setError] = useState<string>('')

  
  useEffect(()=>{
    const pickup:any = coffee.find((cafe:Cafe) => cafe.id === Number(number))
    setSelect(pickup)
  },[])

  const displayCoffee = () => {
    return (
      <React.Fragment>
        <img src={select.pic} alt='coffee' className={classes.pic} />
        <div className={classes.name}>{select.name}</div>
        <div className={classes.size}>
          <div><label htmlFor='M'><input type='radio' id='M' name='size' value='M' onClick={(e) => setSize(e.currentTarget.value)} />Mサイズ:{select.msizePrice} 円</label></div>
          <div><label htmlFor='L'><input type='radio' id='L' name='size' value='L' onClick={(e) => setSize(e.currentTarget.value)} />Lサイズ:{select.lsizePrice} 円</label></div>
        </div>
        {!size && <div className={classes.error}>{error}</div>}
      </React.Fragment>
    )
  }

  const setToppingList = (value:any) => {
    if (toppings.includes(value)) {
      setToppings(toppings.filter(item => item !== value))
    } else {
      setToppings([...toppings, value])
    }
  }

  const displayTopping = () => {
    return (
      topping.map((item) => {
        return (
          <div className={classes.toppingList}>
            <label htmlFor={item.name}><input type='checkbox' name="topping" value={item.name} id={item.name} onClick={(e) => setToppingList(e.currentTarget.value)} /> {item.name}</label>
          </div>
        )
      })
    )
  }

  const totalPrice = () => {
    if (size === "M") {
      return select.msizePrice * Number(quantity) + toppings.length * 200 * Number(quantity)
    } else if (size === "L") {
      return select.lsizePrice * Number(quantity) + toppings.length * 300 * Number(quantity)
    } else {
      return 0
    }
  }

  const setCartItem = () => {
    if (login) {
      firebase.firestore()
        .collection(`users/${login.uid}/carts`)
        .doc(cart.id)
        .update({ cartItemList: cart.cartItemList })
    }
  }


  const trueFlag = () => {
    if (size === '') {
      setError('サイズを選択して下さい')
    } else {
      const itemInfo = {
        id: Number(number),
        size: size,
        quantity: Number(quantity),//quantityは文字列。totalpriceはなぜかこれで計算できる
        topping: toppings,
        total: totalPrice()
      }
      dispatch(addItem(itemInfo))
      setCartItem()
      alert('商品をカートに追加しました')
      setFlag(true)
    }
  }

  return (
    <div className={classes.body}>
      <h1><u className={classes.underline}>商品詳細</u></h1>
      <div>{displayCoffee()}</div>
      <div className={classes.count}>数量:
        <select name="number" onChange={(e) => setQuantity(e.target.value)}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>
      <div>トッピング：１つにつき M 200円(税抜) L 300円(税抜)</div>
      <div className={classes.topping}>{displayTopping()}</div>
      <div className={classes.price}>
        {totalPrice() === 0
          ? <div><u className={classes.underline}>合計金額：0 円 (税抜)</u></div>
          : <div><u className={classes.underline}>合計金額：{totalPrice()} 円 (税抜)</u></div>
        }
      </div>
      <div>
        {!flag ?
          <button onClick={() => trueFlag()} className={classes.button}>カートに入れる</button>
          :
          <React.Fragment>
            <Link href="/"><button className={classes.button}>商品一覧へ戻る</button></Link>
            <Link href="/cart"><button className={classes.button}>カートへ</button></Link>
          </React.Fragment>
        }
      </div>
    </div>
  )
}

export default Detail;

const useStyle = makeStyles(() =>
  createStyles({
    "body": {
      textAlign: "center",
      paddingTop: "100px", // ヘッダーの後ろに要素が隠れないようにするため
      minHeight: "81vh", //コンテナ要素が少ない時にfooterを画面下部に表示する用(100vhでビューポート100%)
      backgroundColor: "#eece9a15",
    },
    "pic": {
      width: "400px",
      height: "350px",
      boxShadow: "5px 5px 5px #ccc",
    },
    "size": {
      fontSize: "18px",
      fontWeight: 400,
      marginBottom: "5px"
    },
    "name": {
      fontSize: "25px",
      fontWeight: 700,
    },
    "error": {
      color: "red",
      fontWeight: 700
    },
    "count": {
      fontSize: "18px",
      marginBottom: "10px"
    },
    "topping": {
      padding: "10px",
      margin: "7px",
      color: "#232323",
      backgroundColor: "#c3a78080",
      borderLeft: "solid 10px #42231a90",
      width: "60%",
      display: "inline-block"
    },
    "toppingList": {
      display: "inline-block",
    },
    "price": {
      fontSize: "18px",
      margin: "10px auto",
      fontWeight: 700
    },
    "button": {
      borderColor: "#c4872d",
      color: "#c4872d",
      fontWeight: 600,
      marginRight: "2px",
      marginBottom: "8px",
      backgroundColor: "#fff",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#c4872d",
        color: "#fff"
      }
    },
    "underline": {
      textDecoration: "none",
      borderBottom: "double 5px #c4872d",
    }
  })
)