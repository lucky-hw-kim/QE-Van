import React, { useContext, useEffect, useState } from "react";
import { EventData } from "../../../Data/EventData";
import Event from "./Event";
import styles from "./EventList.module.css";
import { DateContext } from "../../Pages/Home/Home";
import { EventContext } from "../../../App";
import EventModal from "../../Modals/EventModal";
import axios from "../../api/axios";
import AuthContext from "../../../Context/AuthProvider";


const EventList = ({ search }) => {
  const [allEvents, setAllEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);
  const authCtx = useContext(AuthContext);
  const { value, onChange } = useContext(DateContext);
  // const [filter, setFilter] = useState(false);

  const { setEventModal, eventModal } = useContext(EventContext);

  useEffect(() => {
    axios.get("/event", {
        headers: { authorization: "Bearer " + authCtx.token }
      }).then((result) => {
        setAllEvents(result.data);
        console.log(result);
      }).catch((e) => console.error(e));
  }, [authCtx.token, setAllEvents, eventModal]);


  const handleSave = (newEntry) => {
    setAllEvents((prev) => [newEntry, ...prev]);
  }

  const handleDelete = (id) => {
    const entryList = allEvents.filter((event) => event.id !== id);
  }

  const handleUpdate = (id, updatedEntry) => {
    const entryList = allEvents.filter((entry) => entry.id !== id);
    setAllEvents([updatedEntry, ...entryList]); 
    //prepends the new journal entry with the same ID to the entry list
  }

  //fn that returns journal entries with the specified tag
  // const handleFilter = (filterTag) => {
  //   setFilter(true);
  //   axios
  //     .get("/events", {
  //       headers: { authorization: "Bearer " + authCtx.token },
  //     })
  //     .then((result) => {
  //       const entryList = result.data.filter((entry) =>
  //         entry.tags.includes(filterTag)
  //       );
  //       setAllEvents([...entryList]);
  //     })
  //     .catch((e) => console.error(e));
  // };

  const date = value.toString().split(" ").slice(1, 4).join(" ");


  const addModalEvent = (e) => {
    setEventDetails(e);
  };

  return (
    <div className={styles.EventListContainer}>
      {search
        ? allEvents?.map((e, id) => {
            if (e.event_title.toLowerCase().includes(search.toLowerCase())) {
              return (
                <Event
                  addModalEvent={addModalEvent}
                  event={e}
                  id={id}
                  key={id}
                />
              );
            }
          })
        : allEvents?.map((e, id) => {
            let eventDate = e.event_date
              .toString()
              .split(" ")
              .slice(0, 3)
              .join(" ");
            if (date == eventDate) {
              return (
                <Event
                  addModalEvent={addModalEvent}
                  event={e}
                  id={id}
                  key={id}
                />
              );
            }
          })}
      {value
        ? allEvents?.map((e, id) => {
            let eventDate = e.event_date
              .toString()
              .split(" ")
              .slice(0, 3)
              .join(" ");
            if (date == eventDate) {
              return (
                <Event
                  addModalEvent={addModalEvent}
                  event={e}
                  id={id}
                  key={id}
                />
              );
            }
          })
        : !value &&
          allEvents?.map((e, id) => {
            return (
              <Event
              addModalEvent={addModalEvent} 
              event={e} 
              id={id} 
              key={id} />
            );
          })}
      {eventModal ?
       <EventModal 
       event={eventDetails} 
       onUpdate={handleUpdate} 
      onDelete={handleDelete} 
      onSave={handleSave}
      /> : ""}
    </div>
  );
};

export default EventList;
