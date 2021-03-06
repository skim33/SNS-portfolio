import React, { useState } from 'react'

import firebase from 'firebase/app';
import { auth } from '../firebase'
import { useDispatch } from 'react-redux'
import { login } from '../features/userSlice'

import './Login.css'
import logo from '../assets/logo_login.png'
import logoTwo from '../assets/logo.png'

function Login() {
  const [isGuest, setIsGuest] = useState(true);
  const [isMember, setIsMember] = useState(true);
  const [email, setEmail] = useState("guest@guest.com");
  const [password, setPassword] = useState("123123");
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

  const register = (e) => {
    e.preventDefault();
    if (!name) {
      return setError("Please enter a full name!");
    }

    console.log(profilePic);

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
    <>
      {isGuest && (
        <div className="guestLogin">
          <span className="guestCloseBtn" onClick={() => {
            setIsGuest(!isGuest);
            setEmail("");
            setPassword("");
          }}>
              &times;
          </span>
          
          <img src={logoTwo} alt="logo"/>

          <div className="guest_text">
            <div>?????????????????? ???????????????!</div>
            <div>?????? ???????????? ?????? ????????????????????? React, Redux, Firebase??? ????????? SNS??? ??? ????????????????????? ???????????? ????????????.</div>
            <div>??? ?????? ?????????????????? ????????? ????????? ??? ???Portfolio?????? ?????? ??????????????????.</div>
          </div>

          <div className="guest_info">
            <div>Email: guest@guest.com</div>
            <div>Password: 123123</div>
          </div>

          <button type="button" className="button bouncy" onClick={(e) => {
            loginToApp(e);
          }}>
            Guest Login
          </button>

          <p>Already have an account?{" "}
            <span className="guestToUser" onClick={() => {
              setIsGuest(!isGuest);
              setEmail("");
              setPassword("");
            }}>
                Login
            </span>
          </p>
        </div>
      )}    

      <div className="login">
        <img src={logo} alt="logo"/>
        {error && <div className="alert" style={{display: alertBox}}><span className="closebtn" onClick={closeAlert}>&times;</span>{error}</div>}

        {isMember ? (
          <>
            <form onClick={loginToApp}>
              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"/>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
              <button type="submit">Log In</button>
            </form>

            <p>Not a member?{" "}
              <span className="login__register" onClick={() => {setIsMember(!isMember); setError(''); setLoginAttempt(false)}}>Register Now</span>
            </p>
          </>
        ):(
          <>
            <form onClick={register}>
              <input onChange={(e) => setName(e.target.value)} placeholder="Full name" type="text"/>
              <input onChange={(e) => setProfilePic(e.target.value)} placeholder="Profile Pic URL (optional)" type="text"/>
              <input onChange={(e) => setEmail(e.target.value)} placeholder="Email" type="email"/>
              <input onChange={(e) => setPassword(e.target.value)} placeholder="Password" type="password"/>
              <button type="submit">Sign Up</button>
            </form>

            <p>Have an account?{" "}
              <span className="login__register" onClick={() => {setIsMember(!isMember); setError(''); setLoginAttempt(false)}}>Login Now</span>
            </p>
          </>
        )}
      </div>
    </>
  )
}

export default Login
