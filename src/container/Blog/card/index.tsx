import React from 'react'

interface Props {}

export const index = (props: Props) => {
  return (
    <section
      data-aos="fade-up"
      data-aos-duration={850}
      data-aos-easing="ease-in-out-back"
      className="card"
    >
      <div className="cover-picture">
        <img src="https://redspite.com/uploads/1587475670795.jpg" />
      </div>
      <div className="content">
        <h2 className="title">文章标题</h2>
        <span className="date">2021.9.13</span>
        <p className="desc">
          最近换工作，忙着找房子+搬家+努力生活，忙得已经近一个月没写总结了，虽然没写，但是我对前端滴热情一如以往。
          最近在学习微信小程序，微信小程序是个坑啊，才推出一两个月，api已经废除了好多了。
        </p>
        <div className="more">Read More</div>
      </div>
    </section>
  )
}
