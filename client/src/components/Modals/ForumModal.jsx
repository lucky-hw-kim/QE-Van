import React, { useContext, useEffect, useState } from "react";
import { EventContext } from "../../App";
import ReactDom from "react-dom";
import "./ForumModal.css";
import AuthContext from "../../Context/AuthProvider";
import axios from "../api/axios";
import styles from './CreateForum.module.css'

const ForumModal = ({ post, handleDeletePost, handleEditPost, editPost }) => {
  const { forumModal, setForumModal } = useContext(EventContext);
  const [postValue, setPostValue] = useState(post);
  const authCtx = useContext(AuthContext);
  const [user, setUser] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [editForum, setEditForum] = useState(false);
  const[title, setTitle] = useState(post.post_title);
  const[description, setDescription] = useState(post.post_description);
  const[date, setDate] = useState(post.spotted_date);
  const[location, setLocation] = useState(post.spotted_location);

  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('userId')

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
    setForumModal(false);
    axios
      .delete(`/forum/${post._id}`, {
        headers: { authorization: "Bearer " + token },
        data: { userId: userId },
      })
      .then((res) => {
        res && setSuccessMsg("Forum deleted successfully");
        handleDeletePost(post._id);
      })
      .catch((error) => {
        setSuccessMsg("Error : " + error.message);
      });
  };

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
      const response = await axios.put(`/forum/${post._id}`, body, {
        headers: { 
          authorization: "Bearer " + token
        }
      })
      setEditForum(false)
      setForumModal(false)
    }
    catch (err) {console.error(err)}
  }

  useEffect(() => {
    post &&
      axios
        .get(`/user/${post.userId}`)
        .then((response) => {
          setUser(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [authCtx.token]);

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="container">
      <div className="containerHead">
          <button
            className="closeButton"
            onClick={() => setForumModal(false)}
          >
            X
          </button>
        </div>
        <div className="subContainer">
          {!editForum ? (
              <div className="forumContainer">
              <div className="containerHeader helloThere">Hello there!</div>
              <div className="forum_title">{post.post_title}</div>
              <div className="forum_description">{post.post_description}</div>
              <div className="forum_location">WHERE: @{post.spotted_location}</div>
              <div className="forum_date">
                WHEN:{spottedDate} {spottedTime}
              </div>
              <div className="user_name">BY {user.firstname}</div>

              <div>
                <span>
                {post.userId === user._id ?  
                  <button
                    onClick={handleDeleteForum}
                    type="button"
                    className="deleteButton saveButton"
                  >
                    Delete
                  </button>
                  : ""}
                 {post.userId === user._id ? 
                  <button
                    onClick={() => {
                      setEditForum(true);
                    }}
                    type="button"
                    className="editButton saveButton"
                  >
                    Edit
                  </button>
                  : ""}
                </span>
              </div>
              </div>
          ) : (
            <>
              <div className="containerHeader">Edit Your Post</div>
              <form className="containerForm" onSubmit={handleForumSubmit}>
                <label htmlfor="post_title">Title: </label>
                <input
                  className={styles.title}
                  name="post_title"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <label htmlfor="post_description">Description:</label>
                <textarea
                  className={styles.body}
                  name="post_description"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <label htmlfor="spottted_location">Location:</label>
                <input
                  className={styles.body}
                  name="spottted_location"
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                />
                <label htmlfor="spotted_date">Date You Spotted: </label>
                <input
                  type="date"
                  name="spotted_date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
                <button type="submit" id={styles.saveButton} className="saveButton">
                Save
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ForumModal;
