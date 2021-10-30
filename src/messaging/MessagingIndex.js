import React from 'react'

import Sidebar from './Sidebar'
import Feed from './Feed'
import Widgets from './Widgets'

import './MessagingIndex.css'

const MessagingIndex = ({ isToggled }) => {
  return (
    <div className={`messageIndex__wrapper ${isToggled && 'toggled'}`}>
      <div className='messageIndex__body'>
        <Sidebar />
        <Feed />
        <Widgets />
      </div>
    </div>
    
  )
}

export default MessagingIndex
