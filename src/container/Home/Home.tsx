import React, { useEffect } from 'react'
import './Home.scss'

import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { increment, decrement } from '../../store/actions'

import { StoreState } from '../../types'

export interface IProps {
  value: { count: number }
  onIncrement: () => void
  onDecrement: () => void
}

import { Button } from 'antd'

const Home = (props: IProps) => {
  useEffect(() => {
    console.log(props)
  }, [])

  const { onDecrement, onIncrement, value } = props

  return (
    <div className="Home">
      <Button> {value.count} </Button>
      <Button onClick={onIncrement}> 加 </Button>
      <Button onClick={onDecrement}> 减 </Button>
    </div>
  )
}

// 将 reducer 中的状态插入到组件的 props 中
// 下面是单个reducer的时候，多个的时候需要选传入哪个reducer
// const { test, count } = state

const mapStateToProps = (state: StoreState): { value: number } => ({
  value: state,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onIncrement: () => dispatch(increment()),
  onDecrement: () => dispatch(decrement()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
