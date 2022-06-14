import React, { useState } from 'react'
import styles from './Left.module.css'
import NavBar from './NavBar/NavBar'
import Profile from './Profile/Profile'


const Left = ({logout}) => {
  const [profileModal, setProfileModal] = useState(false)

  return (
    <div className={styles.LeftContainer}>
      <h1 className={styles.Logo}>QE-Van</h1>
      <Profile profileModal={profileModal} setProfileModal={setProfileModal}/>
      <NavBar logout={logout} profileModal={profileModal} setProfileModal={setProfileModal}/>
    </div>
  )
}

export default Left