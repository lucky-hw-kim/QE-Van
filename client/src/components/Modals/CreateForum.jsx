import React, {useState, useContext} from 'react'
import ReactDom from 'react-dom';
import AuthContext, { AuthProvider } from '../../Context/AuthProvider';
import axios from '../api/axios';
import styles from './CreateForum.module.css'


const CreateForum = ({setCreatePost, createPost}) => {

  const authCtx = useContext(AuthContext);
  const[title, setTitle] = useState("");
  const[description, setDescription] = useState("");
  const[date, setDate] = useState("");
  const[location, setLocation] = useState("");

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
      const response = await axios.post('/forum', body, {
        headers: { 
          authorization: "Bearer " + authCtx.token
        }
      })
      setCreatePost(false)
      console.log(response.data)
    }
    catch (err) {console.error(err)}
  }

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="container">
        <button
          className="closeButton"
          onClick={() => setCreatePost(false)}
        >
          X
        </button>
        <div className="subContainer">
        <div className="containerHeader">
          I spotted you!
        </div>
        <form className="containerForm" onSubmit={handleForumSubmit}>
          <label htmlFor="post_title">Title: </label>
          <input className={styles.title} name="post_title"
          value={title} onChange={(event) => setTitle(event.target.value)}/>
          <label htmlFor="post_description">Description:</label>
          <textarea className={styles.body} name="post_description" value={description} onChange={(event) => setDescription(event.target.value)}/>
          <label htmlFor="spottted_location">Location:</label>
          <input className={styles.body} name="spottted_location" value={location} onChange={(event) => setLocation(event.target.value)}/>
          <label htmlFor="spotted_date">Date You Spotted: </label>
          <input type="date" name="spotted_date" value={date} onChange={(event) => setDate(event.target.value)} />
          <button type="submit" className='saveButton'>Save</button>
        </form>

      </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}


export default CreateForum