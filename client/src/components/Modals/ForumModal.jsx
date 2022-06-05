import React, {useContext, useState} from 'react'
import { EventContext } from '../../App';
import ReactDom from 'react-dom'
import './ForumModal.css'

const ForumModal = ({post, handleDeletePost, handleEditPost, editPost }) => {

  const {forumModal, setForumModal} = useContext(EventContext);
  const [postValue, setPostValue] = useState(post)

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
    <div className="containerBody">
      <div className="ForumModalContainer">
            {editPost ? 
        <div className='editFormContainer'>
        <button className='closeButtonTwo' onClick={() => setForumModal(false)}>X</button>
          <form className="editForm">
            <label for="post_title" >
            Title
            </label>
            <input type="text" value={postValue.title} name="post_title" onChange={(e)=>{setPostValue(e.target.value)}}/>
            <label for="post_description"  >
            Description
            </label>
            <textarea name="post_description"  value={postValue.post_body} onChange={(e)=>{setPostValue(e.target.value)}}/>
            <label for="post_location" >
            Location:
            </label>
            <input type="text" value={postValue.spotted_event} name="post_location" onChange={(e)=>{setPostValue(e.target.value)}}/>
            <label for="spotted_date" >
            Date Spotted:
            </label>
            <input type="date" value={postValue.spotted_date} name="spotted_date" onChange={(e)=>{setPostValue(e.target.value)}}/>
            
            <button type='submit' className='saveButton' onClick={handleEditPost}>SAVE
            </button>
          </form>

        </div> : 
        <>
            <button className='closeButtonOne' onClick={() => setForumModal(false)}>X</button>
            <div className="title">
            {post.title}
            </div>
            <div className="description">
            {post.post_body}
            </div>
            <div className="location">
            Location: @ {post.spotted_event}
            </div>
            <div className="spotted_date">
            Spotted Date: {post.spotted_date}
            </div>
            <div className="post_date">
            Date Created: {post.post_date}
            </div>
            <div className="user_name">
            By {post.user_name}
            </div>
            <a className="link" href={post.email}>
              <button>
                EMAIL {post.user_name}
              </button>
            </a>
            <span>
              <button onClick={handleDeletePost} type="button" class="deleteButton btn">Delete</button>
              <button onClick={handleEditPost} type="button" class="editButton btn">Edit</button>
            </span>
          </>
        }
      </div>
      </div>
    </div>,
    document.getElementById('portal')
  )
}

export default ForumModal