import React, {useState, createContext, useContext} from 'react'
import Center from '../../Center/Center'
import Left from '../../Left/Left'
import Right from '../../Right/Right'
import styles from './Home.module.css'
import { EventContext } from '../../../App';
import AuthContext from '../../../Context/AuthProvider'
import { useNavigate } from 'react-router-dom'
import useLogout from '../../../hooks/useLogout'


export const DateContext = createContext()

const Home = () => {

  const logout = useLogout();
  const {setEventModal, eventModal} = useContext(EventContext)
  const [value, onChange] = useState("")

  const { setAuth } = useContext(AuthContext);

  let navigate = useNavigate();

  const signOut = async () => {
      
      await logout();
      window.localStorage.clear();
      navigate('/login')
  }


  return (
    <div className={styles.Home}>
      <DateContext.Provider value={{value, onChange}} >
          <Left logout={signOut} />
          <Center />
          <Right />
      </DateContext.Provider>

    </div>
  )
}

export default Home