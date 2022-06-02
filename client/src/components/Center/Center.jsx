import React from 'react'
import styles from './Center.module.css'
import EventList from './Events/EventList'
import SearchBar from './SearchBar/SearchBar'


const Center = () => {
  return (
    <div className={styles.CenterContainer}>
      <SearchBar />
      <EventList />
    </div>
  )
}

export default Center