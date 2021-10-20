import React, { useState } from 'react'

import firebase from 'firebase/app';
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

import './Login.css'
import logo from '../assets/logo_login.png'

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [error, setError] = useState("");
  const [alertBox, setAlertBox] = useState("");
  const [loginAttempt, setLoginAttempt] = useState(false);
  
  const dispatch = useDispatch();

  const loginToApp = (e) => {
    e.preventDefault();
    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    setError("");
    setAlertBox("");
    
    auth.signInWithEmailAndPassword(email, password).then(userAuth => {
      dispatch(login({
        email: userAuth.user.email,
        uid: userAuth.user.uid,
        displayName: userAuth.user.displayName,
        profileURL: userAuth.user.photoURL
      }));
    }).catch((err) => {loginAttempt && setError(err.message)});
    setLoginAttempt(true);
  };

  const register = () => {
    if (!name) {
      return setError("Please enter a full name!");
    }

    auth.setPersistence(firebase.auth.Auth.Persistence.SESSION);
    setError("");
    setAlertBox("");

    auth.createUserWithEmailAndPassword(email, password).then((userAuth => {
      userAuth.user.updateProfile({
        displayName: name,
        profileURL: profilePic
      }).then(() => {
        dispatch(login({
          email: userAuth.user.email,
          uid: userAuth.user.uid,
          displayName: name,
          profileURL: profilePic 
        }))
      })
    })).catch(err => {loginAttempt && setError(err.message)});
    setLoginAttempt(true);
  };

  const closeAlert = () => {
    setAlertBox('none')
  }  

  return (
    <div className="login">
      <img src={logo} alt="logo"/>
      {error && <div className="alert" style={{display: alertBox}}><span className="closebtn" onClick={closeAlert}>&times;</span>{error}</div>}
      <form onClick={loginToApp}>
        <input onChange={(e) => setName(e.target.value)} placeholder="Full name" type="text"/>
        <input onChange={(e) => setProfilePic(e.target.value)} placeholder="Profile Pic URL (optional)" type="text"/>
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"/>
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
        <button type="submit">Sign In</button>
      </form>

      <p>Not a member?{" "}
        <span className="login__register" onClick={register}>Register Now</span>
      </p>
    </div>
  )
}

export default Login
