import React, { useContext, useState } from "react";
import { EventContext } from "../../App";
import ReactDom from "react-dom";
import "./EventModal.css";
import axios from ".././api/axios";
import AuthContext from "../../Context/AuthProvider";
import UpdateEventModal from "./UpdateEventModal";


const EventModal = ({ event, onDelete, onUpdate }) => {
  const authCtx = useContext(AuthContext);
  const { setEventModal, eventModal } = useContext(EventContext);
  const [successMsg, setSuccessMsg] = useState("");
  const [updatedEvent, setUpdatedEvent] = useState("");
  const [edit, setEdit] = useState(false);

  const handleDeleteEvent = (e) => {
    e.preventDefault();
    axios
      .delete(`/event/${event._id}`, {
        headers: { authorization: "Bearer " + authCtx.token },
        data: { userId: authCtx.userId },
      })
      .then((res) => {
        res && setSuccessMsg("Event deleted successfully");
        onDelete(event._id);
      })
      .catch((error) => {
        setSuccessMsg("Error : " + error.message);
      });
  };

  const handleUpdateEvent = (e) => {
    setEdit(true);
    // e.preventDefault();

    //   axios.put(`/event/${event._id}`, {
    //     headers: { authorization: "Bearer " + authCtx.token },
    //     data:{userId: authCtx.userId}
    //   }).then((res)=>{
    //     res && setSuccessMsg("Event delted successfully")
    //     setUpdatedEvent(res.data)
    //     onUpdate(event._id, updatedEvent)
    //   })
    //  .catch ((error) => {
    //   setSuccessMsg("Error : " + error.message)
    // })
  };

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

  const eventDate = new Date(event.event_date)
    .toString()
    .split(" ")
    .splice(0, 3)
    .join(" ")
    .toUpperCase();
  const eventTime =
    new Date(event.event_date)
      .toString()
      .split(" ")
      .splice(4, 1)[0]
      .split(":")
      .splice(0, 2)
      .join(":") + " PST";

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
          {!edit ? (
      <div className="EventModalContainer">
        <button className="closeButton" onClick={() => setEventModal(false)}>
          X
        </button>
        <div className="sub_eventModalContainer">
            <>
              <div className="title">{event.event_name}</div>
              <img className="event_img" src={event.event_thumbnail ? process.env.REACT_APP_PUBLIC_FOLDER +'/'+ event.event_thumbnail : "https://placekitten.com/640/360"} alt="img" />
              <div className="event_info">
                <div className="description">{event.event_description}</div>
                <div className="date">
                  Date: {eventDate} {eventTime}
                </div>
                <div className="location">
                  Location: @ {event.event_location}
                </div>
                <a className="link" href={event.event_link}>
                  <button id="eventLink">EVENT LINK</button>
                </a>
                <div className="buttonContainer">
                  <button onClick={handleDeleteEvent}>Delete</button>
                  <button onClick={handleUpdateEvent}>Edit</button>
                </div>
              </div>
            </>
        </div>
      </div>
          ) : (
            <>
              <UpdateEventModal edit={edit} setEdit={setEdit} e={event} />
            </>
          )}
    </div>,
    document.getElementById("portal")
  );
};

export default EventModal;
