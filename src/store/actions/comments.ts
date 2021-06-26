import { SET_COMMENTS, SET_COMMENTS_TYPE } from "../const";

import { Comment } from "../../types";

export interface SetCommentsAction {
  type: SET_COMMENTS_TYPE,
  comments: Array<Comment>
}

// export interface DelCommentsAction {
//   type: DEL_UPSERINFO_TYPE,
// }

export type CommentsActions = SetCommentsAction


// 登录
export const setComments = (comments: Array<Comment>): SetCommentsAction => ({
  type: SET_COMMENTS,
  comments
})

