import React from 'react'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'

import './MessagingIndex.css'

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
