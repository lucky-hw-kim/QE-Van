import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NavLinks = () => {
  return (
    <div className="NavLinksContainer">
      <div className={styles.NavBarContainer}>
        <button
          onClick={() => {
            setProfileModal(true);
          }}
        >
          PROFILE
        </button>
        <button
          onClick={() => {
            setCreateEventModal(true);
          }}
        >
          CREATE
        </button>
        <button
          onClick={() => {
            setSavedEventModal(true);
          }}
        >
          EVENTS
        </button>
        <button
          className={styles.Logout}
          onClick={() => {
            ctx.onLogout();
          }}
        >
          <NavLink to="/">LOGOUT</NavLink>
        </button>
      </div>
    </div>
  );
};

export default NavLinks;
