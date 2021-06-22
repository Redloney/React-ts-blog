import React, { useEffect, useState } from 'react'
import './Home.scss'

import { Button } from 'antd'

const Home = () => {
  const [Count, setCount] = useState(0)

  const add = () => {
    setCount(Count + 1)
  }

  useEffect(() => {
    console.log('Count is Changed');
  }, [Count])

  useEffect(() => {
    console.log('Home OnMounted');
  }, [])

  return (
    <div className="Home">
      <h1>Home</h1>
      <Button onClick={add}>{Count} </Button>
    </div>
  )
}

export default Home