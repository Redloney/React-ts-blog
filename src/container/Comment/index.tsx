import React, { PureComponent } from 'react'
import './comment.scss'

import Editor from '../../component/Editor'

import storage from '../../utils/storage'

//antd
import { message } from 'antd'

// redux
import { connect } from 'react-redux'
import { login, logout } from '../../store/actions/userinfo'
import { getComments, setComment, payload } from '../../store/actions/comments'
import { UserInfo, Comment as IComment } from '../../types'

// http api
import { DeleteComment, GetComments } from '../../api/Comment'
import {
  GetRandomAvatar,
  GetUserAddress,
  UserLogin,
  UserLogout,
} from '../../api/user'
import { UserLike } from '../../api/LikeRecord'

interface Props {
  comments: any
  userinfo: UserInfo
  login: Function
  logout: Function
  getComments: Function
  setComment: Function
}

interface State {
  size: number
}

// @ts-ignore
@connect((state) => state, {
  login,
  logout,
  getComments,
  setComment,
})
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

  thumbComment = async (comm: any, _id: string, like_status: number) => {
    // message.info('点赞成功！', 3)
    this.props.setComment({ comm_id: comm._id, _id, like_status })
    const ret = await UserLike(comm._id)
    console.log(ret)
  }

  getMore = async () => {
    try {
      const { size } = this.state
      const { page } = this.props.comments
      let { comments }: any = await GetComments(page + 1, size)
      if (comments[0] === undefined) {
        message.info('没有更多留言了~', 3)
      }
      this.props.getComments({ page: page + 1, size, comments })
      return false
    } catch (err) {
      console.warn(err)
      return true
    }
  }

  // 登录
  login = async (userinfo: UserInfo) => {
    try {
      // 用户地址
      let { result: address } = (await GetUserAddress()) as any
      // 随机头像
      let { imgurl: avatar } = (await GetRandomAvatar(userinfo.gender)) as any
      // 用户信息
      let ret: any = await UserLogin({ ...userinfo, avatar, address })
      if (ret.code && ret.token) {
        storage.set('token', ret.token)
        this.props.login(userinfo)
        storage.set('userinfo', userinfo)
        message.destroy()
        message.success('欢迎你! ' + userinfo.nickname, 3)
        return true
      } else {
        message.destroy()
        message.warn('登录失败! ' + ret.msg, 3)
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  }

  // 注销
  logout = async () => {
    try {
      this.props.logout()
      const { code } = (await UserLogout()) as any
      return code ? true : false
    } catch (err) {
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
    const { login, logout, getMore, deleteComment, thumbComment } = this

    return (
      <div className="comment">
        {/* <Search /> */}
        <Editor
          thumbComment={thumbComment}
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
