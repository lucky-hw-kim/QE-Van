import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.NavBarContainer}>
      <div>CREATE</div>
      <div>SAVED</div>
      <div>ATTENDING</div>
      <div className={styles.Logout}>LOGOUT</div>
    </div>
  )
}

export default NavBar