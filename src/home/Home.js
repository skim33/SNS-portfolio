import React from 'react'

import Particles from 'react-tsparticles'
import { params } from './Params.js'

import './Home.css'

const Home = ({isToggled}) => {
  return (
    <div className={`home_content ${isToggled && 'toggled'}`}>
      <Particles params={params} />

      <div className="home">
        <h1>Home Content</h1>
        <div>Hello world</div>
      </div>
    </div>
  )
}

export default Home
