import React from 'react'

import './Home.css'

const Home = ({isToggled}) => {
  return (
    <div className={`home_content ${isToggled && 'toggled'}`}>
      <div className="home">Home Content</div>
    </div>
  )
}

export default Home
