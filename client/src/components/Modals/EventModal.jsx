import React, {useContext} from 'react'
import { EventContext } from '../../App'
import { DateContext } from '../Pages/Home/Home'

const EventModal = () => {

  const {setEventModal, eventModal} = useContext(EventContext)
  const {eventDataset, setEventDataset} = useContext(DateContext);

  const MODAL_STYLES = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#FFF',
    zIndex: 1000,
    padding: '50px'
  }

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(100, 100, 120, 0.5)',
    zIndex: 9999,
    width: '100vw',
    height: '100vh',

  }

  return (

    <div style={OVERLAY_STYLES}>
      <div style={MODAL_STYLES} onClick={() => setEventModal(false)}
        className="EventModalContainer">
      I m Modal  </div>
    </div>
  )

}

export default EventModal