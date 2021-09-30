import React, { PureComponent } from 'react'

import './detail.scss'

interface Props {}

interface State {}

import { getArtDetail, viewArt } from '../../../api/Article'
import dayjs from 'dayjs'

// import art from './data.json'

export default class Detail extends PureComponent<Props, State> {
  state = {
    art: {},
  }

  componentDidMount() {
    let id = (this.props as any).match.params.id
    getArtDetail(id).then((art) => {
      art.updatedTime = dayjs(art.updatedAt).format('YYYY年MM月DD日')
      this.setState({
        art: { ...art },
      })
    })
    viewArt(id)
  }

  render() {
    const art: any = this.state.art
    return (
      <article className="art-body" data-aos="fade-up" data-aos-duration="850">
        <div className="art-head">
          <div className="cover">
            <img src={art.cover} alt="" />
          </div>
          <div className="postz_pic">
            <div className="postz_pic_basic">
              <h1
                className="postz_name"
                data-aos="fade-up"
                data-aos-duration="850"
              >
                {art.title}
              </h1>
              <div
                className="postz_pic_info"
                data-aos="fade-up"
                data-aos-duration="850"
                data-aos-delay="100"
              >
                <span>
                  <a href="#">{art.author}</a>
                </span>
                <i className="text-primary">•</i>
                <time dateTime={art.updatedTime}>{art.updatedTime}</time>
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
          <h2 className="end">The End</h2>

          {/* <div className="post_tags">
            <a href="#">随笔</a>
            <a href="#">生活</a>
            <a href="#">喜欢</a>
            <a href="#">闲谈</a>
          </div> */}
        </div>
      </article>
    )
  }
}
