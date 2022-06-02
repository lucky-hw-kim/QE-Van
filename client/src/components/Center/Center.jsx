import React from 'react'
import styles from './Center.module.css'
import EventList from './Events/EventList'
import SearchBar from './SearchBar/SearchBar'


const Center = () => {
  return (
    <div className={styles.CenterContainer}>
      <div className={styles.pinkbox}/>
      <div className={styles.SearchBar}>
        <SearchBar  />
        <EventList />
      </div>
      <div className={styles.greenbox}/>
    </div>
  )
}

export default Center