import React, { useState, useEffect, useContext } from 'react'
import styles from './Event.module.css'
import { EventContext } from '../../../App';
import { DateContext } from '../../Pages/Home/Home';


const Event = ({event, id}) => {

  const [shiftRight, setShiftRight] = useState("");
  const {setEventModal, eventModal} = useContext(EventContext);
  const {eventDataset, setEventDataset} = useContext(DateContext);

  useEffect(()=>{
    if(parseInt(id) % 2 === 0) {
      setShiftRight("Event_EventContainerR__xYmyk")
    }
  }, [])

  useEffect(()=>{

  },)


  return (
    <>
    <div className={`${styles.EventContainer} ${shiftRight}`} 
    onClick={(event)=>{
      setEventModal(!eventModal);
      setEventDataset(event.target.dataset);
      console.log(eventDataset)

    }}
    data-date={event.event_date}
    data-name={event.event_name}
    data-location={event.event_location}
    data-img={event.event_thumbnail}
    data-desc={event.event_description}
    data-link={event.event_link}
    >
    <div className={styles.imageContainer}>
        <img src={event.event_thumbnail} alt="eventimg" />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.date}>{event.event_date.toUpperCase()} PST</div>
        <div className={styles.name}>{event.event_name}</div>
        <div className={styles.location}>@ {event.event_location}</div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonSave}>Save</button>
          <button className={styles.buttonAttend}>Attend</button>
        </div>
      </div>
    </div>
    
    </>


  )
}

export default Event