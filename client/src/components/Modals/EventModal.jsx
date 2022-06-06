import React, {useContext} from 'react'
import { EventContext } from '../../App'
import ReactDom from 'react-dom';
import './EventModal.css'
const EventModal = ({event}) => {

  const {setEventModal, eventModal} = useContext(EventContext)

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(100, 100, 120, 0.7)',
    zIndex: 9999,
    width: '100vw',
    height: '100vh',
  }

  return ReactDom.createPortal(

    <div style={OVERLAY_STYLES}>

      <div className="EventModalContainer">
          <button className='closeButton' onClick={() => setEventModal(false)}>X</button>
          <div className='sub_eventModalContainer'>
          <div className="title">
          {event.event_name}
          </div>
        <img src={event.event_thumbnail} alt="thumbnail" className="event_img" />
        <div className="event_info">
          <div className="description">
          {event.event_description}
          </div>
          <div className="date">
          Date: {event.event_date}
          </div>
          <div className="location">
          Location: @ {event.event_location}
          </div>
          <a className="link" href={event.event_link}>
            <button id="eventLink">
               EVENT LINK
            </button>
          </a>
        </div>
      </div>
      </div>
    </div>,
    document.getElementById('portal')
  )

}

export default EventModal