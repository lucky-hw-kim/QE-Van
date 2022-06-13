import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import "./CreateEventModal.css";
import axios from "../api/axios";
import AuthContext from "../../Context/AuthProvider";
const UpdateEventModal = ({  setEdit, edit, e}) => {
  const authCtx = useContext(AuthContext);
  const [title, setTitle] = useState(e.event_title);
  const [description, setDescription] = useState(e.event_description);
  const [date, setDate] = useState(e.event_date);
  const [location, setLocation] = useState(e.event_location);
  const [image, setImage] = useState(e.event_thumbnail);
  const [link, setLink] = useState(e.event_link);

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
       axios.put(`/event/${e._id}`, updatedEvent, {
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
      <div className="createEventContainer">
        <div className="modalContainer">
          <button
            className="closeButtonE"
            onClick={() => setEdit(false)}
          >
            X
          </button>
          <h2 className="eventFormHeader">Update An Event</h2> 
          <form
            className="createEventForm"
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
            {/* <img src={URL.createObjectURL(image)} /> */}
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
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default UpdateEventModal;
