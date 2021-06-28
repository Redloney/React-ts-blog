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
  getMore: Function
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
    console.log(_id)
    this.props.replyTo(comm, _id)
  }

  getMore = () => {
    this.props.getMore()
  }

  render() {
    const { _id } = this.props.userinfo

    const { comments } = this.props

    const { deleteComment, getMore } = this

    const extra = (Comm: Comment, fId: string | undefined) => {
      const extra = [
        // <span className="thumb">
        //   <svg
        //     t="1624705081851"
        //     class="icon"
        //     viewBox="0 0 1024 1024"
        //     version="1.1"
        //     xmlns="http://www.w3.org/2000/svg"
        //     p-id="2977"
        //     width="15"
        //     height="15"
        //   >
        //     <path
        //       d="M780.8 981.333333H170.666667a128 128 0 0 1-128-128v-298.666666a128 128 0 0 1 128-128h100.266666l159.573334-358.826667A42.666667 42.666667 0 0 1 469.333333 42.666667a170.666667 170.666667 0 0 1 170.666667 170.666666v128H859.306667a128 128 0 0 1 107.093333 145.92l-58.88 384A128 128 0 0 1 780.8 981.333333zM341.333333 896h438.613334a42.666667 42.666667 0 0 0 42.666666-36.266667l58.88-384a42.666667 42.666667 0 0 0-35.413333-49.066666H597.333333a42.666667 42.666667 0 0 1-42.666666-42.666667V213.333333a85.333333 85.333333 0 0 0-59.306667-81.493333L341.333333 478.293333z m-170.666666-384a42.666667 42.666667 0 0 0-42.666667 42.666667v298.666666a42.666667 42.666667 0 0 0 42.666667 42.666667h85.333333v-384z"
        //       p-id="2978"
        //       fill="#515151"
        //     ></path>
        //   </svg>
        // </span>,
        <span className="reply" onClick={() => this.replyTo(Comm, fId)}>
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
        <Button onClick={getMore}>更多留言</Button>
      </div>
    )

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
