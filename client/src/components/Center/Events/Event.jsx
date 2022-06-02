import React, { useState, useEffect } from 'react'
import styles from './Event.module.css'
// for every even number id change style

const Event = ({event, id}) => {

  const [shiftRight, setShiftRight] = useState("");

  useEffect(()=>{
    if(parseInt(id) % 2 === 0) {
      setShiftRight("Event_EventContainerR__xYmyk")
    }
  }, [])


  return (
    <div className={`${styles.EventContainer} ${shiftRight}`}>
      <div className={styles.imageContainer}>
        <img src={event.event_thumbnail} alt="eventimg" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.date}>{event.event_date}</div>
        <div className={styles.name}>{event.event_name}</div>
        <div className={styles.location}>@ {event.event_location}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSave}>Save</button>
          <button className={styles.buttonAttend}>Attend</button>
        </div>
      </div>
    </div>

  )
}

export default Event