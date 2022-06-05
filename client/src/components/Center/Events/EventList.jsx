import React, {useContext, useEffect, useState} from 'react'
import { EventData } from '../../../Data/EventData'
import Event from './Event'
import styles from './EventList.module.css'
import { DateContext } from '../../Pages/Home/Home'
import { EventContext } from '../../../App';
import EventModal from '../../Modals/EventModal'


const EventList = ({search}) => {
  const [eventDetails, setEventDetails] = useState(null)

  const {value, onChange} = useContext(DateContext)

  const {setEventModal, eventModal} = useContext(EventContext);


  const date = value.toString().split(' ').slice(1, 4).join(" ");

  const addModalEvent = (e) =>{
    setEventDetails(e)
  }

  return (
    
    <div className={styles.EventListContainer}>
      { search ?
        EventData.map((e, id) => {
          if(e.event_name.toLowerCase().includes(search.toLowerCase())) {
            return <Event addModalEvent={addModalEvent} event={e} id={id} key={id} />
          } 
      })
      :
      value && EventData.map((e, id) => {
        let eventDate = e.event_date.toString().split(' ').slice(0, 3).join(" ")
        console.log(date)
        console.log(eventDate);
        if(date == eventDate) {
          return <Event addModalEvent={addModalEvent} event={e} id={id} key={id} />
        }
      })}
      {
        !value && EventData.map((e, id) => {
            return <Event addModalEvent={addModalEvent} event={e} id={id} key={id} />
        })
      }
      {
        eventModal ? <EventModal event={eventDetails} /> : ""
      }


     
    </div>
  )
}

export default EventList