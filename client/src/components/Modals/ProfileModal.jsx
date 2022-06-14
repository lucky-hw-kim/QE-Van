import React, { useContext, useEffect, useState } from "react";
import styles from "./ProfileModal.module.css";
import ReactDom from "react-dom";
import AuthContext from "../../Context/AuthProvider";
import axios from "../api/axios";

const ProfileModal = ({ setProfileModal, profileModal }) => {
  const [image, setImage] = useState(null);
  const [user, setUser] = useState("");
  const [editProfile, setEditProfile] = useState(false);
  const [msg, setMsg] = useState("")
  const [state, setState] = useState({}) 
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

  const userId = window.localStorage.getItem("userId");
  useEffect(() => {
    axios.get(`user/${userId}`).then((res) => {
      setUser(res.data);
    });
  }, [profileModal]);

  const pronouns = user.pronoun;
  const profilePic = user.profile_pic;
  console.log("User:", user.firstname)

  const initialState = {
    firstname: "",
    lastname: "",
    pronoun: pronouns ? pronouns : "",
    currentAdminStatus: "", 
    password: user.password
  };

  const [updateUser, setUpdateUser] = useState(initialState);

  const handleChange = (e) => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };



  const handleImageUpload = async (event) => {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      let img = event.target.files[0];
      console.log(img);
      setImage(img);
    }
  };


  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (image) {
      const data = new FormData();
      const filename = Date.now() + image.name;
      data.append("name", filename);
      data.append("file", image);
      updateUser.profile_pic = filename;

      try {
        const result = await axios.post("/upload", data, {
          headers: {
            "Content-Type": "multipart/form-data"
          },
        });
        console.log("upload success")
      } catch (err) {
        console.log(err);
      }
    }

    const response = await axios.put(`/user/${userId}`, updateUser )
    try {
      setMsg("Profile updated successfully")
    } catch (error) {
      setMsg(error);
    }
    
  };

  return ReactDom.createPortal(
    <div style={OVERLAY_STYLES}>
      <div className="container">
        <button className="closeButton" onClick={() => setProfileModal(false)}>
          X
        </button>
        <div className="subContainer">
          {!editProfile ? (
            <>
              <div className={styles.profileSection}>
                <img
                  className={styles.profilePic}
                  src={
                    profilePic
                      ? process.env.REACT_APP_PUBLIC_FOLDER +
                        user.profile_pic
                      : `https://avatars.dicebear.com/api/human/${user.firstname}.svg`
                  }
                  alt="profile_pic"
                />

                <div className={styles.profileInfo}>
                  <div className={styles.userName}>
                    {user.firstname} {user.lastname}{" "}
                  </div>
                  <div className={styles.userPronoun}>
                    {!pronouns || !pronouns.length ? (
                      <span>Add your pronouns </span>
                    ) : (
                      <span>{pronouns.join(" | ")} </span>
                    )}
                  </div>
                  <div className={styles.userEmail}>
                    {user.username ? user.username : "email"}
                  </div>
                </div>
              </div>
              <button
                className={styles.editButton}
                onClick={() => {
                  setEditProfile(true);
                }}
              >
                Edit Profile
              </button>
            </>
          ) : (
            <div className={styles.editContainer}>
              <div className="containerHeader">Personalize your profile</div>
              <form className="containerForm" encType="multipart/form-data" onSubmit={handleUserSubmit}>
                <h4>{msg ? msg : ""}</h4>
                <label htmlfor="firstname">First Name: </label>
                <input
                  className={styles.firstname}
                  name="firstname"
                  value={updateUser.firstname}
                  onChange={handleChange}
                />
                <label htmlfor="lastname">Last Name: </label>
                <input
                  className={styles.lastname}
                  name="lastname"
                  value={updateUser.lastname}
                  onChange={handleChange}
                />
                <label htmlfor="pronoun">Pronouns: </label>
                <input
                  className={styles.pronoun}
                  name="pronoun"
                  value={updateUser.pronoun}
                  onChange={handleChange}
                />
                <label htmlfor="profile_pic">Profile Image: </label>
                <input
                  type="file"
                  className={styles.profile_pic}
                  name="profile_pic"
                  value={updateUser.profile_pic}
                  onChange={handleImageUpload}
                />
               <button>Save</button>
                <br />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.getElementById("portal")
  );
};

export default ProfileModal;
