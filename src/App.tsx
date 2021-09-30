import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './assets/styles/App.scss'
import './assets/styles/global.scss'

import Header from './component/Header'
import Footer from './component/Footer'
import View from './views/View'
import Aos from 'aos'
import 'aos/dist/aos.css'
import { GetUserAddress } from './api/User'

const App = () => {
  useEffect(() => {
    GetUserAddress().then((res) => {
      console.log(res)
    })
    Aos.init()
    const load = document.getElementById('load') as any
    load.style.animation = 'hide 1.5s ease-in-out 1.5s forwards'
    setTimeout(() => {
      load.remove()
    }, 5000)
  }, [])

  return (
    <div className="App">
      <Router>
        <Header />
        <View />
        <Footer />
      </Router>
    </div>
  )
}

export default App
