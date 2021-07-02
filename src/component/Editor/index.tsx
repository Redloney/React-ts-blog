import React, { Fragment, PureComponent, RefObject } from 'react'

import { message, Popover, Button, Input, Popconfirm } from 'antd'

const { TextArea } = Input

import { emoji } from './emoji.json'

import { uncodeUtf16 } from '../../utils/emoji'

import Comments from '../Comments'

import './editor.scss'

import LoginForm from './Form'
import { UserInfo, Comment as IComment } from '../../types'
import { TextAreaRef } from 'antd/lib/input/TextArea'
import { InsertComment } from '../../api/comm'

// 参数接口
interface Props {
  userinfo: UserInfo
  comments: Array<IComment>
  login: Function
  logout: Function
  getMore: Function
  updateComments: Function
  deleteComment: Function
}

// 登录框
interface LoginModal {
  visible?: boolean | undefined
}

// 表情弹窗
interface EmojiPopover {
  visible?: boolean
}

// 状态接口
interface State {
  loginModal: LoginModal
  emojiPopover: EmojiPopover
  textarea: string
  replyId: string
}

export default class Editor extends PureComponent<Props, State> {
  // TextArea Dom
  inputRef: RefObject<TextAreaRef> = React.createRef()

  state: State = {
    loginModal: {
      visible: false,
    },
    emojiPopover: {
      visible: false,
    },
    textarea: '',
    replyId: '',
  }

  // 用户登录
  login = async (userinfo: UserInfo) => {
    return await this.props.login(userinfo)
  }

  // 用户登出
  logout = async () => {
    if (await this.props.logout()) {
      message.info('已注销登录，欢迎下次再来！')
      return
    }
    console.warn('注销错误！')
  }

  replyTo = (comm: IComment, _id: string) => {
    let nickname = comm.userinfo.nickname
    this.inputRef.current?.focus()
    this.setState(
      {
        textarea: `@ ${nickname}: `,
        replyId: _id,
      },
      () => {
        console.log(this.state.replyId)
      }
    )
  }

  // 输入框按键按下
  textAreaKeyDown = (e: any) => {
    // ctrl + enter
    if (e.ctrlKey && e.keyCode === 13) {
      console.log(this.state.textarea)
    }
  }

  // 输入框内容改变
  textAreaOnChange = (e: any) => {
    this.setState({
      textarea: e.target.value,
    })
  }

  // 表情输入框显示
  emojiBoxVisibleChange = () => {
    this.setState({
      emojiPopover: {
        visible: !this.state.emojiPopover.visible,
      },
    })
  }

  // 表情点击事件
  handleGetEmoji = (v: string) => {
    this.setState({
      textarea: this.state.textarea + uncodeUtf16(v),
    })
  }

  // 设置Modal弹窗显示
  setVisible = (status: boolean) => {
    this.setState({
      loginModal: {
        visible: status,
      },
    })
  }

  //留言
  leaveMessage = async () => {
    const content = this.state.textarea
    const replyId = this.state.replyId
    if (this.props.userinfo.isLogin) {
      if (!content) {
        message.warn('留言不可以为空哦！', 3)
        this.inputRef.current?.focus()
        return
      }
      if (content.length < 5) {
        message.warning(' 提交失败、再多写一点吧', 3)
        return
      }
      if (content.length > 300) {
        message.warning('提交失败、留言字数超出限制')
        return
      }
      // 留言接口
      const { code, comment }: any = await InsertComment({ content, replyId })
      if (code && comment) {
        message.success(`Hi ${this.props.userinfo.nickname} 感谢你的留言！`, 3)
        this.setState({ textarea: '', replyId: '' })
        this.props.updateComments()
      }
      return
    }
    message.info('Hi 陌生人 请先登录哦！', 3)
  }

