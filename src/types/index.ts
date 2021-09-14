export type StoreState = number

export type UserInfo = {
  _id?: string
  avatar?: string
  nickname?: string
  gender?: string
  email?: string
  weburl?: string
  address?: object
  isLogin?: boolean
  createdAt?: string
  updatedAt?: string
}

export type ChildComm = {
  _id?: string
  userinfo: UserInfo
  content?: string
  like_status?: number
  like_number?: number
  del_status?: boolean
  createdAt?: string
  updatedAt?: string
}

export type Comment = {
  _id?: string
  userinfo: UserInfo
  content?: string
  like_status?: number
  like_number?: number
  del_status?: boolean
  createdAt?: string
  updatedAt?: string
  children?: Array<ChildComm> | undefined // 子评论
}

export type Address = {
  message: String
  result: {
    ad_info: Object
    ip: String
    location: Object
  }
  status: Number
}
