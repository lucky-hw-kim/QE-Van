import React, {useState} from 'react'
import CreateEventModal from '../../Modals/CreateEventModal'
import styles from './NavBar.module.css'

const NavBar = () => {
  const [createEventModal, setCreateEventModal] = useState(false)
  return (
    <>
      <div className={styles.NavBarContainer}>
        <button>PROFILE</button>
        <button onClick={()=>{setCreateEventModal(true)}}>CREATE</button>
        <button>EVENTS</button>
        <button className={styles.Logout}>LOGOUT</button>
      </div>
      {
        createEventModal && <CreateEventModal createEventModal ={createEventModal} setCreateEventModal={setCreateEventModal}/>
      }
    </>
  )
}

export default NavBar