  render() {
    message.config({
      top: 80,
      duration: 2,
      maxCount: 3,
    })

    const { userinfo, comments, deleteComment, getMore } = this.props

    const { emojiPopover, loginModal, textarea } = this.state

    const { replyTo, setVisible, login, logout } = this

    // 气泡弹窗
    const popover = (
      <ul id="emoji">
        {emoji.map((v, i) => {
          return (
            <li onClick={() => this.handleGetEmoji(v)} key={i}>
              {uncodeUtf16(v)}
            </li>
          )
        })}
      </ul>
    )

    const editorHeaderExtra =
      userinfo && userinfo.isLogin ? (
        <Popconfirm
          title="确定要注销登录么？"
          okText="是"
          cancelText="否"
          onConfirm={logout}
        >
          <Button type="text">注销</Button>
        </Popconfirm>
      ) : (
        <Button type="text" onClick={() => setVisible(true)}>
          登录
        </Button>
      )

    return (
      <Fragment>
        <section
          className="comment-editor"
          data-aos="fade-up"
          data-aos-delay={1 * 10}
          data-aos-duration={850}
        >
          <div className="editor-header">
            <h1>留言板</h1>
            <p>
              你好啊{' '}
              {userinfo && userinfo.nickname ? userinfo.nickname : '陌生人'}
              ，欢迎给我留言哦~
            </p>
            <div className="loginBtns">{editorHeaderExtra}</div>
            <LoginForm
              login={login}
              logout={logout}
              visible={loginModal.visible}
              setVisible={setVisible}
            />
          </div>
          <div className="editor-inner">
            <TextArea
              ref={this.inputRef}
              minLength={3}
              maxLength={300}
              showCount
              onKeyDown={this.textAreaKeyDown}
              className="editor-input"
              placeholder="写下你的评论..."
              value={textarea}
              onChange={this.textAreaOnChange}
            />
            <div className="bottom">
              <div className="extra">
                <Popover
                  id="comm-popover"
                  arrowPointAtCenter
                  placement="bottomLeft"
                  content={popover}
                  title="表情"
                  trigger="click"
                  visible={emojiPopover.visible}
                  onVisibleChange={this.emojiBoxVisibleChange}
                >
                  <i className="iconfont iconFaceactivated-Outlined"></i>
                </Popover>
                {/* <Upload {...uploadProps}>
                <i className="icon">
                  <svg t="1623668755296" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1210" width="20" height="20">
                    <path d="M827.733333 896H196.266667C123.733333 896 64 842.666667 64 776.533333V247.466667C64 181.333333 123.733333 128 196.266667 128h631.466666c72.533333 0 132.266667 53.333333 132.266667 119.466667v531.2c0 64-59.733333 117.333333-132.266667 117.333333zM196.266667 213.333333C170.666667 213.333333 149.333333 228.266667 149.333333 247.466667v531.2c0 17.066667 21.333333 32 46.933334 32h631.466666c25.6 0 46.933333-14.933333 46.933334-34.133334V247.466667c0-17.066667-21.333333-34.133333-46.933334-34.133334H196.266667z" p-id="1211" fill="#707070"></path><path d="M362.666667 512c-59.733333 0-106.666667-46.933333-106.666667-106.666667s46.933333-106.666667 106.666667-106.666666 106.666667 46.933333 106.666666 106.666666-46.933333 106.666667-106.666666 106.666667z m0-128c-12.8 0-21.333333 8.533333-21.333334 21.333333s8.533333 21.333333 21.333334 21.333334 21.333333-8.533333 21.333333-21.333334-8.533333-21.333333-21.333333-21.333333zM298.666667 896c-10.666667 0-21.333333-4.266667-29.866667-12.8-17.066667-17.066667-17.066667-42.666667 0-59.733333l384-384c17.066667-17.066667 42.666667-17.066667 59.733333 0l213.333334 213.333333c17.066667 17.066667 17.066667 42.666667 0 59.733333-17.066667 17.066667-42.666667 17.066667-59.733334 0L682.666667 529.066667 328.533333 883.2c-8.533333 8.533333-19.2 12.8-29.866666 12.8z" p-id="1212" fill="#707070">
                    </path>
                  </svg>
                </i>
              </Upload> */}
                <span className="tips">Ctrl + Enter 发表</span>
              </div>
              <div className="btns">
                <Popconfirm
                  title="确定要提交留言么？"
                  okText="是"
                  cancelText="否"
                  onConfirm={this.leaveMessage}
                >
                  <Button className="submit"> 留言 </Button>
                </Popconfirm>
              </div>
            </div>
          </div>
        </section>
        <Comments
          getMore={getMore}
          replyTo={replyTo}
          comments={comments}
          userinfo={userinfo}
          deleteComment={deleteComment}
        />
      </Fragment>
    )
  }
}
