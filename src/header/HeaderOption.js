import React from "react"
import "./HeaderOption.css"
import { Avatar } from '@material-ui/core'
import { useSelector } from "react-redux"
import { selectEmail, selectProfileURL } from "../features/userSlice"

function HeaderOption({ avatar, Icon, title, onClick }) {
  const userProfileURL = useSelector(selectProfileURL);
  const userEmail = useSelector(selectEmail);

  return (
    <div onClick={onClick} className="headerOption">
      {Icon && <Icon className="headerOption__icon" />}
      {avatar && <Avatar className="headerOption__icon" src={userProfileURL}>{userEmail[0]}</Avatar>}
      <h3 className="headerOption__title">{title}</h3>
    </div>
  )
}

export default HeaderOption
