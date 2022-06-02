import React from 'react'
import styles from './Left.module.css'
import NavBar from './NavBar/NavBar'


const Left = () => {
  return (
    <div className={styles.LeftContainer}>
      <NavBar />
    </div>
  )
}

export default Left