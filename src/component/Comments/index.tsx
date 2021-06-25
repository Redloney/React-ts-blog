import React, { PureComponent } from 'react'
import './Comments.scss'

import { List, Button, Skeleton } from 'antd'
import { GetComments } from '../../api/comm'
import { UserInfo } from '../../types'

interface Props {
  userinfo: UserInfo
}

interface State {}

export default class Comments extends PureComponent<Props, State> {
  componentDidMount() {
    // GetComments().then((ret) => {
    //   console.log(ret)
    // })
  }

  render() {
    // const { userinfo } = this.props

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

    const comment_lists = (
      <List
        className="comment-list"
        itemLayout="horizontal"
        size="small"
        split
        loadMore={loadMore}
        // dataSource={this.props.comments}
        // renderItem={mapComments}
      />
    )

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

    return (
      <section
        className="comments"
        data-aos="fade-up"
        data-aos-delay={2 * 10}
        data-aos-duration={850}
      >
        {none}
      </section>
    )
  }
}
