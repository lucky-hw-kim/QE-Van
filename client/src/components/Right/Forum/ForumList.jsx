import React, {useContext, useState} from 'react'
import { EventContext } from '../../../App'
import { ForumData } from '../../../Data/ForumData'
import CreateForum from '../../Modals/CreateForum'
import ForumModal from '../../Modals/ForumModal'
import Forum from './Forum'
import './ForumList.css'


const ForumList = () => {

  const [forumPost, setForumPost] = useState("")
  const [editPost, setEditPost] = useState(false)
  const [createPost, setCreatePost] = useState(false)

  const {forumModal, setForumModal} = useContext(EventContext);

  const handleDeletePost = () => {
    setForumModal(false);
  }

  const handleEditPost = () => {
    setEditPost(!editPost);
  }

  const handleCreatePost = () => {
    setCreatePost(!createPost);
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
        <button className='forumListBtn' onClick={handleCreatePost}>
          LOOKING FOR SOMEONE?
        </button>
      </div>
      {forumModal ? <ForumModal handleDeletePost={handleDeletePost} handleEditPost={handleEditPost} post={forumPost} editPost={editPost}/> : "" }
      {
        createPost ? <CreateForum setCreatePost={setCreatePost} createPost={createPost}/> : ""
      }
    </>
  )
}

export default ForumList