import './App.css';
import Home from './components/Pages/Home/Home';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import About from './components/Pages/About/About';
import { createContext, useState } from 'react';
import Signup from './components/Pages/Login/Signup';
import Login from './components/Pages/Login/Login';
export const EventContext = createContext()


function App() {
  const [eventModal, setEventModal] = useState(false);
  const [forumModal, setForumModal] = useState(false);
  return (
    <div className="App">
       <EventContext.Provider value={{eventModal, setEventModal, forumModal, setForumModal}} >
      <Routes>
        {/* <Route path="/" element={<Layout />}>
        </Route> */}
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='signup' element={<Signup/>}/>
      </Routes>
      </EventContext.Provider>

    </div>
  );
}

export default App;
