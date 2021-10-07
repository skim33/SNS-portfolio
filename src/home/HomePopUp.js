import React from 'react'
import Popup from 'reactjs-popup'
import "./HomePopUp.css"

const HomePopUp = ({open, onClose, url, title}) => {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <div className="modal">
        <a className="close" onClick={onClose}>
          &times;
        </a>
        <iframe title={title} src={url}></iframe>
      </div>
    </Popup>
  )
}

export default HomePopUp








