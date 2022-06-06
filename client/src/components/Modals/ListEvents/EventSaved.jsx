import React from 'react'
import styles from './EventSaved.module.css'

const EventSaved = ({e}) => {
  return (
    <div className={styles.eventSavedContainer}>
      <div>{e.event_name}</div>
      <div>{e.event_date}</div>
      <div>{e.event_location}</div>
      <div>
        <a href={e.event_link}>
          <button>
          EVENT LINK
          </button>
        </a>
      </div>
      
    </div>

  )
}

export default EventSaved