import React from 'react'

import Popup from 'reactjs-popup'

import './PortfolioPopup.css'

const PortfolioPopUp = ({open, onClose, url, title}) => {
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

export default PortfolioPopUp








