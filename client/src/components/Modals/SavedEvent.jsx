import React from 'react'
import ReactDom from "react-dom";
import './SavedEvent.css'

const SavedEvent = () => {
  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 120, 0.7)",
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
  };

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="savedEventContainer">

      </div>
      <div className='attendingEventContainer'>

      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default SavedEvent