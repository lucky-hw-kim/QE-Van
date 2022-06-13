import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../App";
import ReactDom from "react-dom";
import "./ForumModal.css";
import AuthContext from "../../Context/AuthProvider";
import axios from "../api/axios";
import UpdateForum from "./UpdateForum";


const ForumModal = ({ post, handleDeletePost, handleEditPost, editPost }) => {
  const { forumModal, setForumModal } = useContext(EventContext);
  const [postValue, setPostValue] = useState(post);
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({})
  const [successMsg, setSuccessMsg] = useState("");
  const [editForum, setEditForum] = useState(false)

  const OVERLAY_STYLES = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(100, 100, 120, 0.7)",
    zIndex: 9999,
    width: "100vw",
    height: "100vh",
  };
  
    const spottedDate = new Date(post.spotted_date)
      .toString()
      .split(" ")
      .splice(0, 3)
      .join(" ")
      .toUpperCase();
    const spottedTime =
      new Date(post.spotted_date)
        .toString()
        .split(" ")
        .splice(4, 1)[0]
        .split(":")
        .splice(0, 2)
        .join(":") + " PST";
   
  

  const handleDeleteForum = (e) => {
 
    e.preventDefault();
    
    axios.delete(`/forum/${post._id}`, {
      headers: { authorization: "Bearer " + authCtx.token },
      data:{userId: authCtx.userId}
    }).then((res)=>{
      res && setSuccessMsg("Forum deleted successfully")
      handleDeletePost(post._id)
    })
    .catch ((error) => {
      setSuccessMsg("Error : " + error.message)
    })
  }

useEffect(()=>{
  post && axios.get(`/user/${post.userId}`).then(response => {
        setUser(response.data)
      }).catch(error => {console.log(error);})
    }, [authCtx.token])
   


  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="containerBody">
        <div className="ForumModalContainer">
          {editForum ? (
            <UpdateForum post={post} editForum={editForum} setEditForum={setEditForum} setForumModal={setForumModal}/>
          ) : (
            <>
              <button
                className="closeButtonOne"
                onClick={() => setForumModal(false)}
              >
                X
              </button>
              <div className="eventModalBody">
              {!successMsg ?
              <>
                <div className="title">{post.title}</div>
                <div className="description">{post.post_body}</div>
                <div className="location">WHERE: @ {post.spotted_location}</div>
                <div className="date">
                  WHEN:{spottedDate} {spottedTime}
                </div>
                <div className="user_name">By {user.firstname}</div>

                <div>
                  <span>
                    <button
                      onClick={handleDeleteForum}
                      type="button"
                      className="deleteButton btn"
                    >
                      Delete
                    </button>
                    <button
                      onClick={()=>{
                        setEditForum(true)
                      }}
                      type="button"
                      className="editButton btn"
                    >
                      Edit
                    </button>
                  </span>
                </div>
                </>
              :
              <div className="successMsg">{successMsg}</div>
              }
              </div>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ForumModal;
