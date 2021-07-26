import { GET_COMMENTS, GET_COMMENTS_TYPE, SET_COMMENT, SET_COMMENT_TYPE } from '../const'
import { CLEAR_COMMENTS, CLEAR_COMMENTS_TYPE } from '../const'

import { Comment } from '../../types'
// import { GetComments } from '../../api/Comment'
// import { Dispatch } from 'redux'

export interface GetCommentsAction {
  type: GET_COMMENTS_TYPE
  payload: payload
}

export interface SetCommentsAction {
  type: SET_COMMENT_TYPE
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
  comm_id?: string
}


export type CommentsActions = GetCommentsAction | SetCommentsAction | ClaerCommentsAction

// 获取留言列表
export const getComments = (payload: payload) => ({
  type: GET_COMMENTS,
  payload: payload
})

// 设置留言
export const setComment = (payload: payload) => ({
  type: SET_COMMENT,
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

// 清除留言列表
export const clearComments = (payload: payload): CommentsActions => ({
  type: CLEAR_COMMENTS,
  payload
})
