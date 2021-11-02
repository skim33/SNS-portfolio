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
            <div>방문해주셔서 감사합니다!</div>
            <div>현재 진행중인 개인 프로젝트임으로 React, Redux, Firebase를 사용해 SNS형 웹 애플리케이션을 구축하고 있습니다.</div>
            <div>제 개인 포트폴리오는 게스트 로그인 후 「Portfolio」를 확인 부탁드립니다.</div>
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
    </>
  )
}

export default Login
