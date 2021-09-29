import React from "react"
import { useSelector } from "react-redux"
import "./Sidebar.css"
import { Avatar } from "@material-ui/core" 
import {  selectEmail, selectDisplayName, selectProfileURL } from "../features/userSlice"

function Sidebar() {

  const userEmail = useSelector(selectEmail);
  const userDisplayName = useSelector(selectDisplayName);
  const userProfileURL = useSelector(selectProfileURL);

  const recentItem = (topic) => (
    <div className="sidebar__recentItem">
      <span className="sidebar__hash">#</span>
      <p>{topic}</p>
    </div>
  )

  return (
    <div className="sidebar">
      <div className="sidebar__top">
        <img src="https://msp.c.yimg.jp/images/v2/FUTi93tXq405grZVGgDqGynoxP1q_b5NhHGjdQu2wKMAWo4mgYzF_KQDWQdqb9CQen9t1ik4vCiphF1inqr2S-8WLd3YWIuxko7l4Hn9GGnEq79IYIY_s_DDDmOhv2q1TZ9qVd4elXeMAc3DE3jvXIA2-uJllWOXgDD_setcNZIKcB_rcMO52gmQ5xhU80DOg2TUWon14TQrPwboFlQOaA==/wallpaper?errorImage=false" alt=""/>
        <Avatar src={userProfileURL} className="sidebar__avatar">{userEmail[0]}</Avatar>
        <h2>{userDisplayName}</h2>
        <h4>{userEmail}</h4>
      </div>

      <div className="sidebar__stats">
        <div className="sidebar__stat">
          <p>Who viewed you</p>
          <p className="sidebar__statNumber">2,543</p>
        </div>
        <div className="sidebar__stat">
          <p>Views on Post</p>
          <p className="sidebar__statNumber">2,413</p>
        </div>
      </div>

      <div className="sidebar__bottom">
        <p>Recent</p>
        {recentItem("reactjs")}
        {recentItem("programming")}
        {recentItem("softwareengineering")}
        {recentItem("design")}
        {recentItem("developer")}
      </div>
    </div>
  )
}

export default Sidebar
