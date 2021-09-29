import React from 'react'
import "./MessagingIndex.css"
import Sidebar from "./Sidebar"
import Feed from "./Feed"
import Widgets from "./Widgets"

function MessagingIndex() {
  return (
    <div className="messageIndex__body">
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  )
}

export default MessagingIndex
