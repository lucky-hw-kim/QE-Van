import React from 'react'
import styles from './EventSaved.module.css'

const EventSaved = ({e}) => {

  const eventDate = new Date(e.event_date).toString().split(" ").splice(0,3).join(" ").toUpperCase() 
  const eventTime = new Date(e.event_date).toString().split(" ").splice(4,1)[0].split(":").splice(0,2).join(":")+ " PST"

  console.log("event", e);

  return (
    <div className={styles.eventSavedContainer}>
      <div>{e.event_title}</div>
      <div>{eventDate} {eventTime}</div>
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