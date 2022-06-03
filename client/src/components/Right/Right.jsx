import React from 'react'
import DatePicker from './Calendar/DatePicker'
import ForumList from './Forum/ForumList'
import styles from './Right.module.css'


const Right = () => {
  return (
    <div className={styles.RightContainer}>
      <DatePicker />
      <ForumList />
    </div>
  )
}

export default Right