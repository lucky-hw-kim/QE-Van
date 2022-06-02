import React from 'react'
import { EventData } from '../../../Data/EventData'
import Event from './Event'
import styles from './EventList.module.css'


const EventList = () => {
  return (
    <div className={styles.EventListContainer}>
      {EventData.map((e, id) => {
        return <Event event={e} id={id} />
      })}
    </div>
  )
}

export default EventList