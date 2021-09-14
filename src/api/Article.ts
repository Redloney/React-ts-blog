import axios from './axios'

// 文章列表
export const getArtList = async () => {
  const { data } = (await axios.get('/api/article/list')) as any
  if (data.code && data.arts) {
    return data.arts
  }
  return []
}

// 文章详情
export const getArtDetail = async (_id: string) => {
  const { data } = (await axios({
    method: 'GET',
    url: '/api/article/detail',
    params: { _id },
  })) as any
  if (data.code && data.art) {
    return data.art
  }
  return {}
}

const list = [
  {
    _id: '605f32dafccc5d5c2169566e',
    pics: ['https://redspite.com/uploads/1616851608599.jpeg'],
    isDel: false,
    title: 'React Hook 系列（二）：React hooks',
    desc: 'Hook 出现之前，组件之间复用状态逻辑很难，解决方案（HOC、Render Props）都需要重新组织组件结构， 且代码难以理解。',
    createtime: '2020-03-25T16:00:00.000Z',
  },
  {
    _id: '605f215d4b80ce58cab88109',
    pics: ['https://redspite.com/uploads/1616847256235.jpeg'],
    isDel: false,
    title: 'React Hook 系列（一）：React 组件的发展',
    desc: 'react 不同组件用法',
    createtime: '2020-03-22T16:00:00.000Z',
  },
  {
    _id: '5e9efd26601bd82819211a1e',
    pics: ['https://redspite.com/uploads/1587477767089.jpg'],
    isDel: false,
    title: 'ubuntu 从零搭建环境，部署项目',
    desc: '从零开始搭建服务器环境的步骤',
    createtime: '2019-03-19T16:00:00.000Z',
  },
  {
    _id: '5e9ef5c6601bd82819211a1d',
    pics: ['https://redspite.com/uploads/1587475909483.jpg'],
    isDel: false,
    title: 'express+mongoDB建立与前端通信的数据库',
    desc: '学习过程中所记录的笔记，按着步骤来可以自己搭建一个能通信的服务器，遇到不懂的地方问度娘。 在 我的码云和github上有搭建完成后的代码，前端用的Vue框架。 不完善的地方还在修改ing~',
    createtime: '2017-07-24T16:00:00.000Z',
  },
  {
    _id: '5e9ef570601bd82819211a1c',
    pics: ['https://redspite.com/uploads/1587475823202.jpg'],
    isDel: false,
    title: '神奇的Cordova -- 利用H5进行APP开发',
    desc: '一直以来app的开发都分为android版本和ios版本,同一款app需要写两种版本，版本有差异不说，耗费的成本加成。 cordova的出现就是一股清流，它能实现将h5页面打包成android或ios版本，实现了android、ios、pc端页面的统一。',
    createtime: '2017-02-18T16:00:00.000Z',
  },
  {
    _id: '5e9ef52d601bd82819211a1b',
    pics: ['https://redspite.com/uploads/1587475756263.jpg'],
    isDel: false,
    title: '谷歌地图初触电',
    desc: '最近的项目里面用到了谷歌地图，以前开发过百度地图，但是都涉足很浅很浅，虽然这次也只用到了drawingManager 下面几个画图组件。 氮素！写几百行的代码实现出功能，这样充实的学习过程很令人满足讷。',
    createtime: '2016-12-11T16:00:00.000Z',
  },
  {
    _id: '5e9ef4d7601bd82819211a1a',
    pics: ['https://redspite.com/uploads/1587475670795.jpg'],
    isDel: false,
    title: '快一个月没写文章总结了',
    desc: '最近换工作，忙着找房子+搬家+努力生活，忙得已经近一个月没写总结了，虽然没写，但是我对前端滴热情一如以往。 最近在学习微信小程序，微信小程序是个坑啊，才推出一两个月，api已经废除了好多了。',
    createtime: '2016-11-11T16:00:00.000Z',
  },
]
