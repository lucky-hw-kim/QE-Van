import React,{useContext} from 'react'
import './Forum.css'
import { EventContext } from '../../../App'

const Forum = ({post, id, setForumPost}) => {

  const {forumModal, setForumModal} = useContext(EventContext);
   
  const handleForum = () => {
    setForumPost(post)
    setForumModal(true)
  }

  return (
    <div onClick={handleForum} className='ForumContainer'>
      <div className="post_title">{post.title}</div>
      <div className="spotted_date">
        WHEN:{post.spotted_date}
      </div>
      <div className="spotted_event">
        WHERE:{post.spotted_event}
      </div>
      
    </div>
  )
}

export default Forum