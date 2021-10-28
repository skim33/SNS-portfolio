import React, { useState, useEffect, useRef } from 'react'

import Home from './home/Home'
import Portfolio from './portfolio/Portfolio'
import UserProfile from './userProfile/UserProfile'
import MessagingIndex from './messaging/MessagingIndex'
import Header from './header/Header'
import Login from './login/Login'
import {
  BrowserRouter,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { selectDisplayName, selectEmail } from './features/userSlice'
import { auth } from './firebase'
import { login, logout } from './features/userSlice'

import { ThemeProvider } from '@material-ui/core/styles'
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles'

import './App.css'

function App() {
  const userEmail = useSelector(selectEmail);
  const userName = useSelector(selectDisplayName);
  const dispatch = useDispatch();
  const theme = unstable_createMuiStrictModeTheme();
  const [isToggled, setIsToggled] = useState(false);
  const introRef = useRef(null);
  const firstSpanRef = useRef(null);
  const secondSpanRef = useRef(null);

  useEffect(() => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged(userAuth => {
        unsubscribe();
        if (userAuth) {
          // user is logged in
          resolve(dispatch(login({
            email: userAuth.email,
            uid: userAuth.uid,
            displayName: userAuth.displayName,
            photoUrl: userAuth.photoURL
          })

        ))} else {
          // user is logged out
          resolve(dispatch(logout()));
        }
      }, reject);

      if (introRef.current !== null && firstSpanRef !== null && secondSpanRef !== null) {
        setTimeout(() => {
          setTimeout(() => {
            firstSpanRef.current.classList.add('active');
          }, 400);
  
          setTimeout(() => {
            secondSpanRef.current.classList.add('active');
          }, 800);
  
          setTimeout(() => {
            setTimeout(() => {
              firstSpanRef.current.classList.remove('active');
              firstSpanRef.current.classList.add('fade');
            }, 50);
  
            setTimeout(() => {
              secondSpanRef.current.classList.remove('active');
              secondSpanRef.current.classList.add('fade');
            }, 100);
          }, 2000);
  
          setTimeout(() => {
            introRef.current.style.top = '-100vh';
          }, 2300);
        })
      }
    });
  });

  const toggleSidebar = (e) => {
    e.preventDefault();
    setIsToggled(!isToggled);
  }

  return (
    <ThemeProvider theme = {theme}>
      <div className="app">

        {!userEmail && !userName ? (
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => <Redirect to="/login" />} />
              <Route path="/login" component={Login} />
            </Switch>
          </BrowserRouter>
        ) : (
          <>
            <div className="intro" ref={introRef}>
              <h1 className="text">

                <span className="subText" ref={firstSpanRef}>Welcome,</span>{' '}<span className="subText" ref={secondSpanRef}>{userName}</span>
              </h1>
            </div>

            <BrowserRouter>
              <Header isToggled={isToggled} toggleSidebar={toggleSidebar}/>
              <Route path="/home">
                <Home isToggled={isToggled}/>
              </Route>
              <Route path="/portfolio">
                <Portfolio isToggled={isToggled} />
              </Route>
              <Route path="/profile">
                <UserProfile isToggled={isToggled}/>
              </Route>
              <Route path="/messaging">
                <MessagingIndex isToggled={isToggled} />
              </Route>
            </BrowserRouter>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;