import React, {useState, createContext, useContext} from 'react'
import Center from '../../Center/Center'
import Left from '../../Left/Left'
import EventModal from '../../Modals/EventModal'
import Right from '../../Right/Right'
import styles from './Home.module.css'
import { EventContext } from '../../../App';

export const DateContext = createContext()

const Home = () => {

  const {setEventModal, eventModal} = useContext(EventContext)
  const [value, onChange] = useState("")
  const [eventDataset, setEventDataset] = useState("")

  return (
    <div className={styles.Home}>
      <DateContext.Provider value={{value, onChange, eventDataset, setEventDataset}} >
          <Left />
          <Center />
          <Right />
      </DateContext.Provider>
      {
        eventModal ? <EventModal/> : ""
      }
    </div>
  )
}

export default Home