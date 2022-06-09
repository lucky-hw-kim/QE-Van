import React, { useState } from "react";
import ReactDom from "react-dom";
import "./CreateEventModal.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import useAuth from '../../hooks/useAuth'
import axios from '../api/axios';

const CreateEventModal = ({ createEventModal, setCreateEventModal }) => {

  const {auth} = useAuth()
  console.log(auth.userId);

  const [address, setAddress] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState("");

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
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  }

  const handleEventubmit = async (e) => {
    e.preventDefault();

    //creates a new object with the current state values
    const body = {
      event_title: title,
      event_description: description,
      event_date: date,
      event_location: location,
      userId: auth.userId,
      event_thumbnail: image
    };
    try {
      const response = await axios.post("/event", body, {
        headers: {
          authorization: "Bearer " + auth.accessToken,
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
          <form className="editForm" onSubmnit={handleEventubmit} enctype="multipart/form-data">
            <label for="post_title">Event Title</label>
            <input value={title} onChange={(event) => setTitle(event.target.value)} type="text" name="createpost_title" />
            <label for="post_description">Description</label>
            <textarea value={description} onChange={(event) => setDescription(event.target.value)} name="post_description" />
            <label for="post_location">Location:</label>
            <PlacesAutocomplete
              value={address}
              onChange={setAddress}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="location-input">
                  <input
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                          })}
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
            <label for="event_thumbnail">Upload Image:</label>
            <input accept="image/*" className="image_input" type="file" onChange={handleImageUpload}
            placeholder="Click to upload ..." />
            {/* <img src={image} /> */}
            <label for="event_date">Event Date:</label>
            <input type="date" name="event_date" value={date} onChange={(event) => setDate(event.target.value)}  />

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
