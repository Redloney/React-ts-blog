export type StoreState = number

export type UserInfo = {
  _id?: string,
  nickname?: string,
  gender?: string,
  email?: string,
  weburl?: string,
  address?: object,
  isLogin?: boolean
  createAt?: string,
  updateAt?: string
}

export type Children = {
  _id?: string,
  userinfo: UserInfo,
  content?: string,
  thumbNum?: number,
  commNum?: number,
  createAt?: string,
  updateAt?: string,
  isDel?: boolean
}

export type Comment = {
  _id?: string,
  userinfo: UserInfo,
  content?: string,
  thumbNum?: number,
  commNum?: number,
  createAt?: string,
  updateAt?: string,
  children?: Children | undefined,
  isDel?: boolean
}