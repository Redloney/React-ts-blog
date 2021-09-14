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
      art.createdAt = dayjs(art.createdAt).format('YYYY-MM-DD HH:mm')
      this.setState({
        art: { ...art },
      })
    })
  }

  render() {
    const art: any = this.state.art
    return (
      <article className="art_detail font">
        <h1 className="title font">{art.title}</h1>
        <h2 className="date font">{art.createdAt}</h2>
        <div
          className="art_content font"
          dangerouslySetInnerHTML={{ __html: art.html }}
        ></div>
      </article>
    )
  }
}
