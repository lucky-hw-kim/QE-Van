import React from 'react'
import styles from './Profile.module.css'

const Profile = () => {
  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.imageFrame}/>
      <div className={styles.textFrame}>
        <span>She | Her | They</span>
      </div>
    </div>
  )
}

export default Profile