
import React, {useContext, useState, useEffect} from 'react'
import { EventContext } from '../../../App'
import AuthContext from '../../../Context/AuthProvider'
import { ForumData } from '../../../Data/ForumData'
import axios from '../../api/axios'
import CreateForum from '../../Modals/CreateForum'
import ForumModal from '../../Modals/ForumModal'
import Forum from './Forum'
import './ForumList.css'


const ForumList = () => {

  const authCtx = useContext(AuthContext);
  const [forumPost, setForumPost] = useState("")
  const [editPost, setEditPost] = useState(false)
  const [createPost, setCreatePost] = useState(false)
  const [allForums, setAllforums] = useState([])
  const {forumModal, setForumModal} = useContext(EventContext);

  const token = localStorage.getItem('token')

  const handleDeletePost = (id) => {
    // setForumModal(false);
    setAllforums(allForums.filter((post) => post.id !== id))
  }

  const handleEditPost = (id,updatedEntry) => {
    setEditPost(!editPost);
    const entryList = allForums.filter((entry) => entry.id !== id);
    setAllforums([updatedEntry, ...entryList]); 
  }

  const handleCreatePost = () => {
    setCreatePost(!createPost);
  }

  useEffect(() => {
    axios.get("/forum", {
        headers: { authorization: "Bearer " + authCtx.token }
      }).then((result) => {
        setAllforums(result.data);
      }).catch((e) => console.error(e));
  }, [forumModal, createPost]);

  return (
    <>
      <div className="ForumListContainer">
        <header className="ForumList_header">
          I Spotted You
        </header>
        <div className="hrline"></div>
        <div className='ForumList_body'>
          {allForums.map((post, id)=>{
            return <Forum setForumPost={setForumPost} post={post} key={id}/>
          })}
        </div>
        <button className='forumListBtn' onClick={handleCreatePost}>
          LOOKING FOR SOMEONE?
        </button>
      </div>
      {forumModal ? <ForumModal handleDeletePost={handleDeletePost} handleEditPost={handleEditPost} post={forumPost} editPost={editPost} setForumModal={setForumModal}/> : "" }
      {
        createPost ? <CreateForum setCreatePost={setCreatePost} createPost={createPost} /> : ""
      }
    </>
  )
}

export default ForumList