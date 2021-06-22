import React, { useEffect } from 'react'

import './Cv.scss'

const Cv = () => {
  useEffect(() => {
    console.log('Cv OnMounted')
  }, [])

  return <div className="Cv"></div>
}

export default Cv
