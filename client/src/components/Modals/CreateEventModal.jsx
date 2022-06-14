import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import "./CreateEventModal.css";
import axios from "../api/axios";
import AuthContext from "../../Context/AuthProvider";
const CreateEventModal = ({ setCreateEventModal }) => {
  const authCtx = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [link, setLink] = useState("");

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

  const handleImageUpload = async (event) => {
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      setImage(img);
    }
  };

  const handleEventSubmit = async (e) => {
    e.preventDefault();

    //creates a new object with the current state values
    const newEvent = {
      userId: authCtx.userId,
      event_title: title,
      event_description: description,
      event_date: date,
      event_location: location,
      event_link: link,
    };
    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      newEvent.event_thumbnail = filename;

      try {
        const result = await axios.post("/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    handleSubmitForm(newEvent);
  };

  const handleSubmitForm = (newEvent) => {
    axios
      .post("/event", newEvent, {
        headers: {
          // 'Content-Type': "multipart/form-data",
          authorization: "Bearer " + authCtx.token,
        },
      })
      .then((result) => {
        console.log(result.data);
        setCreateEventModal(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="container">
        <button
          className="closeButton"
          onClick={() => setCreateEventModal(false)}
        >
          X
        </button>
        <div className="subContainer">
          <h2 className="containerHeader">Create An Event</h2>
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

            <button type="submit" className="saveButton">
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
