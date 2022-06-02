import React from 'react'
import styles from './NavBar.module.css'

const NavBar = () => {
  return (
    <div className={styles.NavBarContainer}>
      <button>CREATE</button>
      <button>SAVED</button>
      <button>ATTENDING</button>
      <div className={styles.Logout}>LOGOUT</div>
    </div>
  )
}

export default NavBar