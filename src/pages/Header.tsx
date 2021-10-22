import { useSelector } from 'react-redux';
import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import { makeStyles, createStyles } from '@material-ui/styles';
import { User,CartType } from './index'
import type { NextPage } from 'next';
import Link from 'next/link';

const userSelector = (state:any) => state.store.loginUser
const cartSelector = (state:any) => state.store.cart

const Header:NextPage = () => {
  const classes = useStyle()

  const user:User = useSelector(userSelector)
  const cart:CartType = useSelector(cartSelector)

  const login = () => {
    const google_auth_provider = new firebase.auth.GoogleAuthProvider()
    firebase.auth().signInWithRedirect(google_auth_provider)
  }

  const logout = () => {
    firebase.auth().signOut();
  }

  return (
    <header className={classes.header}>
      <Link href="/"><img src="../pic/header_logo.png" alt="logo" className={classes.logo} /></Link>
      <div className={classes.right}>
      <Link href="/"><button className={classes.button}>商品一覧</button></Link>
      <Link href="/cart"><button className={classes.cartButton} data-num={cart.cartItemList.length}>カート</button></Link>
        {
          user &&
          <Link href="/history"><button className={classes.button}>注文履歴</button></Link>
        }
        {
          user ?
            <button onClick={logout} className={classes.button}>ログアウト</button>
            :
            <button onClick={login} className={classes.button}>ログイン</button>
        }
      </div>
    </header>
  )
}

export default Header;

const useStyle = makeStyles(() =>
  createStyles({
    "header": {
      backgroundColor: "#c3a780",
      display: "flex",
      textDecoration: "none",
      borderBottom: "solid 5px #42231a",
      margin: "0 0 15px 0",
      padding: "5px 0 5px 0",
      position: "fixed",
      width: "100%"
    },
    "logo": {
      cursor: 'pointer',
    },
    "right": {
      margin: "auto 0 auto auto"
    },
    "button": {
      border: "none",  /* 枠線を消す */
      outline: "none", /* クリックしたときに表示される枠線を消す */
      background: "transparent", /* 背景の灰色を消す */
      cursor: 'pointer',
      margin: "0 10px 0 0",
      fontWeight: 700,

      //hoverすると下線が中央始点でアニメーションする設定
      position: "relative",
      display: "inline-block",
      textDecoration: "none",
      "&::after": {
        position: "absolute",
        bottom: "-4px",
        left: '0',
        content: "''",
        width: "100%",
        height: "2px",
        background: "#333",
        transform: "scale(0, 1)",
        transition: "transform .3s",
      },
      "&:hover::after": {
        transform: "scale(1, 1)",
      },
    },
    "cartButton": {
      border: "none",  /* 枠線を消す */
      outline: "none", /* クリックしたときに表示される枠線を消す */
      background: "transparent", /* 背景の灰色を消す */
      cursor: 'pointer',
      margin: "0 10px 0 0",
      fontWeight: 700,

      "&[data-num='0']::before":{
        display: "none"
      },
      "&::before":{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        content: "attr(data-num)",
        minWidth: "20px",
        height: "20px",
        boxSizing: "border-box",
        padding: "4px",
        fontSize: "10px",
        fontWeight: "bold",
        backgroundColor: "#ef5350",
        border: "1px solid #fff",
        borderRadius: "10px",
        top: "0",
        right: "0",
        transform: "translate(40%, -40%)",
        zIndex: "1",
    },

      //hoverすると下線が中央始点でアニメーションする設定
      position: "relative",
      display: "inline-block",
      textDecoration: "none",
      "&::after": {
        position: "absolute",
        bottom: "-4px",
        left: '0',
        content: "''",
        width: "100%",
        height: "2px",
        background: "#333",
        transform: "scale(0, 1)",
        transition: "transform .3s",
      },
      "&:hover::after": {
        transform: "scale(1, 1)",
      },
    },
  })
)