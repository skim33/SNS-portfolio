import React from 'react'

import Particles from 'react-tsparticles'
import { params } from './Params.js'
import Typical from 'react-typical'
import { Animator, ScrollContainer, ScrollPage, batch, Fade, Move, MoveIn, MoveOut, Sticky } from "react-scroll-motion";
import Blink from 'react-blink-text'
import { NavLink } from 'react-router-dom'

import './Home.css'

const Home = ({ isToggled }) => {
  const FadeUp = batch(Fade(), Move(), Sticky());

  return (
    <div className={`home_wrapper ${isToggled && 'toggled'}`}>
      <Particles params={params} />

      <div className="home_content">
        <div className="home">
          <h1>Hi, I'm Woohyuk Kim(Shawn)</h1>

          <div className="describe">
            <span>I am a</span>
            <Typical
              steps={['developer', 1000, 'programmer', 1000]}
              loop={Infinity}
              wrapper="h2"
            />
          </div>

          <ScrollContainer>
            <ScrollPage page={0}>
              <Animator animation={batch(Fade(), Sticky(), MoveOut(0, -200))}>
                <span style={{ fontSize: "3em" }}>Thank you for taking the time to view my portfolio! 🙌</span>
                <div style={{marginTop: '2em', fontSize: '2em', textAlign: 'center'}}>
                  <Blink color='#fff' text='↓🖱↓' fontSize='10' />
                </div>
              </Animator>
            </ScrollPage>
            <ScrollPage page={1}>
              <Animator animation={FadeUp}>
                <span style={{ fontSize: "3em" }}>This is a full stack project I'm currently working on, where users can stay connected to each other:</span>
                <br /><br />
                <span style={{ fontSize: "2em" }}>- Built with React, Redux, and Firebase</span>
              </Animator>
            </ScrollPage>
            <ScrollPage page={2}>
              <div style={{display: 'flex', justifyContent: 'center', width: '80vw'}}>
                <span style={{ fontSize: "3em" }}>
                  <Animator animation={MoveIn(-1000, 0)}>- To share their profiles 🤳🏼</Animator>
                  <Animator animation={MoveIn(1000, 0)}>- To view their portfolios 💻</Animator>
                  <Animator animation={MoveOut(1000, 0)}>- To express what matters to them 🙆🏼‍♂️</Animator>
                  <br />
                  <Animator animation={MoveOut(-1000, 0)}>Just like a typical SNS!</Animator>
                </span>
              </div>
            </ScrollPage>
            <ScrollPage page={3}>
              <Animator animation={batch(Fade(), Sticky())}>
                <span style={{ fontSize: "3em" }}>Other than this,</span>
                <br />
                <span style={{ fontSize: "3em" }}>
                  a list of my personal projects is listed in 「Portfolio」 :
                </span>
                <div style={{marginTop: '3em', textAlign: 'center'}}>
                  <Blink color='#fff' text='↓Click↓' fontSize='1' />
                </div>

                <div　className="portfolio_btn" style={{textAlign: 'center'}}>
                  <NavLink to="/portfolio" style={{ textDecoration: 'none', color: '#fff', fontSize: '2em'}}>「Portfolio」</NavLink>
                </div>
              </Animator>
            </ScrollPage>
          </ScrollContainer>
        </div>
      </div>
    </div>
  )
}

export default Home
