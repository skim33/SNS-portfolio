import React from 'react'

import Popup from 'reactjs-popup'

import './PortfolioPopup.css'

const PortfolioPopUp = ({open, onClose, url, title, isToggled}) => {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <div className={`modal ${isToggled && 'toggled'}`}>
        <button className="close" onClick={onClose}>
          &times;
        </button>
        <iframe title={title} src={url} className={isToggled && 'toggled'}></iframe>
      </div>
    </Popup>
  )
}

export default PortfolioPopUp








