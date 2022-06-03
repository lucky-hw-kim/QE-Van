import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.NavBarContainer}>
      <button>CREATE</button>
      <button>SAVED</button>
      <button>ATTENDING</button>
      <button className={styles.Logout}>LOGOUT</button>
    </div>
  )
}

export default NavBar