import React from 'react'
import "./InputOption.css"

function InputOption({ Icon, title, color, likesNum, clickLikeBtn }) {
  return (
    <div className="inputOption" onClick={clickLikeBtn}>
      <Icon style={{ color: color }}/>
      <h4>{title}</h4>
      <h5>{(likesNum !== 0) && likesNum}</h5>
    </div>
  )
}

export default InputOption
