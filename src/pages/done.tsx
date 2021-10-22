import React from 'react'
import { makeStyles, createStyles } from '@material-ui/styles';
import type { NextPage } from 'next';
import Link from 'next/link';

export const Done:React.FC = () => {
  const classes = useStyle()

  return (
    <div className={classes.body}>
      <div className={classes.content}>
        <div className={classes.text}>
        <h2>らくらくカレーをご利用頂きましてありがとうございます。</h2>
        <h2>決済は正常に完了しました。</h2>
        <Link href={`/`}><button className={classes.button}>ホームへ戻る</button></Link>
        </div>
      </div>
    </div>
  )
}

export default Done;

const useStyle = makeStyles(() =>
  createStyles({
    "body": {
      paddingTop: "100px", // ヘッダーの後ろに要素が隠れないようにするため
      minHeight: "81vh", //コンテナ要素が少ない時にfooterを画面下部に表示する用(100vhでビューポート100%)
      textAlign: "center",
      backgroundImage: "url(../pic/coffee.jpg)",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    },
    "content":{
      marginTop:"-20px",
      backgroundColor:"rgba(255, 255, 255, 0.5)",
      width:"100%",
      height:"660px",
    },
    "text":{
      fontSize: "20px",
      fontWeight: 700,
      paddingTop: "200px"
    },
    "button": {
      marginTop:"50px",
      borderColor: "#c4872d",
      color: "#c4872d",
      fontWeight: 600,
      margin: "20px auto",
      backgroundColor: "#fff",
      padding: "10px",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#c4872d",
        color: "#fff"
      }
    },
  })
)