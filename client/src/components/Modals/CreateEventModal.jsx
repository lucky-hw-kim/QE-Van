
import React, { useState } from 'react'
import ReactDom from 'react-dom'
import './CreateEventModal.css'
import PlacesAutocomplete, {
  geocodeByAddress, getLatLng
} from "react-places-autocomplete"


const CreateEventModal = (
  {createEventModal, setCreateEventModal}) => {

  const [address, setAddress] =useState("");

  const handleSelect = async value => {}

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
  
  return ReactDom.createPortal (
    <div style={OVERLAY_STYLES}>
      <div className="createEventContainer">
        <div className="modalContainer">
      <button className='closeButtonTwo' onClick={() => setCreateEventModal(false)}>X</button>
          <form className="editForm">
            <label for="post_title" >
            Event Title
            </label>
            <input type="text" name="post_title" />
            <label for="post_description"  >
            Description
            </label>
            <textarea name="post_description"  />
            <label for="post_location" >
            Location:
            </label>
            <PlacesAutocomplete value={} onChange={} onSelect={}>
            <input type="text" name="post_location" />
            </PlacesAutocomplete>
            <label for="spotted_date" >
            Date Spotted:
            </label>
            <input type="date" name="spotted_date" />
            
            <button type='submit' className='saveButton'>SAVE
            </button>
          </form>
      </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default CreateEventModal