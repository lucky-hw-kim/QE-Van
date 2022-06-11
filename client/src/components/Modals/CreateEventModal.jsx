import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import "./CreateEventModal.css";
import axios from "../api/axios";
import AuthContext from "../../Context/AuthProvider";

const CreateEventModal = ({ createEventModal, setCreateEventModal }) => {
  const authCtx = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");
  const [link, setLink] = useState("");

  const handleSelect = async (value) => {};

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

  const handleImageUpload = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log(e.target.files);
  };

  const handleEventsubmit = async (e) => {
    e.preventDefault();

    //creates a new object with the current state values
    const formData = new FormData();
    formData.append("event_title", title);
    formData.append("event_description", description);
    formData.append("event_date", date);
    formData.append("event_location", location);
    formData.append("event_link", link);
    formData.append("userId", authCtx.userId);
    formData.append("event_thumbnail", image);
    console.log(formData);
    try {
      const response = await axios.post("/event", formData, {
        headers: {
          'content-type': "multipart/form-data",
          authorization: "Bearer " + authCtx.token,
        },
      });
      setCreateEventModal(false);
      console.log(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="createEventContainer">
        <div className="modalContainer">
          <button
            className="closeButtonE"
            onClick={() => setCreateEventModal(false)}
          >
            X
          </button>
          <h2 className="eventFormHeader">Create An Event</h2>
          <form
            className="editForm"
            onSubmit={handleEventsubmit}
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
            />
            {/* <img src={image} /> */}
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

            <button type="submit" className="saveButton2">
              SAVE
            </button>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default CreateEventModal;
