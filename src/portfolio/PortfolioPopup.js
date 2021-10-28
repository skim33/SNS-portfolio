import React from 'react'

import Popup from 'reactjs-popup'

import './PortfolioPopup.css'

const PortfolioPopUp = ({open, onClose, url, title, isToggled}) => {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <button className="close" onClick={onClose}>
        Close
      </button>

      <div className={`modal ${isToggled && 'toggled'}`}>

        <iframe title={title} src={url}></iframe>
        
        <div>
          <div>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
          <div>AAAAAAAAAAAAAAAA</div>
        </div>
      </div>
    </Popup>
  )
}

export default PortfolioPopUp








