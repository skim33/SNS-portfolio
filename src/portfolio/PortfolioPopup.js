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

              <div className="test_container">
                <div className="test_text">{details.test_text}</div>

                <div className="test">
                  { details.test.map((info, ind) => (
                    <div className="test_info" key={ind}>{info}</div>
                  ))}
                </div>
              </div>
            </>
          )}

          { details.skills && (
            <>
              <h3>Skills</h3>
              <ul>
                <div>
                  {details.skills.frontend && <li className="skill"><span>Frontend: </span>{details.skills.frontend}</li>}
                  {details.skills.backend && <li className="skill"><span>Backend: </span>{details.skills.backend}</li>}
                  {details.skills.framework && <li className="skill"><span>Framework: </span>{details.skills.framework}</li>}
                  {details.skills.library && <li className="skill"><span>Library: </span>{details.skills.library}</li>}
                  {details.skills.utility && <li className="skill"><span>Utility: </span>{details.skills.utility}</li>}
                  {details.skills.platform && <li className="skill"><span>Platform: </span>{details.skills.platform}</li>}
                  {details.skills.host && <li className="skill"><span>Host: </span>{details.skills.host}</li>}
                </div>
              </ul>
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








