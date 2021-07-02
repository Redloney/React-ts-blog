import React, { PureComponent } from 'react'
import './comment.scss'

import Editor from '../../component/Editor'

import storage from '../../utils/storage'

//antd
import { message } from 'antd'

// redux
import { connect } from 'react-redux'
import { login, logout } from '../../store/actions/userinfo'
import { getComments, payload } from '../../store/actions/comments'
import { UserInfo, Comment as IComment } from '../../types'

// http api
import { DeleteComment, GetComments } from '../../api/comm'
import { GetRandomAvatar, GetUserAddress, UserLogin } from '../../api/user'

interface Props {
  comments: any
  userinfo: UserInfo
  login: Function
  logout: Function
  getComments: Function
}

interface State {
  size: number
}

// @ts-ignore
@connect((state) => state, { login, logout, getComments })
class Comment extends PureComponent<Props, State> {
  state: State = {
    size: 15,
  }
  // 组件挂载
  componentDidMount() {
    // document && document.documentElement
    //   ? (document.documentElement.scrollTop = 0)
    //   : null
    this.updateComments()
  }

  updateComments = async () => {
    try {
      const { size } = this.state
      const { page } = this.props.comments
      let { comments }: any = await GetComments(page, size)
      this.props.getComments({ page, size, comments })
    } catch (err) {
      console.warn(err)
    }
  }

  getMore = async () => {
    try {
      const { size } = this.state
      const { page, count } = this.props.comments
      console.log(count)
      let { comments }: any = await GetComments(page + 1, size)
      this.props.getComments({ page: page + 1, size, comments })
    } catch (err) {
      console.warn(err)
    }
  }

  // 登录
  login = async (userinfo: UserInfo) => {
    try {
      // 用户地址
      let address = await GetUserAddress()
      let { imgurl: avatar } = (await GetRandomAvatar(userinfo.gender)) as any
      // 用户信息
      let {
        data: user,
        msg,
        code,
      }: any = await UserLogin({ ...userinfo, avatar, address })
      if (user && code) {
        storage.set('userinfo', user)
        this.props.login(user)
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

  //  删除评论
  deleteComment = async (fId: string, id: string) => {
    try {
      if (await DeleteComment(fId, id)) {
        this.updateComments()
        return true
      }
      return false
    } catch (err) {
      console.log(err)
      return false
    }
  }

  render() {
    const { userinfo } = this.props
    const { comments } = this.props.comments
    const { login, logout, getMore, deleteComment } = this

    return (
      <div className="comment">
        <Editor
          deleteComment={deleteComment}
          updateComments={this.updateComments}
          userinfo={userinfo}
          comments={comments}
          login={login}
          logout={logout}
          getMore={getMore}
        />
      </div>
    )
  }
}

export default Comment
