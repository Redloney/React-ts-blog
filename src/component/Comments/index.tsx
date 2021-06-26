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
} from 'antd'
import { Children, Comment, UserInfo } from '../../types'

import dayjs from '../../utils/day'

interface Props {
  userinfo: UserInfo
  comments: Array<Comment>
  replyTo: Function
  deleteComment: Function
}

interface State {}

export default class Comments extends PureComponent<Props, State> {
  //删除评论
  deleteComment = (fId: string | undefined, commId: string | undefined) => {
    this.props.deleteComment(fId, commId)
  }

  // 回复
  replyTo = (comm: Comment, _id: string | undefined) => {
    this.props.replyTo(comm, _id)
  }

  render() {
    const { _id } = this.props.userinfo

    const { comments } = this.props

    const { deleteComment } = this

    const extra = (Comm: Comment, fId: string | undefined) => {
      const extra = [
        <span className="reply" onClick={() => this.replyTo(Comm, _id)}>
          回复
        </span>,
      ]

      let del = (
        <Popconfirm
          title="是否要删除此条留言?"
          okText="确定"
          onConfirm={() => deleteComment(fId, Comm._id)}
          cancelText="取消"
        >
          <span className="del">删除</span>
        </Popconfirm>
      )

      // 如果登录用户 === 当前评论用户 则开发删除功能
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
        style={{ padding: '20px 0', textAlign: 'center' }}
      >
        <Button>更多留言</Button>
      </div>
    )

    const comment = (
      Comm: Comment,
      chilComm: Children | undefined,
      fId: string | undefined
    ) => {
      const { userinfo, content, createdAt } = Comm
      const { nickname, weburl, avatar } = userinfo

      const date = dayjs(createdAt).fromNow()

      const DateTime = (
        <Tooltip title={date}>
          <span>{date}</span>
        </Tooltip>
      )

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

      const Content = (
        <div
          className="content"
          dangerouslySetInnerHTML={{ __html: content as any }}
        ></div>
      )

      return (
        <AntComment
          key={Comm._id}
          author={nickname}
          avatar={UserAvatar}
          actions={extra(Comm, fId)}
          content={Content}
          datetime={DateTime}
        >
          {/* {
            chilComm ? chilComm.map((_Comm: Comment, _index: string) => {
              return comment(_Comm)
            })
          } */}
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
          {/* 传入 自己 自己的子评论 自己的id */}
          {comment(Comm, Comm.children, Comm._id)}
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
