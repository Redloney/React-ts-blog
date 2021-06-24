import { INCREMENT, INCREMENT_TYPE, DECREMENT, DECREMENT_TYPE } from '../const'

export interface IncrementAction {
  type: INCREMENT_TYPE
}

export interface DecrementAction {
  type: DECREMENT_TYPE
}

export type ModifyAction = IncrementAction | DecrementAction

// 增加
export const increment = (): IncrementAction => ({
  type: INCREMENT
})

// 减少
export const decrement = (): DecrementAction => ({
  type: DECREMENT
})
