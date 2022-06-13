import React, {useState, useContext} from 'react'
import ReactDom from 'react-dom';
import AuthContext, { AuthProvider } from '../../Context/AuthProvider';
import axios from '../api/axios';
import styles from './CreateForum.module.css'


const UpdateForum = ({ post, setEdit, editForum, setEditForum, setForumModal}) => {

  const authCtx = useContext(AuthContext);
  const[title, setTitle] = useState(post.post_title);
  const[description, setDescription] = useState(post.post_description);
  const[date, setDate] = useState(post.spotted_date);
  const[location, setLocation] = useState(post.spotted_location);

  const OVERLAY_STYLES = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(100, 100, 120, 0.7)',
    zIndex: 9999,
    width: '100vw',
    height: '100vh',
  }

  const handleForumSubmit = async (e) => {
    e.preventDefault();

    //creates a new object with the current state values
    const body = {
      "post_title": title,
      "post_description": description,
      "spotted_date": date,
      "spotted_location": location,
      "userId": authCtx.userId
    }
    try {
      const response = await axios.put(`/forum/${post._id}`, body, {
        headers: { 
          authorization: "Bearer " + authCtx.token
        }
      })
      setEditForum(false)
      setForumModal(false)
      console.log(response.data)
    }
    catch (err) {console.error(err)}
  }

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className={styles.CreateForumContainer}>
        <button
          className="closeButton"
          onClick={() => setEditForum(false)}
        >
          X
        </button>
        <div className={styles.sub_eventModalContainer}>
        <div className={styles.header}>
          I spotted you!
        </div>
        <form onSubmit={handleForumSubmit}>
          <label htmlfor="post_title">Title: </label>
          <input className={styles.title} name="post_title"
          value={title} onChange={(event) => setTitle(event.target.value)}/>
          <label htmlfor="post_description">Description:</label>
          <textarea className={styles.body} name="post_description" value={description} onChange={(event) => setDescription(event.target.value)}/>
          <label htmlfor="spottted_location">Location:</label>
          <input className={styles.body} name="spottted_location" value={location} onChange={(event) => setLocation(event.target.value)}/>
          <label htmlfor="spotted_date">Date You Spotted: </label>
          <input type="date" name="spotted_date" value={date} onChange={(event) => setDate(event.target.value)} />
          <button type="submit" className={styles.saveButton}>Save</button>
        </form>

      </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}


export default UpdateForum