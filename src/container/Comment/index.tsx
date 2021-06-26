import React, { PureComponent } from 'react'
import './comment.scss'

import Editor from '../../component/Editor'
import Comments from '../../component/Comments'

// redux
import { connect } from 'react-redux'
import { login, logout } from '../../store/actions/userinfo'
import { setComments } from '../../store/actions/comments'
import { UserInfo, Comment as IComment } from '../../types'
import storage from '../../utils/storage'
import { GetRandomAvatar, GetUserAddress, UserLogin } from '../../api/user'
import { message } from 'antd'
import { DeleteComment, GetComments } from '../../api/comm'

interface Props {
  comments: Array<IComment>
  userinfo: UserInfo
  login: Function
  logout: Function
  setComments: Function
}

interface State {}

// @ts-ignore
@connect((state) => state, { login, logout, setComments })
class Comment extends PureComponent<Props, State> {
  EditorRef: any = React.createRef()

  // 组件挂载
  componentDidMount() {
    // document && document.documentElement
    //   ? (document.documentElement.scrollTop = 0)
    //   : null
    this.updateComments()
  }

  updateComments = async () => {
    try {
      const { comments, code } = (await GetComments()) as any
      this.props.setComments(code ? comments : [])
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
    const { userinfo, comments } = this.props

    const { login, logout, deleteComment } = this

    return (
      <div className="comment">
        <Editor
          deleteComment={deleteComment}
          updateComments={this.updateComments}
          userinfo={userinfo}
          comments={comments}
          login={login}
          logout={logout}
        />
      </div>
    )
  }
}

export default Comment
