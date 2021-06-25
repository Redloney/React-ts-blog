import React, { useEffect } from 'react'
import './Home.scss'
export interface Props {}

const Home = (props: Props) => {
  useEffect(() => {
    console.log(props)
  }, [])

  return <div className="Home"></div>
}

export default Home
