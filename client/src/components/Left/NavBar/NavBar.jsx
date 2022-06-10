import React, {useState, useContext} from 'react'
import CreateEventModal from '../../Modals/CreateEventModal'
import styles from './NavBar.module.css'
import SavedEvent from '../../Modals/SavedEvent'
import { NavLink } from 'react-router-dom'
import AuthContext from '../../../Context/AuthProvider'

const NavBar = ({logout}) => {
  const ctx = useContext(AuthContext);
  const [createEventModal, setCreateEventModal] = useState(false)
  const [savedEventModal, setSavedEventModal] = useState(false)
  return (
    <>
      <div className={styles.NavBarContainer}>
        <button>PROFILE</button>
        <button onClick={()=>{setCreateEventModal(true)}}>CREATE</button>
        <button onClick={()=>{setSavedEventModal(true)}}>EVENTS</button>
        <button className={styles.Logout} onClick={()=>{ctx.onLogout()}}>
        <NavLink to='/'>LOGOUT</NavLink>
        </button>
      </div>
      {
        createEventModal && <CreateEventModal createEventModal ={createEventModal} setCreateEventModal={setCreateEventModal}/>
      }
      {
        savedEventModal && <SavedEvent savedEventModal ={savedEventModal} setSavedEventModal={setSavedEventModal}/>
      }
    </>
  )
}

export default NavBar