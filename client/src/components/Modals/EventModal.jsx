import React, { useContext, useState } from "react";
import { EventContext } from "../../App";
import ReactDom from "react-dom";
import "./EventModal.css";
import axios from ".././api/axios";
import AuthContext from "../../Context/AuthProvider";

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
        setEventModal(false)
      })
      .catch((error) => {
        setSuccessMsg("Error : " + error.message);
      });
  };

  const handleUpdateEvent = (e) => {
    setEdit(true);
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

      const [title, setTitle] = useState(event.event_title);
      const [description, setDescription] = useState(event.event_description);
      const [date, setDate] = useState(event.event_date);
      const [location, setLocation] = useState(event.event_location);
      const [image, setImage] = useState(event.event_thumbnail);
      const [link, setLink] = useState(event.event_link);
    
    
      const handleImageUpload = async(event) => {
        event.preventDefault();
        if(event.target.files && event.target.files[0]){
          let img = event.target.files[0];
          console.log(img);
          setImage(
            img
          );
        }
      };
    
      const handleEventSubmit = async (e) => {
        e.preventDefault();
    
        //creates a new object with the current state values
        const updatedEvent = {
          userId: authCtx.userId,
          event_title: title,
          event_description: description,
          event_date: date,
          event_location:location,
          event_link: link
        }
        if(image) {
          const data = new FormData();
          const filename = Date.now() + image.name
          data.append("name", filename);
          data.append("file", image);
          updatedEvent.event_thumbnail = filename;
          console.log(updatedEvent)
        
          try {
            const result = await axios.post("/upload", data)
          } catch(err) {
            console.log(err);
          }
        }
        handleSubmitForm(updatedEvent);
      };

      const handleSubmitForm = (updatedEvent) => {
        axios.put(`/event/${event._id}`, updatedEvent, {
           headers: {
             // 'Content-Type': "multipart/form-data",
             authorization: "Bearer " + authCtx.token,
           },
         }).then (result => {
           console.log(result.data)
           setEdit(false);
         }
         ).catch (err => { console.error(err);})
   }
    

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="container">
        <button className="closeButton" onClick={() => setEventModal(false)}>
          X
        </button>
        <div className="subContainer">
        {!edit ? (
          <>
          <h2 className="containerHeader">Upcoming Event</h2> 
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
            </>) :
            (<>
            <h2 className="containerHeader">Update An Event</h2> 
          <form
            className="containerForm"
            onSubmit={handleEventSubmit}
            encType="multipart/form-data"
          >
            <label for="event_title">Event Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              type="text"
              name="event_title"
            />
            <label for="event_description">Description</label>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              name="event_description"
            />
            <label for="event_location">Location:</label>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              name="event_location"
            />
            <label for="event_thumbnail">Upload Image:</label>
            <input
              className="image_input"
              type="file"
              onChange={handleImageUpload}
              name="event_thumbnail"
              accept="image/*"
            />
            <label for="event_link">Event Link:</label>
            <input
              type="text"
              name="event_link"
              value={link}
              onChange={(event) => setLink(event.target.value)}
            />
            <label for="event_date">Event Date:</label>
            <input
              type="datetime-local"
              name="event_date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />

            <button type="submit" className="saveButton3">
              SAVE
            </button>
          </form>
          </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default EventModal;
