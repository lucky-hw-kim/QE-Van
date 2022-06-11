import React, { useState, useEffect, useContext } from 'react'
import styles from './Event.module.css'
import { EventContext } from '../../../App';
import EventModal from '../../Modals/EventModal';

const Event = ({event, id, addModalEvent, onFilter, onUpdate, onDelete}) => {

  const [shiftRight, setShiftRight] = useState("");
  const {setEventModal, eventModal} = useContext(EventContext);
  const [saveEvent, setSaveEvent] = useState(false)
  const [attendEvent, setAttendEvent] = useState(false)


  useEffect(()=>{
    if(parseInt(id) % 2 === 0) {
      setShiftRight("Event_EventContainerR__xYmyk")
    }
  }, [])

  const handleSave= (e) => {
    e.stopPropagation();
    setSaveEvent(!saveEvent)
  }

  const handleAttend= (e) => {
    e.stopPropagation();
    setAttendEvent(!attendEvent)
  }

  const eventDate = new Date(event.event_date).toString().split(" ").splice(0,3).join(" ").toUpperCase() 
  const eventTime = new Date(event.event_date).toString().split(" ").splice(4,1)[0].split(":").splice(0,2).join(":")+ " PST"

  return (
    <>
    <div className={`${styles.EventContainer} ${shiftRight}`} 
    onClick={()=>{
      setEventModal(!eventModal);
      addModalEvent(event);
    }}
    >
    <div className={styles.imageContainer}>
        <img src={event.event_thumbnail} alt="img" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.date}>{eventDate} {eventTime}</div>
        <div className={styles.name}>{event.event_title}</div>
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