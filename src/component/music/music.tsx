import React, { PureComponent, RefObject } from 'react'

import './music.scss'

import svg from './music.svg'

export default class Music extends PureComponent {
  audio: RefObject<HTMLAudioElement> = React.createRef()

  state = {
    isPlay: false,
  }

  play = () => {
    const isPlay = this.audio.current?.paused
    if (!isPlay) {
      this.audio.current?.pause()
      this.setState({
        isPlay: isPlay,
      })
    } else {
      this.audio.current?.play()
      this.setState({
        isPlay: isPlay,
      })
    }
  }

  componentDidMount() {
    ;(this.audio.current as any).volume = 0.4

    this.audio.current?.play()

    this.setState({
      isPlay: !this.audio.current?.paused,
    })
  }

  render() {
    return (
      <div
        className={`player ${this.state.isPlay ? 'isPlay' : null}`}
        onClick={this.play}
      >
        <img className="img" src={svg} alt="music" />
        <audio
          className="audio"
          ref={this.audio}
          src="https://cdn.jsdelivr.net/gh/Redloney/CDN@1.1/static/sparks.mp3"
          controls
          autoPlay
          loop
        ></audio>
      </div>
    )
  }
}
