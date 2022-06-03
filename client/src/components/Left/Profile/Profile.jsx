import React from 'react'
import styles from './Profile.module.css'
import profile from '../../../assets/profile.png'

const Profile = () => {
  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.imageFrame}>
        <img src={profile} alt="profileimg" />
      </div>
      <div className={styles.textFrame}>
        <span>She | Her | Lucky</span>
      </div>
    </div>
  )
}

export default Profile