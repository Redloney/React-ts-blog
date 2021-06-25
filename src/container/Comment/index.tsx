import React, { PureComponent } from 'react'
import './comment.scss'

import Editor from '../../component/Editor'
import Comments from '../../component/Comments'

// redux
import { connect } from 'react-redux'
import { login, logout } from '../../store/actions/userinfo'
import { UserInfo } from '../../types'
import storage from '../../utils/storage'
import { GetUserAddress, UserLogin } from '../../api/user'
import { message } from 'antd'

interface Props {
  userinfo: UserInfo
  login: Function
  logout: Function
}

interface State {
  userinfo: UserInfo
}

// @ts-ignore
@connect((state) => state, { login, logout })
class Comment extends PureComponent<Props, State> {
  // 组件挂载
  componentDidMount() {
    // console.log(this.props)
  }

  // 组件卸载
  componentWillUnmount() {}
  // 登录
  login = async (userinfo: UserInfo) => {
    try {
      // 用户地址
      let address = await GetUserAddress()
      // 用户信息
      let {
        data: user,
        msg,
        code,
      }: any = await UserLogin({ ...userinfo, address })
      if (user && code) {
        storage.set('userinfo', user)
        this.setState({
          userinfo: user,
        })
        message.destroy()
        message.success('欢迎你! ' + user.nickname, 3)
        return true
      } else {
        message.destroy()
        message.warn('登录失败! ' + msg, 3)
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // 注销
  logout = () => {
    try {
      this.props.logout()
      return true
    } catch (err) {
      console.log(err)
      return false
    }
  }

  render() {
    const { userinfo } = this.props

    const { login, logout } = this

    return (
      <div className="comment">
        <Editor userinfo={userinfo} login={login} logout={logout} />
        <Comments userinfo={userinfo} />
      </div>
    )
  }
}

export default Comment
