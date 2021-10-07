import React from "react"
import "./Header.css"
import SearchIcon from "@material-ui/icons/Search";
import HeaderOption from "./HeaderOption"
import HomeIcon from "@material-ui/icons/Home"
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount"
import BusinessCenterIcon  from "@material-ui/icons/BusinessCenter"
import ChatIcon  from "@material-ui/icons/Chat"
import NotificationsIcon  from "@material-ui/icons/Notifications"
import { useDispatch } from "react-redux"
import { logout } from "../features/userSlice"
import { auth } from '../firebase';
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png"
import { unsubscriber } from '../messaging/Feed'

function Header() {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
    unsubscriber.forEach(unsubscribe => unsubscribe());
    auth.signOut().then(() => {
      dispatch((logout()))
    }).catch((err) => alert(err.message))
  };

  return (
    <nav className="header">
      <div className="header__left">
        <img src={logo} alt="logo"/>
        
        <div className="header__search">
          <SearchIcon />
          <input placeholder="Search" type="text" />
        </div>
      </div>

      <div className="header__right">
        <ul>
          <li><NavLink to="/" exact><HeaderOption Icon={HomeIcon} title="Home" /></NavLink></li>
          <li><NavLink to="/profile"><HeaderOption Icon={SupervisorAccountIcon} title="Profile" /></NavLink></li>
          <li><HeaderOption Icon={BusinessCenterIcon} title="Messaging" /></li>
          <li><NavLink to="/messaging"><HeaderOption Icon={ChatIcon} title="Forum" /></NavLink></li>
          <li><HeaderOption Icon={NotificationsIcon} title="Notifications" /></li>
          <li><HeaderOption avatar={true} title="me" onClick={logoutOfApp} /></li>
        </ul>
      </div>
    </nav>
  )
}

export default Header

