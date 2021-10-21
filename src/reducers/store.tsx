import { ADDTODO } from '../actions/action'

const initialState: {
  list: string[]
} = {
  list: []
}

export const store = (state = initialState, action: any) => {
  switch (action.type) {
    case ADDTODO:
      return { ...state, list: action.list }
    default:
      return state
  }
}