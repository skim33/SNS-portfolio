import React, { useEffect } from "react";
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import { unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Header from "./header/Header"
import Login from "./login/Login"
import { useDispatch, useSelector } from "react-redux"
import { selectEmail } from "./features/userSlice"
import { auth } from "./firebase"
import { login, logout } from "./features/userSlice"
import Home from "./home/Home"
import UserProfile from './userProfile/UserProfile';
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom"
import MessagingIndex from "./messaging/MessagingIndex"

function App() {
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();
  const theme = unstable_createMuiStrictModeTheme();

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
  });

  return (
    <ThemeProvider theme = {theme}>
      <div className="app">

        {!userEmail ? (
          <Login />
        ) : (
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
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
