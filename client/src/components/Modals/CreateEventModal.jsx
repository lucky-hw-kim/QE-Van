import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
import "./CreateEventModal.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import axios from '../api/axios';
import AuthContext from "../../Context/AuthProvider";


const CreateEventModal = ({ createEventModal, setCreateEventModal }) => {

  const authCtx = useContext(AuthContext);
  const [address, setAddress] = useState("");

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
  }

  const handleEventsubmit = async (e) => {
    e.preventDefault();

    //creates a new object with the current state values
    const formData = new FormData();
    // formData.append("userId", auth.userId)
    formData.append("event_title", title)
    formData.append("event_description", description)
    formData.append("event_date", date)
    formData.append("event_location", location)
    formData.append("event_thumbnail", image)
    formData.append("event_link", link)

    try {
      const response = await axios.post("/event", formData, {
        headers: {
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
          <form className="editForm" onSubmit={handleEventsubmit} enctype="multipart/form-data">
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
            <input accept="image/*" className="image_input" type="file" onChange={handleImageUpload} filename="event_thumbnail"/>
            {/* <img src={image} /> */}
            <label for="event_link">Event Link:</label>
            <input type="url" name="event_link" value={link} onChange={(event) => setLink(event.target.value)}  />
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
