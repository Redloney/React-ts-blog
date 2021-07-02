import React from 'react'
import './Search.scss'

export const Search = () => {
  const handelClick = () => {}

  return (
    <div className="search">
      <form className="search-box">
        <input
          onClick={handelClick}
          spellCheck="false"
          type="text"
          // className={['input','asfa']}
        />
      </form>
      <button type="button" className="btn" name="button"></button>
    </div>
  )
}
