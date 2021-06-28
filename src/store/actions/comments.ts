import { GET_COMMENTS, GET_COMMENTS_TYPE } from '../const'
import { CLEAR_COMMENTS, CLEAR_COMMENTS_TYPE } from '../const'

import { Comment } from '../../types'
import { GetComments } from '../../api/comm'
import { Dispatch } from 'redux'

export interface GetCommentsAction {
  type: GET_COMMENTS_TYPE
  payload: payload
}

export interface ClaerCommentsAction {
  type: CLEAR_COMMENTS_TYPE,
  payload: payload
}
export interface payload {
  page: number
  size?: number
  count?: number
  comments?: Array<Comment>
}


export type CommentsActions = GetCommentsAction | ClaerCommentsAction

// 获取留言列表
// export const getComments = (payload: payload) => ({
//   type: GET_COMMENTS,
//   payload: payload
// })

// 获取留言列表
export const getComments = (payload: payload) => ({
  type: GET_COMMENTS,
  payload: payload
})

// // 获取留言列表
// export const getComments = async (payload: payload) => {
//   const { page = 0, size } = payload
//   return async (dispatch: Dispatch) => {
//     const { comments, count } = await GetComments(page, size) as any
//     dispatch({
//       type: GET_COMMENTS,
//       payload: {
//         comments, count, page
//       },
//     })
//   }
// }

// 获取留言列表
export const clearComments = (payload: payload): CommentsActions => ({
  type: CLEAR_COMMENTS,
  payload
})
