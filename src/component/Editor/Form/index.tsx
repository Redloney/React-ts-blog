import React, { PureComponent, RefObject } from 'react'
import './Form.scss'

// antd
import { Modal, Form, Radio, Input, Col, Row, message } from 'antd'
import { ModalProps } from 'antd/lib/modal'
import { FormInstance } from 'antd/lib/form'

// http api
import { ValidateUserExist } from '../../../api/user'

// types
import { UserInfo } from '../../../types'

// props interface
interface Props {
  setVisible: Function
  login: Function
  logout: Function
  visible: boolean | undefined
}

// state interface
interface State {
  nickname: string
  gender: string
  email: string
  weburl: string
  timer: number
  nameExist: boolean
  emailExist: boolean
}

class LoginForm extends PureComponent<Props, State> {
  state: State = {
    nickname: '',
    gender: '',
    email: '',
    weburl: '',
    timer: 0,
    nameExist: false,
    emailExist: false,
  }

  FormRef: RefObject<FormInstance> = React.createRef()

  // 登录
  modalSubmit = () => {
    this.FormRef.current?.submit()
  }

  // 取消
  modalCancel = () => {
    this.props.setVisible(false)
    this.FormRef.current?.resetFields()
  }

  // 请求登录接口
  submit = async (userinfo: UserInfo) => {
    if (await this.props.login(userinfo)) {
      this.modalCancel()
    }
  }

  render() {
    const { visible } = this.props
    const { modalSubmit, modalCancel, submit } = this

    // Modal 配置参数
    const ModalParams: ModalProps = {
      title: '登录',
      okText: '确定',
      cancelText: '取消',
      className: 'loginModal',
      mask: true,
      centered: true,
      maskClosable: true,
      keyboard: true,
      visible: visible,
      okType: 'default',
      onOk: modalSubmit,
      onCancel: modalCancel,
    }

    return (
      <Modal className="loginModal" {...ModalParams}>
        <Form name="loginForm" onFinish={submit} ref={this.FormRef}>
          <Row>
            <Col span={12} xs={10} sm={10} md={10} lg={10} xl={10} xxl={10}>
              <Form.Item>昵称(必填)</Form.Item>
              <Form.Item
                name="nickname"
                validateTrigger="onBlur"
                rules={[
                  {
                    type: 'string',
                    required: true,
                    message: '请输入昵称!',
                  },
                  {
                    min: 1,
                    max: 12,
                    message: '请输入 1~12 位昵称！',
                  },
                  {
                    validator: async (_rule, value: string, _callback) => {
                      if (this.state.nameExist) return
                      if (!value) return
                      let isExist: boolean = (await ValidateUserExist({
                        nickname: value,
                      })) as boolean
                      this.setState({
                        nameExist: isExist,
                      })
                      isExist ? message.info('昵称已存在') : null
                    },
                  },
                ]}
              >
                <Input className="nickname" placeholder="xxxx" />
              </Form.Item>
            </Col>
            <Col
              span={10}
              xs={24}
              sm={24}
              md={{ offset: 2, span: 10 }}
              lg={{ offset: 2, span: 10 }}
              xl={{ offset: 2, span: 10 }}
              xxl={{ offset: 2, span: 12 }}
            >
              <Form.Item>性别 :</Form.Item>
              <Form.Item name="gender">
                <Radio.Group>
                  <Radio.Button
                    style={{ marginRight: '10px', fontSize: '12px' }}
                    value="male"
                  >
                    男
                  </Radio.Button>
                  <Radio.Button
                    style={{ marginRight: '10px', fontSize: '12px' }}
                    value="female"
                  >
                    女
                  </Radio.Button>
                  <Radio.Button
                    style={{ marginRight: '10px', fontSize: '12px' }}
                    value="secrecy"
                  >
                    保密
                  </Radio.Button>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col
              span={10}
              xs={{ offset: 0, span: 16 }}
              sm={{ offset: 0, span: 16 }}
              md={{ offset: 0, span: 10 }}
              lg={{ offset: 0, span: 10 }}
              xl={{ offset: 0, span: 10 }}
              xxl={{ offset: 0, span: 10 }}
            >
              <Form.Item>
                <Form.Item>邮箱(必填) :</Form.Item>
                <Form.Item
                  name="email"
                  validateTrigger="onBlur"
                  rules={[
                    {
                      required: true,
                      message: '请填写你的邮箱！',
                    },
                    {
                      type: 'email',
                      message: '请输入正确的邮箱格式!',
                    },
                    {
                      validator: async (_rule, value: string, _callback) => {
                        if (this.state.emailExist) return
                        if (!value) return
                        let isExist: boolean = (await ValidateUserExist({
                          email: value,
                        })) as boolean
                        this.setState({
                          emailExist: isExist,
                        })
                        isExist ? message.info('邮箱已存在') : null
                      },
                    },
                  ]}
                >
                  <Input className="email" placeholder="xxx@xxx.xxx" />
                </Form.Item>
              </Form.Item>
            </Col>
            <Col
              span={10}
              xs={{ offset: 0, span: 16 }}
              sm={{ offset: 0, span: 16 }}
              md={{ offset: 2, span: 10 }}
              lg={{ offset: 2, span: 10 }}
              xl={{ offset: 2, span: 10 }}
              xxl={{ offset: 2, span: 10 }}
            >
              <Form.Item>
                <Form.Item>主页 :</Form.Item>
                <Form.Item name="weburl" rules={[]}>
                  <Input className="weburl" placeholder="http://xxx.xxx" />
                </Form.Item>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    )
  }
}

export default LoginForm
