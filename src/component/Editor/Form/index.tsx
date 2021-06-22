import React, { PureComponent, RefObject } from 'react'

import { Modal, Form, Radio, Input, Col, Row } from 'antd'

import { ModalProps } from 'antd/lib/modal'
import { FormInstance } from 'antd/lib/form'

import './Form.scss'

interface Props {
  setVisible: Function
  visible: boolean | undefined
}

interface State {
  nickname: string
  gender: string
  email: string
  weburl: string
}
export default class index extends PureComponent<Props, State> {
  state: State = {
    nickname: '',
    gender: '',
    email: '',
    weburl: '',
  }

  FormRef: RefObject<FormInstance> = React.createRef()

  componentDidMount() {
    // console.log(this.FormRef);
  }

  modalSubmit = () => {
    // this.FormRef.current?.validateFields(['nickname'])
    this.FormRef.current?.submit()
    // this.props.setVisible(false)
  }

  modalCancel = () => {
    this.props.setVisible(false)
  }

  // 请求登录接口
  submit = (values: any) => {
    console.log(values)
  }

  render() {
    const { visible } = this.props
    const { } = this.state
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
                <Form.Item>邮箱 :</Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: 'email',
                      message: '请输入正确的邮箱格式!',
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
