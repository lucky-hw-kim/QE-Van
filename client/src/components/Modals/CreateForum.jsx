import React from 'react'
import ReactDom from 'react-dom';
import styles from './CreateForum.module.css'

const CreateForum = ({setCreatePost, createPost}) => {

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

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className={styles.CreateForumContainer}>
        <button
          className="closeButton"
          onClick={() => setCreatePost(false)}
        >
          X
        </button>
        <div className={styles.sub_eventModalContainer}>
        <div className={styles.header}>
          I spotted you!
        </div>

        <label for="forumTitle">Title: </label>
        <input className={styles.title} name="forumTitle"/>

        <label for="forumDescription">Description:</label>
        <textarea className={styles.body} name="forumDescription"/>
        <label for="">Location:</label>
        <input className={styles.body} name="forumLocation"/>
        <label for="">Date You Spotted: </label>
        <input type="date" name="forumDate" />
        <button className={styles.saveButton}>Save</button>

      </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default CreateForum