import React from 'react'
import { auth } from "../firebase"
import "./UserProfile.css"

const UserProfile = () => {
  const user = auth.currentUser;

  if (user !== null) {
    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;
  }

  return (
    <div>
      {user.displayName}<br />
      {user.email}<br />
      {user.photoURL}<br />
      {user.emailVerified}<br />
      {user.uid}<br />
    </div>
  )
}

export default UserProfile
