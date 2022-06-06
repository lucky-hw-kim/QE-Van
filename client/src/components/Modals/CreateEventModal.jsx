import React, { useState } from "react";
import ReactDom from "react-dom";
import "./CreateEventModal.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const CreateEventModal = ({ createEventModal, setCreateEventModal }) => {
  const [address, setAddress] = useState("");

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

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="createEventContainer">
        <div className="modalContainer">
          <button
            className="closeButtonTwo"
            onClick={() => setCreateEventModal(false)}
          >
            X
          </button>
          <form className="editForm">
            <label for="post_title">Event Title</label>
            <input type="text" name="createpost_title" />
            <label for="post_description">Description</label>
            <textarea name="post_description" />
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
            <label for="spotted_date">Date Spotted:</label>
            <input type="date" name="spotted_date" />

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
