import React, {useState} from 'react'
import styles from './Center.module.css'
import EventList from './Events/EventList'
import SearchBar from './SearchBar/SearchBar'


const Center = () => {
  const [search, setSearch] = useState("")

  return (

      <div className={styles.CenterContainer}>
        <div className={styles.pinkbox}/>
        <div className={styles.SearchBar}>
          <SearchBar search={search} setSearch={setSearch}  />
          <EventList search={search} />
        </div>
        <div className={styles.redbox}/>
      </div>

  )
}

export default Center