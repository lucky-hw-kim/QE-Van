import React from 'react'
import styles from './ProfileModal.css'
import ReactDom from "react-dom";
import AuthContext from "../../Context/AuthProvider";

const ProfileModal = () => {

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

  return ReactDom.createPortal(
    <div className={styles.profileContainer}>
      <div className={styles.sub_profileContainer}>
      ProfileModal
      </div>
    </div>,
    document.getElementById("portal")
  )
}

export default ProfileModal