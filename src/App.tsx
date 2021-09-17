import React, { useEffect } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

import './assets/styles/App.scss'
import './assets/styles/global.scss'

import Header from './component/Header'
import Footer from './component/Footer'
import View from './views/View'
import Aos from 'aos'
import 'aos/dist/aos.css'

const App = () => {
  useEffect(() => {
    Aos.init()
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
