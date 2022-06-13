import React,{useContext} from 'react'
import './Forum.css'
import { EventContext } from '../../../App'

const Forum = ({post, id, setForumPost}) => {

  const {forumModal, setForumModal} = useContext(EventContext);
   
  const handleForum = () => {
    setForumPost(post)
    setForumModal(true)
  }

  const spottedDate = new Date(post.spotted_date).toString().split(" ").splice(0,3).join(" ").toUpperCase() 
  const spottedTime = new Date(post.spotted_date).toString().split(" ").splice(4,1)[0].split(":").splice(0,2).join(":")+ " PST"

  return (
    <div onClick={handleForum} className='ForumContainer'>
      <div className="post_title">{post.post_title}</div>
      <div className="spotted_date">
        WHEN:{spottedDate} {spottedTime}
      </div>
      <div className="spotted_event">
        WHERE:{post.spotted_location}
      </div>
      
    </div>
  )
}

export default Forum