import React from 'react'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'

import './MessagingIndex.css'

const MessagingIndex = ({ isToggled }) => {
  return (
    <div className={`messageIndex__body ${isToggled && 'toggled'}`}>
      <Sidebar />
      <Feed />
      <Widgets />
    </div>
  )
}

export default MessagingIndex
