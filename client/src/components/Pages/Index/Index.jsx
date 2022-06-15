import React from "react";
import styles from "./Index.module.css";
import logo from "../../../assets/Banner_6pt.png";
import rainbow from "../../../assets/rainbow.png";
import cloud from "../../../assets/cloud@4x.png";
import { NavLink } from "react-router-dom";


const Index = () => {
  return (
    <div className={styles.bgContainer}>
      <div className={styles.heading}>
        <div className={styles.headingBanner}>
          <img src={logo} alt="banner logo" />
          <img src={rainbow} alt="rainbow logo" />
        </div>
        <div className={styles.body}>
          <img src={cloud} alt="rainbow logo" />
          <div className={styles.boardContainer}>
            <div className={`${styles.redBg} ${styles.board}`}></div>
            <div className={`${styles.blueBg} ${styles.board}`}></div>
            <div className={`${styles.greenBg} ${styles.board}`}></div>
            <div className={`${styles.yellowBg} ${styles.board}`}>
              <div className={styles.textContainer}>
                <span className={styles.queers}>Queers</span>
                <span className={styles.just}>Are you looking for some <strong>fun</strong> events?</span>
              </div>
              <div className={styles.vLine}/>
              <div className={styles.buttonContainer}>
                <NavLink to="/login">
                  <button className={styles.enterBtn}>Sign In</button>
                </NavLink>
                <NavLink to="/register">
                  <button className={styles.enterBtn}>Sign Up</button>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
