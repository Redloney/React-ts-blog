import React, { PureComponent, RefObject } from 'react'

import './music.scss'

import svg from './music.svg'
import song from './陈壹千 - 说不定明天他就来了(吉他版).mp3'

export default class Music extends PureComponent {
  audio: RefObject<HTMLAudioElement> = React.createRef()

  state = {
    isPlay: false,
  }

  play = () => {
    if (this.state.isPlay) {
      this.audio.current?.pause()
      this.setState({
        isPlay: !this.state.isPlay,
      })
    } else {
      this.audio.current?.play()
      this.setState({
        isPlay: !this.state.isPlay,
      })
    }
  }

  componentDidMount() {
    ;(this.audio.current as any).volume = 0.3
    this.setState({
      isPlay: this.audio.current?.paused,
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
          src={song}
          controls
          autoPlay
          loop
        ></audio>
      </div>
    )
  }
}
