import React from 'react'
import './Forum.css'

const Forum = ({post, id}) => {
  return (
    <div className='ForumContainer'>
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