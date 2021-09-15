import React, { PureComponent } from 'react'
import './Comments.scss'

import {
  List,
  Button,
  Comment as AntComment,
  Skeleton,
  Popconfirm,
  Tooltip,
  Avatar,
  message,
} from 'antd'
import { ChildComm, Comment, UserInfo } from '../../types'

import dayjs from '../../utils/day'

interface Props {
  userinfo: UserInfo
  comments: Array<Comment>
  replyTo: Function
  getMore: Function
  deleteComment: Function
  thumbComment: Function
}

interface State {
  getMoreLoading: boolean
}

export default class Comments extends PureComponent<Props, State> {
  // state
  state = {
    getMoreLoading: false,
  }

  // 删除评论
  deleteComment = (fId: string | undefined, commId: string | undefined) => {
    this.props.deleteComment(fId, commId)
  }

  // 回复评论
  replyTo = (comm: Comment, _id: string | undefined) => {
    let screenY = document.documentElement.scrollTop
    this.props.replyTo(comm, _id, screenY)
  }

  // 点赞评论
  thumbComment = (
    comm: Comment,
    _id: string | undefined,
    like_status: number | undefined
  ) => {
    if (this.props.userinfo.isLogin) {
      this.props.thumbComment(comm, _id, like_status)
    } else {
      message.warn('请您先登录哦~', 3)
    }
  }

  changeLodingStatus = (getMoreLoading: boolean) => {
    this.setState({
      getMoreLoading,
    })
  }

  // 获取评论
  getMore = async () => {
    this.changeLodingStatus(true)
    this.changeLodingStatus(await this.props.getMore())
    this.changeLodingStatus(false)
  }

  render() {
    const { _id } = this.props.userinfo

    const { comments } = this.props

    const { getMoreLoading } = this.state

    const { deleteComment, thumbComment, replyTo, getMore } = this

    const extra = (Comm: Comment, fId: string | undefined) => {
      const extra = [
        <span
          className={`thumb ${Comm.like_status ? 'isThumb' : null}`}
          onClick={() => thumbComment(Comm, fId, Comm.like_status)}
        >
          <i className="iconfont iconthumbs-up"></i>
          <span className="num">{Comm.like_number}</span>
        </span>,
        <span className="reply" onClick={() => replyTo(Comm, fId)}>
          <i className="iconfont iconcomment"></i>
          {/* <span className="num">{Comm.commNum}</span> */}
        </span>,
      ]

      let del = (
        <Popconfirm
          title="是否要删除此条留言?"
          okText="确定"
          onConfirm={() => deleteComment(fId, Comm._id)}
          cancelText="取消"
        >
          <span className="del">
            <i className="iconfont iconshanchu"></i>
          </span>
        </Popconfirm>
      )

      // 如果登录用户 === 当前评论用户 则开启删除功能
      Comm.userinfo._id === _id ? extra.push(del) : null

      return extra
    }

    // 加载更多
    const loadMore = (
      <div
        className="more"
        data-aos="fade-up"
        data-aos-duration={850}
        data-aos-easing="ease-in-out-back"
        style={{
          padding: '20px 0',
          textAlign: 'center',
        }}
      >
        <Button onClick={getMore} loading={getMoreLoading}>
          更多留言
        </Button>
      </div>
    )

    // 评论摸版
    const comment = (
      Comm: Comment,
      fId: string | undefined,
      chilComm?: Array<ChildComm> | undefined
    ) => {
      const { userinfo, content, createdAt } = Comm

      const { nickname, weburl, avatar } = userinfo

      // 评论时间
      const date = createdAt ? dayjs(createdAt).fromNow() : 'unknow'

      const DateTime = (
        <Tooltip title={`评论时间 ${date}`}>
          <span>{date}</span>
        </Tooltip>
      )

      // 用户头像
      const UserAvatar = !weburl ? (
        <Avatar src={avatar} style={{ cursor: 'default' }}>
          {nickname?.substr(0, 1).toUpperCase()}
        </Avatar>
      ) : (
        <a
          href={weburl}
          title={weburl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Avatar src={avatar} style={{ cursor: 'default' }}>
            {nickname?.substr(0, 1).toUpperCase()}
          </Avatar>
        </a>
      )

      // 评论内容
      const Content = (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content as any }}
        ></div>
      )

      return (
        <AntComment
          data-aos="fade-up"
          data-aos-duration="850"
          key={Comm._id}
          author={nickname}
          avatar={UserAvatar}
          actions={extra(Comm, fId)}
          content={Content}
          datetime={DateTime}
        >
          {chilComm
            ? chilComm.map((_Comm, _index) => comment(_Comm, fId))
            : null}
        </AntComment>
      )
    }

    // 遍历评论列表
    const mapComments = (Comm: Comment, index: number) => {
      return (
        <List.Item
          key={Comm._id}
          data-aos="fade-up"
          data-aos-delay={index * 10}
          data-aos-duration={850}
        >
          <small>{comments.length - index}楼</small>
          {comment(Comm, Comm._id, Comm.children)}
        </List.Item>
      )
    }

    const none = [
      <List.Item
        key={1}
        data-aos="fade-up"
        data-aos-delay={1 * 10}
        data-aos-duration={850}
      >
        <Skeleton avatar title active />
      </List.Item>,
      <List.Item
        key={2}
        data-aos="fade-up"
        data-aos-delay={2 * 10}
        data-aos-duration={850}
      >
        <Skeleton avatar title active />
      </List.Item>,
      <List.Item
        key={3}
        data-aos="fade-up"
        data-aos-delay={3 * 10}
        data-aos-duration={850}
      >
        <Skeleton avatar title active />
      </List.Item>,
    ]

    const CommentLists = comments ? (
      <List
        className="comment-list"
        itemLayout="horizontal"
        size="small"
        split
        loadMore={loadMore}
        dataSource={comments}
        renderItem={mapComments}
      />
    ) : (
      none
    )

    return (
      <section
        className="comments"
        data-aos="fade-up"
        data-aos-delay={2 * 10}
        data-aos-duration={850}
      >
        {CommentLists}
      </section>
    )
  }
}
