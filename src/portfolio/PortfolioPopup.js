import React from 'react'

import Popup from 'reactjs-popup'

import './PortfolioPopup.css'

const PortfolioPopUp = ({open, onClose, url, title, details, isToggled}) => {
  return (
    <Popup open={open} closeOnDocumentClick onClose={onClose}>
      <button className="close" onClick={onClose}>
        Close
      </button>

      <div className={`modal ${isToggled && 'toggled'}`}>

        <iframe title={title} src={url}></iframe>
        
        <div className="detail_container">
          <h2>{details.name}</h2>

          <p>{details.text}</p>

          { details.test &&(
            <>
              <h3>Test</h3>

              { details.test.map((info, ind) => (
                  <div key={ind}>{info}</div>
                )) }
            </>
          )}

          { details.skills && (
            <>
              <h3>Skills</h3>
              {details.skills.frontend && <div>Frontend: <span>{details.skills.frontend}</span></div>}
              {details.skills.backend && <div>Backend: <span>{details.skills.backend}</span></div>}
              {details.skills.framework && <div>Framework: <span>{details.skills.framework}</span></div>}
              {details.skills.library && <div><span>Library: {details.skills.library}</span></div>}
              {details.skills.utility && <div><span>Utility: {details.skills.utility}</span></div>}
              {details.skills.platform && <div><span>Platform: {details.skills.platform}</span></div>}
              {details.skills.host && <div><span>Host: {details.skills.host}</span></div>}
            </>
          )}
          <h3>Domain</h3>
          <a href={details.domain} target="_blank" rel="noreferrer">{details.domain}</a>
          
          {details.github && (
            <>
              <h3>GitHub</h3>
              <a href={details.github} target="_blank" rel="noreferrer">{details.github}</a>
            </>
          )}
        </div>
      </div>
    </Popup>
  )
}

export default PortfolioPopUp








