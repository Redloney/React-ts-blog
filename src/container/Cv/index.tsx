import React, { useEffect } from 'react'

import './Cv.scss'

import { Row, Col } from 'antd'

const Cv = () => {
  useEffect(() => {
    console.log('Cv OnMounted')
  }, [])

  return (
    <main className="cv" data-aos="fade-up" data-aos-duration="850">
      <section className="section">
        <h2 className="title">个人信息</h2>
        <Row>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} span={8}>
            乐文俊 - 男 - 22
          </Col>
          {/* <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} xs={24} sm={12} md={8} lg={8} xl={8} span={8}>湖北生物科技职业学院 - 计算机应用技术</Col> */}
          <Col xs={24} sm={12} md={8} lg={8} xl={8} span={8}>
            湖北生科 - 计算机应用技术
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} span={8}>
            前端开发 - 1 年工作经验
          </Col>
          <Col xs={24} sm={12} md={8} lg={8} xl={8} span={8}>
            期望职位: Web前端工程师
          </Col>
          <Col xs={24} sm={16} md={16} lg={16} xl={16} span={16}>
            期望城市: 武汉
          </Col>
          <Col span={24}>
            <a
              href="https://github.com/redloney"
              target="_blank"
              rel="noreferrer"
            >
              Github: https://github.com/redloney
            </a>
          </Col>
          <Col span={24}>
            <a
              href="https://gitee.com/Evan_Redloney"
              target="_blank"
              rel="noreferrer"
            >
              Gitee: https://gitee.com/Evan_Redloney
            </a>
          </Col>
        </Row>
      </section>
      <section className="section">
        <h2 className="title">联系方式</h2>
        <Row>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} span={8}>
            微信: Y1527***9547
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} span={8}>
            邮箱: 67591500@qq.com
          </Col>
          <Col xs={24} sm={8} md={8} lg={8} xl={8} span={8}>
            网站: www.redloney.cn
          </Col>
        </Row>
      </section>
      {/* <section className='section' data-aos='fade-up'
      data-aos-duration={500}>
      <h2 className="title">开源项目</h2>
      <Row>
        <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>个人博客：React + Redux + Antd + Restify + MongoDB  ( 简历，文章，留言板 )</Col>
        <Col data-aos='fade-up' data-aos-duration={500} data-aos-delay={100} span={24}>线上持续维护项目，新技术踩坑，持续优化</Col>
      </Row>
    </section> */}
      <section className="section">
        <h2 className="title">技能掌握</h2>
        <Row>
          <Col span={24}>
            熟练使用 JavaScript / Css3 / Html5 开发web应用 熟悉 Antd Element
            Vant 前端UI库
          </Col>
          <Col span={24}>
            熟悉 Vue React 的基本使用 能够独立开发SPA应用
            熟悉组件化开发及构建优化
          </Col>
          <Col span={24}>
            熟悉 ES6 基本语法 了解 TypeScript 的基本使用 熟悉 Scss 预处理器
          </Col>
          <Col span={24}>
            熟悉 NodeJs Koa MongoDb ， 能够使用 Nodejs 搭建服务端应用
          </Col>
          <Col span={24}>
            有过C#学习经验 ， 了解 SQL Server 数据库的基本操作
          </Col>
        </Row>
      </section>
      <section className="section">
        <h2 className="title">工作经历</h2>
        <Row>
          <Col span={24}>
            <strong>武汉斑马快跑公司 (2019.8 - 2020.6)</strong>
          </Col>
          <Col span={24}>研发部/Web前端开发 </Col>
        </Row>
        <Row>
          <Col span={24}>
            <strong>武汉心诺网络有限公司 (2021.3 - 2021.5) </strong>
          </Col>
          <Col span={24}>技术部/Web前端开发 </Col>
        </Row>
      </section>
      <section className="section">
        <h2 className="title">项目经验</h2>
        <Row>
          <Col span={24}>
            <h4 className="bold">斑马公司官网重构</h4>
            <p>概述：基于原项目的基础上使用Vue重新编写整个项目</p>
            <p>角色：独立前端设计与开发，定期汇报开发进度</p>
            <p>
              职责：负责项目，技术选型，参与开发与协调开发工作，项目托管和版本管理，测试页面Bug并打包
            </p>
            <p>
              技术栈：Vue2.0 + Vue-Router + Vuex + Swiper 等技术开发 SPA 应用
            </p>
            <p>
              难点：路由重定向，首屏加载时间过长，路由切换页面白屏，页面状态缓存
            </p>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <h4 className="bold">即眠WebApp</h4>
            <p>
              概述：移动端WebApp，用户反馈贴吧，线上疗愈音频，心里测评答题
              ，线上心理咨询，帮助用户使用助眠产品缓解焦虑压力
            </p>
            <p>
              角色：独立前端设计与开发、负责项目结构搭建，技术选项，项目模块划分
            </p>
            <p>
              职责：负责项目，技术选型，参与开发与协调开发工作，项目托管和版本管理，测试页面Bug并打包
            </p>
            <p>技术栈：Vue Cli + Vue 2.0 + Vant + Axios + Vue-Cookies</p>
            <p>难点：数据拉取缓慢，音乐定时，答题数据回填</p>
          </Col>
        </Row>
      </section>
      <section className="section">
        <h2 className="title">自我评价</h2>
        <Row>
          <Col span={24}>性格内敛，喜欢分享，爱好自学。</Col>
          <Col span={24}>喜欢尝试，期待新鲜事物，把控细节，注重效率。</Col>
        </Row>
      </section>
    </main>
  )
}

export default Cv
