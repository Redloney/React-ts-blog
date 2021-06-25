import { SET_USERINFO, DEL_USERINFO, SET_USERINFO_TYPE, DEL_UPSERINFO_TYPE } from "../const";

import { UserInfo } from "../../types";

export interface SetUserInfoAction {
  type: SET_USERINFO_TYPE,
  userinfo: UserInfo
}

export interface DelUserInfoAction {
  type: DEL_UPSERINFO_TYPE,
  userinfo?: UserInfo
}

export type UserActions = SetUserInfoAction | DelUserInfoAction


// 登录
export const login = (userinfo: UserInfo): SetUserInfoAction => ({
  type: SET_USERINFO,
  userinfo: userinfo
})

// 注销
export const logout = (): DelUserInfoAction => ({ type: DEL_USERINFO })