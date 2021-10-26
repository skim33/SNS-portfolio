import React, { useEffect, useRef } from 'react'

import HeaderOption from './HeaderOption'
import { unsubscriber } from '../messaging/Feed'
import { profileUnsubscribers } from '../userProfile/UserProfile'

import { auth } from '../firebase'
import { useDispatch, useSelector } from 'react-redux'
import { logout, selectEmail, selectProfileURL, selectDisplayName } from '../features/userSlice'
import { NavLink, useHistory } from 'react-router-dom'

import { Avatar } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount'
import BusinessCenterIcon  from '@material-ui/icons/BusinessCenter'
import ChatIcon  from '@material-ui/icons/Chat'
import NotificationsIcon  from '@material-ui/icons/Notifications'
import CodeIcon from '@material-ui/icons/Code';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import LogoutIcon from '@material-ui/icons/ExitToApp';

import './Header.css'

const Header = ({isToggled, toggleSidebar}) => {
  const dispatch = useDispatch();
  const userProfileURL = useSelector(selectProfileURL);
  const userEmail = useSelector(selectEmail);
  const userName = useSelector(selectDisplayName);
  const sidebarRef = useRef(null);
  const history = useHistory();

  const logoutOfApp = () => {
    unsubscriber.forEach(unsubscribe => unsubscribe());
    profileUnsubscribers.forEach(unsubscribe => unsubscribe());
    auth.signOut().then(() => {
      dispatch((logout()))
    }).catch((err) => alert(err.message))
    history.push('/login');
  };

  useEffect(() => {
    if (isToggled) {
      sidebarRef.current.classList.add('active');
    } else {
      sidebarRef.current.classList.remove('active');
    }
  }, [isToggled]);

  return (
    <div className="sidebar" ref={sidebarRef} onMouseEnter={toggleSidebar} onMouseLeave={toggleSidebar}>
      <div className="logo_content">
        <div className="logo">
          <CodeIcon className="codeIcon"/>
          <div className="logo_name">Shawn Kim</div>
        </div>

        <MenuIcon className="btn"/>
      </div>
      <ul>
        <li style={{display: 'flex', alignItems: 'center'}}>
          <SearchIcon className="searchIcon"/>
          <input type="text" placeholder="Search..."/>
        </li>
        <li>
          <NavLink to="/home" className="nav">
            <HeaderOption Icon={HomeIcon} title="Home" isToggled={isToggled}/>
          </NavLink>

          <span className="tooltip">Home</span>
        </li>

        <li>
          <NavLink to="/portfolio" className="nav">
            <HeaderOption Icon={BusinessCenterIcon} title="Portfolio" isToggled={isToggled}/>
          </NavLink>

          <span className="tooltip">Portfolio</span>
        </li>

        <li>
          <NavLink to="/profile" className="nav">
            <HeaderOption Icon={SupervisorAccountIcon} title="Profile" isToggled={isToggled}/>
          </NavLink>

          <span className="tooltip">Profile</span>
        </li>

        <li>
          <NavLink to="/messaging" className="nav">
            <HeaderOption Icon={ChatIcon} title="Forum" isToggled={isToggled}/>
          </NavLink>

          <span className="tooltip">Forum</span>
        </li>

        <li>
          <HeaderOption Icon={NotificationsIcon} title="Notifications" isToggled={isToggled}/>

          <span className="tooltip">Notifications</span>
        </li>

        <li>
          <HeaderOption Icon={SettingsIcon} title="Setting" isToggled={isToggled}/>

          <span className="tooltip">Setting</span>
        </li>
      </ul>
      <div className="profile_content">
        <div className="profile">
          <div className="profile_details">
            <Avatar className="headerOption__icon" src={userProfileURL} style={{marginLeft: '10px'}}>{userEmail[0]}</Avatar>
            <div className="name_email">
              <div className="name">{userName}</div>
              <div className="email">{userEmail}</div>
            </div>
          </div>

          <div className="logoutWrapper" onClick={logoutOfApp}>
            <span>Logout</span>
            <LogoutIcon className="log_out"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header
