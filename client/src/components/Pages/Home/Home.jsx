import React, {useState, createContext, useContext} from 'react'
import Center from '../../Center/Center'
import Left from '../../Left/Left'
import Right from '../../Right/Right'
import styles from './Home.module.css'





export const DateContext = createContext()

const Home = () => {

  const [value, onChange] = useState("")


  return (
    <div className={styles.Home}>
      <DateContext.Provider value={{value, onChange}} >
          <Left />
          <Center />
          <Right />
      </DateContext.Provider>

    </div>
  )
}

export default Home