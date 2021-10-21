import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { NextPage } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { addTodos } from '../actions/action'

const listSelector = (state: any) => state.store.list

const Home: NextPage = () => {
  const dispatch = useDispatch()

  const [todo, setTodo] = useState<string>("")
  const [list, setList] = useState<Array<string>>([])

  const fetchList = useSelector(listSelector)

  useEffect(() => {
    setList(fetchList)
  }, [])


  const addTodo = () => {
    setList([...list, todo])
    setTodo("")
    dispatch(addTodos(list))
  }

  const delTodo = (index: number) => {
    let copy = list.slice()
    copy.splice(index, 1)
    setList(copy)
    dispatch(addTodos(copy))
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input type="text" placeholder="what todo?" value={todo} onChange={(e) => setTodo(e.target.value)} />
      <button onClick={() => addTodo()}>add</button>
      <ul>
        {list.map((item: string, index: number) => {
          return (
            <li key={index}>{item}
              <Link href={`./${index}`}><button>edit</button></Link>
              <button onClick={() => { delTodo(index) }}>delete</button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Home
