import React, { useEffect } from "react";
import "./App.css";
import Header from "./header/Header"
import Login from "./login/Login"
import { useDispatch, useSelector } from "react-redux"
import { selectEmail } from "./features/userSlice"
import { auth } from "./firebase"
import { login, logout } from "./features/userSlice"
import Home from "./home/Home"
import {
  BrowserRouter,
  Switch,
  Route
} from "react-router-dom"
import MessagingIndex from "./messaging/MessagingIndex"

function App() {
  const userEmail = useSelector(selectEmail);
  const dispatch = useDispatch();

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

            <Route path="/messaging">
              <MessagingIndex />
            </Route>
          </Switch>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
