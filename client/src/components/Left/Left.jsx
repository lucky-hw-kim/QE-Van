import React from 'react'
import styles from './Left.module.css'
import NavBar from './NavBar/NavBar'
import Profile from './Profile/Profile'

const Left = () => {
  return (
    <div className={styles.LeftContainer}>
      <h1 className={styles.Logo}>QE-Van</h1>
      <Profile />
      <NavBar />
    </div>
  )
}

export default Left