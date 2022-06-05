import React, { useState, useEffect, useContext } from 'react'
import styles from './Event.module.css'
import { EventContext } from '../../../App';
import EventModal from '../../Modals/EventModal';

const Event = ({event, id, addModalEvent}) => {

  const [shiftRight, setShiftRight] = useState("");
  const {setEventModal, eventModal} = useContext(EventContext);
  const [saveEvent, setSaveEvent] = useState(false)
  const [attendEvent, setAttendEvent] = useState(false)


  

  useEffect(()=>{
    if(parseInt(id) % 2 === 0) {
      setShiftRight("Event_EventContainerR__xYmyk")
    }
  }, [])

  const handleSave= () => {
    setSaveEvent(!saveEvent)
  }

  const handleAttend= () => {
    setAttendEvent(!attendEvent)
  }

  return (
    <>
    <div className={`${styles.EventContainer} ${shiftRight}`} 
    onClick={()=>{
      setEventModal(!eventModal);
      addModalEvent(event);
    }}
    // data-date={event.event_date}
    // data-name={event.event_name}
    // data-location={event.event_location}
    // data-img={event.event_thumbnail}
    // data-desc={event.event_description}
    // data-link={event.event_link}
    >
    <div className={styles.imageContainer}>
        <img src={event.event_thumbnail} alt="eventimg" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.date}>{event.event_date.toUpperCase()} PST</div>
        <div className={styles.name}>{event.event_name}</div>
        <div className={styles.location}>@ {event.event_location}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSave} onClick={handleSave}>{saveEvent ? "Saved" : "Save"}</button>
          <button className={styles.buttonAttend} onClick={handleAttend}>{attendEvent ? "Attending" : "Attend"}</button>
        </div>
      </div>
    </div>
    </>


  )
}

export default Event