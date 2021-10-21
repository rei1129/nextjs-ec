import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";
import type { NextPage } from 'next';
import Link from 'next/link';
import { addTodos } from '../actions/action'

const listSelector = (state: any) => state.store.list

const Edit: NextPage = () => {
  const router = useRouter()
  const number = router.query.edit
  const dispatch = useDispatch()

  const fetchList = useSelector(listSelector)
  const [editor,setEditor]=useState<Array<string>>([])

  useEffect(()=>{
    setEditor(fetchList)
  },[])

  const editTodo = (val:string) => {
    let copy = editor.slice()
    copy[Number(number)]=val
    setEditor(copy)
    dispatch(addTodos(editor))
  }


  return (
    <div>
      <input type="text" value={editor[Number(number)]} onChange={(e) => editTodo(e.target.value)} />
      <div>
        <Link href="/">
          <a>ホームへ</a>
        </Link>
      </div>
    </div>
  )
}

export default Edit;