import React, { useState } from 'react'
import ReactDom from "react-dom";
import styles from './SavedEvent.module.css'
import { EventData } from '../../Data/EventData';
import {UserData} from '../../Data/UserData';
import EventSaved from './ListEvents/EventSaved';

const SavedEvent = ({savedEventModal, setSavedEventModal}) => {

  const userId = window.localStorage.getItem('userId');

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 120, 0.7)",
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
  };

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="container">
      <div className={styles.sub_eventsContainer}>
      <button className="closeButton" onClick={() => setSavedEventModal(false)}>X</button>
        <div className={styles.savedEventContainer}>
         <div className={styles.title}>
           SAVED EVENTS
         </div>
         <div className={styles.eventList}>
           {EventData.map(e => {
             if(UserData[0].saved_events.includes(e.id)){
            return <EventSaved e={e} key={e.id}/>
             }
           })}
          
         </div>
        </div>
        <div className={styles.attendingEventContainer}>
          <div className={styles.title}>
            ATTENDING EVENTS
          </div>
          <div className={styles.eventList}>
          {EventData.map(e => {
             if(UserData[0].attending_events.includes(e.id)){
            return <EventSaved e={e}/>
             }
           })}
          </div>
        </div>
      </div>
      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default SavedEvent