import { GET_COMMENTS, CLEAR_COMMENTS } from '../const'

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
    case CLEAR_COMMENTS:
      return initState
    default:
      return state
  }
}

export default CommentsReducer