import { GET_COMMENTS, CLEAR_COMMENTS, SET_COMMENT } from '../const'

import { CommentsActions } from '../actions/comments'

const initState = {
  page: 0,
  count: 0,
  comments: []
}

const CommentsReducer = (state = initState, action: CommentsActions) => {
  const { type, payload } = action
  switch (type) {
    case GET_COMMENTS:
      const { page } = payload
      const list = page === 0 ? [] : state.comments
      const { comments, ...others } = payload as any
      return { ...state, ...others, comments: list.concat(comments || []) }
    case SET_COMMENT:
      const { comm_id } = payload
      state.comments.forEach((el: any) => {
        if (el._id == comm_id) {
          if (el.like_status) {
            el.like_number -= 1
          } else {
            el.like_number += 1
          }
          el.like_status = !el.like_status
        }
      });
      return { ...state, comments: [...state.comments] }
    case CLEAR_COMMENTS:
      return initState
    default:
      return state
  }
}

export default CommentsReducer