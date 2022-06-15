import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";
import styles from "./SavedEvent.module.css";
import { EventData } from "../../Data/EventData";
import { UserData } from "../../Data/UserData";
import EventSaved from "./ListEvents/EventSaved";
import axios from "../api/axios";

const SavedEvent = ({ savedEventModal, setSavedEventModal }) => {
  const [user, setUser] = useState("");
  const [savedEvents, setSavedEvents] = useState([]);
  const [attendEvents, setAttendEvents] = useState([]);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        response.data.saved_events.map((event) => {
          axios
            .get(`/event/${event}`, {
              headers: { authorization: "Bearer " + token },
            })
            .then((result) => {
              setSavedEvents((prev) => [...prev, result.data]);
            })
            .catch((e) => console.error(e));
        });
        response.data.attending_events.map((event) => {
          axios
            .get(`/event/${event}`, {
              headers: { authorization: "Bearer " + token },
            })
            .then((result) => {

              setAttendEvents((prev) => [...prev, result.data]);
            })
            .catch((e) => console.error(e));
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <div className="container">
        <div className={styles.sub_eventsContainer}>
          <button
            className="closeButton"
            onClick={() => setSavedEventModal(false)}
          >
            X
          </button>
          <div className={styles.savedEventContainer}>
            <div className={styles.title}>SAVED EVENTS</div>
            <div className={styles.eventList}>
              {savedEvents.map((e) => {
                return <EventSaved e={e} key={e._id} />;
              })}
            </div>
          </div>
          <div className={styles.attendingEventContainer}>
            <div className={styles.title}>ATTENDING EVENTS</div>
            <div className={styles.eventList}>
              {attendEvents.map((e) => {
                return <EventSaved e={e} key={e._id} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default SavedEvent;
