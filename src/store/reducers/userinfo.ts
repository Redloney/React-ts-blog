import { SET_USERINFO, DEL_USERINFO } from '../const'

import storage from '../../utils/storage'

import { UserActions } from '../actions/userinfo'

const initState = () => {
  // 获取 storage 缓存用户信息
  const userinfo = storage.get('userinfo')
  return userinfo._id ? { ...userinfo, isLogin: true } : { isLogin: false }
}

const UserReducer = (preState = initState(), action: UserActions) => {
  const { type, userinfo } = action
  switch (type) {
    case SET_USERINFO:
      storage.set('userinfo', userinfo)
      return { ...userinfo, isLogin: true }
    case DEL_USERINFO:
      storage.del('userinfo')
      return {}
    default:
      return preState
  }
}

export default UserReducer