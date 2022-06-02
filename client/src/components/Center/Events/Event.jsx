import React from 'react'
import styles from './Event.module.css'
// for every even number id change style
const Event = ({event, id}) => {
  return (
    <div className={styles.PostContainer}>
      <img src={event.event_thumnail} alt="eventimg" />
      <div className={styles.infoContainer}>
        <div>{event.event_date}</div>
        <div>{event.event_name}</div>
        <div>{event.event_location}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSave}>Save</button>
          <button className={styles.buttonAttend}>Attend</button>
        </div>
      </div>
    </div>

  )
}

export default Event