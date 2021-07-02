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
  comments: Array<Comment> | undefined
  replyTo: Function
  getMore: Function
  deleteComment: Function
  thumbComment: Function
}

interface State {
  isThumb: boolean
}

export default class Comments extends PureComponent<Props, State> {
  state = {
    isThumb: false,
  }

  //删除评论
  deleteComment = (fId: string | undefined, commId: string | undefined) => {
    this.props.deleteComment(fId, commId)
  }

  // 回复
  replyTo = (e: any, comm: Comment, _id: string | undefined) => {
    let screenY = document.documentElement.scrollTop
    this.props.replyTo(comm, _id, screenY)
  }

  thumbComment = (comm: Comment, _id: string | undefined) => {
    let isThumb = !this.state.isThumb
    this.props.thumbComment(comm, _id, isThumb)
  }

  getMore = () => {
    this.props.getMore()
  }

  render() {
    const { _id } = this.props.userinfo

    const { comments } = this.props

    const { deleteComment, thumbComment, replyTo, getMore } = this

    const extra = (Comm: Comment, fId: string | undefined) => {
      const extra = [
        <span
          className={`thumb ${this.state.isThumb ? 'isThumb' : null}`}
          onClick={() => thumbComment(Comm, fId)}
        >
          <i className="iconfont iconthumbs-up"></i>
          {/* <span className="num">
            {this.state.isThumb ? (Comm.thumbNum as any) + 1 : Comm.thumbNum}
          </span> */}
        </span>,
        <span className="reply" onClick={(e) => replyTo(e, Comm, fId)}>
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
        <Button onClick={getMore}>更多留言</Button>
      </div>
    )

    // 评论摸版 ---> 未来抽离
    const comment = (
      Comm: Comment,
      fId: string | undefined,
      chilComm?: Array<Children> | undefined
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
            ? chilComm.map((_Comm, _index) => {
                return comment(_Comm, fId)
              })
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
