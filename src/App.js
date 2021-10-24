import React, { useEffect, createRef } from 'react'

import Home from './home/Home'
import UserProfile from './userProfile/UserProfile'
import MessagingIndex from './messaging/MessagingIndex'
import Header from './header/Header'
import Login from './login/Login'
import {
  BrowserRouter,
  Switch,
  Route
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
  const introRef = createRef(null);
  const subTextRefs = [];

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // user is logged in
        dispatch(login({
          email: userAuth.email,
          uid: userAuth.uid,
          displayName: userAuth.displayName,
          photoUrl: userAuth.photoURL
        }));
      } else {
        // user is logged out
        dispatch(logout());
      }
    });

    setTimeout(() => {
      subTextRefs.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add('active');
        }, (index + 1) * 400)
      });

      setTimeout(() => {
        subTextRefs.forEach((span, index) => {

          setTimeout(() => {
            span.classList.remove('active');
            span.classList.add('fade');
          }, (index + 1) * 50)
        })
      }, 2000);

      if (introRef.current) {
        setTimeout(() => {
          introRef.current.style.top = '-100vh';
        }, 2300);
      }
    })
  });

  return (
    <ThemeProvider theme = {theme}>
      <div className="app">
        {!userEmail && !userName ? (
          <Login />
        ) : (
          <>
            <div className="intro" ref={introRef}>
              <h1 className="text">

                <span className="subText" ref={el => el && subTextRefs.push(el)}>Welcome,</span>{' '}<span className="subText" ref={el => el && subTextRefs.push(el)}>{userName}</span>
              </h1>
            </div>

            <BrowserRouter>
              <Header />
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>

                <Route path="/profile">
                  <UserProfile />
                </Route>

                <Route path="/messaging">
                  <MessagingIndex />
                </Route>
              </Switch>
            </BrowserRouter>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
