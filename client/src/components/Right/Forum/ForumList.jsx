import React, {useContext, useState} from 'react'
import { EventContext } from '../../../App'
import { ForumData } from '../../../Data/ForumData'
import ForumModal from '../../Modals/ForumModal'
import Forum from './Forum'
import './ForumList.css'


const ForumList = () => {

  const [forumPost, setForumPost] = useState("")
  const [editPost, setEditPost] = useState(false)

  const {forumModal, setForumModal} = useContext(EventContext);

  const handleDeletePost = () => {
    setForumModal(false);
  }

  const handleEditPost = () => {
    setEditPost(!editPost);
  }

  return (
    <>
      <div className="ForumListContainer">
        <header className="ForumList_header">
          I Spotted You
        </header>
        <div className="hrline"></div>
        <div className='ForumList_body'>
          {ForumData.map((post, id)=>{
            return <Forum setForumPost={setForumPost} post={post} key={id}/>
          })}
        </div>
      </div>
      {forumModal ? <ForumModal handleDeletePost={handleDeletePost} handleEditPost={handleEditPost} post={forumPost} editPost={editPost}/> : "" }
    </>
  )
}

export default ForumList