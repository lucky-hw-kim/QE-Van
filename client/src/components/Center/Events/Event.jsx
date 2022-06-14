import React, { useState, useEffect, useContext } from 'react'
import styles from './Event.module.css'
import { EventContext } from '../../../App';
import EventModal from '../../Modals/EventModal';
import axios from '../../api/axios';

const Event = ({event, id, addModalEvent, onFilter, onUpdate, onDelete}) => {
  const userId = window.localStorage.getItem('userId')
  const token = window.localStorage.getItem('token')


  useEffect(()=>{
    axios.get(`/event/${event._id}`, {
      headers: { authorization: "Bearer " + token }
    }).then((response) => {
      response.data.saved_userId.includes(userId) ? setSaveEvent(true) : setSaveEvent(false)
      response.data.attending_userId.includes(userId) ? setAttendEvent(true) : setAttendEvent(false)
      }).catch((error) => {console.log(error)});
  },[])


  const [shiftRight, setShiftRight] = useState("");
  const {setEventModal, eventModal} = useContext(EventContext);
  const [saveEvent, setSaveEvent] = useState(false)
  const [attendEvent, setAttendEvent] = useState(false)

  

  useEffect(()=>{
    if(parseInt(id) % 2 === 0) {
      setShiftRight("Event_EventContainerR__xYmyk")
    }
  }, [])



  const handleSave = (e) => {
    e.stopPropagation();
    e.preventDefault();

    axios.put(`/event/${event._id}/save`,  {userId},  {
      headers: { authorization: "Bearer " + token }
  
    }).then((response) => {
      console.log("event:!",response.data)
      if(response.data.saved_userId.includes(userId)) {
        setSaveEvent(!saveEvent)
      }else {
        setSaveEvent(!saveEvent)
      }
    }).catch((error) => {console.log(error)});

  }

  const handleAttend= (e) => {
    e.stopPropagation();
    e.preventDefault();
    axios.put(`/event/${event._id}/attend`,  {userId},  {
      headers: { authorization: "Bearer " + token }
  
    }).then((response) => {
      if(response.data.attending_userId.includes(userId)) {
        setAttendEvent(!attendEvent)
      } else {
        setAttendEvent(!attendEvent)
      }
    }).catch((error) => {console.log(error)});
   
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
        <img src={event.event_thumbnail ? process.env.REACT_APP_PUBLIC_FOLDER +'/'+ event.event_thumbnail : "https://placekitten.com/640/360"} alt="img" />
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