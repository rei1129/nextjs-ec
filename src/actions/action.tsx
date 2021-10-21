export const ADDTODO = 'addTodo'

export const addTodos=(list:Array<string>)=>({
  type:ADDTODO,
  list:list
})