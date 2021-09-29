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

function Header() {
  const dispatch = useDispatch();

  const logoutOfApp = () => {
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
        <NavLink to="/" exact><HeaderOption Icon={HomeIcon} title="Home" /></NavLink>
        <HeaderOption Icon={SupervisorAccountIcon} title="My Network" />
        <HeaderOption Icon={BusinessCenterIcon} title="Messaging" />
        <NavLink to="/messaging"><HeaderOption Icon={ChatIcon} title="Forum" /></NavLink>
        <HeaderOption Icon={NotificationsIcon} title="Notifications" />
        <HeaderOption avatar={true} title="me" onClick={logoutOfApp} />
      </div>
    </nav>
  )
}

export default Header

