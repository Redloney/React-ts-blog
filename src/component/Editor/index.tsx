import React, { PureComponent, RefObject } from 'react'

import {
  message,
  Popover,
  Button,
  Input,
  Popconfirm,
  FormInstance,
  notification,
} from 'antd'

const { TextArea } = Input

import { emoji } from './emoji.json'

import { uncodeUtf16 } from '../../utils/emoji'

import './editor.scss'

import LoginForm from './Form'

// 参数接口
interface Props {}

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
  isLogin: boolean
  loginModal: LoginModal
  emojiPopover: EmojiPopover
  textarea: string | number
}

export default class Editor extends PureComponent<Props, State> {
  fromRef: RefObject<FormInstance> = React.createRef()

  state: State = {
    isLogin: false,
    loginModal: {
      visible: false,
    },
    emojiPopover: {
      visible: false,
    },
    textarea: '',
  }

  componentDidMount() {
    // notification.info({
    //   message: '给我留言吧~',
    //   description: '你可以点击登录按钮给我留言哦,留下个人主页这样别人可以点击你的头像去到你的空间！',
    //   duration: 10
    // })
  }

  // 用户登录
  login = () => {
    this.setState({
      loginModal: {
        visible: true,
      },
    })
  }

  // 用户登出
  logout = () => {
    this.setState({
      isLogin: false,
    })
    message.info('已登出，欢迎下次再来！')
  }

  textAreaKeyDown = (e: any) => {
    // ctrl + enter
    if (e.ctrlKey && e.keyCode === 13) {
      console.log(this.state.textarea)
    }
  }

  textAreaOnChange = (e: any) => {
    this.setState({
      textarea: e.target.value,
    })
  }

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

  setVisible = (status: boolean) => {
    this.setState({
      loginModal: {
        visible: status,
      },
    })
  }

  render() {
    message.config({
      top: 80,
      duration: 2,
      maxCount: 3,
    })

    const { isLogin, emojiPopover, loginModal, textarea } = this.state
    const { setVisible } = this

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

    const editorHeaderExtra = isLogin ? (
      <Popconfirm
        title="确定要注销登录么？"
        okText="是"
        cancelText="否"
        onConfirm={this.logout}
      >
        <Button type="text"> 注销 </Button>
      </Popconfirm>
    ) : (
      <Button onClick={this.login} type="text">
        {' '}
        登录{' '}
      </Button>
    )

    return (
      <section
        className="comment-editor"
        data-aos="fade-up"
        data-aos-delay={1 * 10}
        data-aos-duration={850}
      >
        <div className="editor-header">
          <h1>留言板</h1>
          <p>你好啊 陌生人，欢迎给我留言哦~</p>
          <div className="loginBtns">{editorHeaderExtra}</div>
          <LoginForm visible={loginModal.visible} setVisible={setVisible} />
        </div>
        <div className="editor-inner">
          <TextArea
            minLength={3}
            maxLength={300}
            showCount
            onKeyDown={this.textAreaKeyDown}
            className="editor-input"
            placeholder="写下你的评论..."
            value={textarea}
            onChange={this.textAreaOnChange}
          />
          <div className="bottom" style={{ display: 'flex' }}>
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
                <i className="icon">
                  <svg
                    t="1619080318872"
                    className="icon"
                    viewBox="0 0 1024 1024"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    p-id="1772"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M512 63.791885c-247.536746 0-448.208115 200.671369-448.208115 448.208115s200.671369 448.208115 448.208115 448.208115 448.208115-200.671369 448.208115-448.208115S759.535723 63.791885 512 63.791885zM512 906.423141c-217.829144 0-394.423141-176.593997-394.423141-394.423141s176.593997-394.423141 394.423141-394.423141 394.423141 176.593997 394.423141 394.423141S729.829144 906.423141 512 906.423141zM368.573403 494.071675c29.707602 0 53.784974-42.005696 53.784974-71.713298s-24.077372-71.713298-53.784974-71.713298c-29.707602 0-53.784974 42.005696-53.784974 71.713298S338.865801 494.071675 368.573403 494.071675zM655.426597 494.071675c29.707602 0 53.784974-42.005696 53.784974-71.713298s-24.077372-71.713298-53.784974-71.713298c-29.707602 0-53.784974 42.005696-53.784974 71.713298S625.718995 494.071675 655.426597 494.071675zM691.283246 619.569948c-8.695033-3.764744-20.904099-4.715395-32.790824-4.427846-32.450063 46.003753-85.912695 76.141144-146.492422 76.141144-61.726853 0-116.139114-31.195489-148.392702-78.669734-10.075473 0.214894-20.779256 1.90028-30.890544 6.956436-11.599176 5.809309-15.633049 13.984503-18.143219 21.029966 41.21775 71.050196 114.113991 122.396631 197.426465 122.396631 84.764546 0 158.737304-53.157687 199.524243-126.143978C706.396455 629.771287 699.906647 623.317295 691.283246 619.569948z"
                      p-id="1773"
                    ></path>
                  </svg>
                </i>
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
              <Button className="submit"> 留言 </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }
}
