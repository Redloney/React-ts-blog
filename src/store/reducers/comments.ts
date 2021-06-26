import { SET_COMMENTS } from '../const'

import { CommentsActions } from '../actions/comments'

const initState: Array<any> = []

const CommentsReducer = (preState = initState, action: CommentsActions) => {
  const { type, comments } = action
  switch (type) {
    case SET_COMMENTS:
      return [...comments]
    default:
      return preState
  }
}

export default CommentsReducer