export type StoreState = number

export type UserInfo = {
  _id?: string,
  nickname?: string,
  gender?: string,
  email?: string,
  weburl?: string,
  address?: object,
  isLogin?: boolean
}

export type Comment = {
  _id?: string,
  userId?: string,
  content?: string,
  replyId?: string,
  thumbNum?: number,
  commNum?: number,
}