import React, { PureComponent } from 'react'

import './detail.scss'

interface Props {}

interface State {}

import { getArtDetail } from '../../../api/Article'
import dayjs from 'dayjs'

// import art from './data.json'

export default class Detail extends PureComponent<Props, State> {
  state = {
    art: {},
  }

  componentDidMount() {
    let id = (this.props as any).match.params.id
    getArtDetail(id).then((art) => {
      art.createdTime = dayjs(art.createdAt).format('YYYY-MM-DD HH:mm')
      this.setState({
        art: { ...art },
      })
    })
  }

  render() {
    const art: any = this.state.art
    return (
      <article className="art-body">
        <div className="art-head">
          <div className="cover">
            <img src={art.cover} alt="" />
          </div>
          <div className="postz_pic">
            <div className="postz_pic_basic">
              <h1 className="postz_name">{art.title}</h1>
              <div className="postz_pic_info">
                <span>{/* <a href="#">{art.classify.labal}</a> */}</span>
                <i className="text-primary">•</i>
                <time dateTime={art.createdTime}>{art.createdAt}</time>
                <i className="iconfont iconxiegang"></i>
              </div>
            </div>
          </div>
        </div>
        <div
          className="art_content"
          dangerouslySetInnerHTML={{ __html: art.html }}
        ></div>
        <div className="art-foot">
          <div className="post_tags">
            <a href="#">随笔</a>
            <a href="#">生活</a>
            <a href="#">喜欢</a>
            <a href="#">闲谈</a>
          </div>
        </div>
      </article>
    )
  }
}
