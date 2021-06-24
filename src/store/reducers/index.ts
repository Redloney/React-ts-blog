import { combineReducers } from 'redux'

import { ModifyAction } from '../actions'
import { DECREMENT, INCREMENT } from '../const'

// 处理并返回 State
export const count = (state = 0, action: ModifyAction): number => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

export const test = (state = 0, action: ModifyAction): number => {
  switch (action.type) {
    case INCREMENT:
      return state + 1
    case DECREMENT:
      return state - 1
    default:
      return state
  }
}

export default combineReducers({
  count, test
})