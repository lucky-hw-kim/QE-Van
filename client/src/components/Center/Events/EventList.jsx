import React, {useContext, useEffect, useState} from 'react'
import { EventData } from '../../../Data/EventData'
import Event from './Event'
import styles from './EventList.module.css'
import { DateContext } from '../../Pages/Home/Home'


const EventList = () => {
  const {value, onChange} = useContext(DateContext)

  const date = value.toString().split(' ').slice(1, 4).join(" ");

  return (
    
    <div className={styles.EventListContainer}>
      
      {value && EventData.map((e, id) => {
        let eventDate = e.event_date.toString().split(' ').slice(0, 3).join(" ")
        console.log(date)
        console.log(eventDate);
        if(date == eventDate) {
          return <Event event={e} id={id} />
        }
      })}
      {
        !value && EventData.map((e, id) => {
            return <Event event={e} id={id} />
        })
      }
    </div>
  )
}

export default EventList