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
  _id?: string, // 评论ID
  userinfo: UserInfo, // 用户信息
  content?: string, // 内容
  thumbNum?: number, // 点赞数
  commNum?: number, // 评论数
  createdAt?: string, // 创建时间
  updatedAt?: string, // 修改时间
  children?: Array<Children> | undefined, // 子评论
  isDel?: boolean // 删除?
}