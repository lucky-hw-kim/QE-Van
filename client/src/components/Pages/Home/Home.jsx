import React from 'react'
import Center from '../../Center/Center'
import Left from '../../Left/Left'
import Right from '../../Right/Right'
import styles from './Home.module.css'


const Home = () => {
  return (
    <div className={styles.Home}>
      <Left />
      <Center />
      <Right />
    </div>
  )
}

export default Home