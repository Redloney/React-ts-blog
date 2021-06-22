import React, { PureComponent } from 'react'

import './detail.scss'

interface Props { }

interface State { }


import art from './data.json'

export default class Detail extends PureComponent<Props, State> {

  render() {

    const getContent = () => {
      return { __html: art.content }
    }

    return (
      <article className='art_detail'>
        <div className="art_info">
          <h1>{art.title}</h1>
          <img src={art.pics[0]} className="art_pic" />
          <h3>{art.desc}</h3>
        </div>
        <div className="art_body" dangerouslySetInnerHTML={getContent()}></div>
        <div className="art_foot">
          点击数:213 | {art.createtime}
        </div>
      </article>
    )
  }
}
