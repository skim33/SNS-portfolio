import React from 'react'
import Popup from 'reactjs-popup'
import "./HomePopUp.css"

const HomePopUp = ({open, onClose, url, title, ref}) => {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <div className="modal">
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <iframe title={title} src={url}></iframe>
      </div>
    </Popup>
  )
}

export default HomePopUp








