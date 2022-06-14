import React, { useContext, useEffect, useState } from "react";
import styles from "./Profile.module.css";
import profile from "../../../assets/profile.png";
import AuthContext from "../../../Context/AuthProvider";
import axios from "../../api/axios"

const Profile = () => {
  const [user, setUser] = useState("")
  const authCtx = useContext(AuthContext);
  const userId = window.localStorage.getItem("userId")
  
  useEffect( ()=>{
    const response = axios.get(`/user/${userId}`).then((response)=> {
    setUser(response.data)
    }
    ).catch ((error) => {
      console.log(error)
    })
  }, [])


  const pronouns = user.pronoun;

  return (
    <div className={styles.ProfileContainer}>
      <div className={styles.imageFrame}>
        <img
          src={
            user.profile_pic
              ? process.env.REACT_APP_PUBLIC_FOLDER +
                "/" +
                user.profile_pic
              : `https://avatars.dicebear.com/api/human/${authCtx.user.firstname}.svg`
          }
          alt="profileimg"
        />
      </div>
      <div className={styles.textFrame}>
        {!pronouns || !pronouns.length ? (
          <span>{user.firstname}</span>
        ) : (
          <span>{pronouns.join(" | ")} </span>
        )}
      </div>
    </div>
  );
};

export default Profile;
