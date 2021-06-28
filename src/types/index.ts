export type StoreState = number

export type UserInfo = {
  _id?: string,
  avatar?: string,
  nickname?: string,
  gender?: string,
  email?: string,
  weburl?: string,
  address?: object,
  isLogin?: boolean
  createdAt?: string,
  updatedAt?: string
}

export type Children = {
  _id?: string,
  userinfo: UserInfo,
  content?: string,
  thumbNum?: number,
  commNum?: number,
  createdAt?: string,
  updatedAt?: string,
  isDel?: boolean
}

export type Comment = {
  _id?: string,
  userinfo: UserInfo,
  content?: string,
  thumbNum?: number,
  commNum?: number,
  createdAt?: string,
  updatedAt?: string,
  children?: Array<Children> | undefined,
  isDel?: boolean
}