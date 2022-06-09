import './App.css';
import Home from './components/Pages/Home/Home';
import { Routes, Route } from 'react-router-dom'
import About from './components/Pages/About/About';
import { createContext, useState } from 'react';
import Register from './components/Pages/Login/Register';
import Login from './components/Pages/Login/Login';
import Missing from './components/Pages/Missing/Missing';
export const EventContext = createContext()

const ROLES = {
  'User': 2001,
  'Editor': 1984,
  'Admin': 5150
}

function App() {
  const [eventModal, setEventModal] = useState(false);
  const [forumModal, setForumModal] = useState(false);
  return (
    <div className="App">
       <EventContext.Provider value={{eventModal, setEventModal, forumModal, setForumModal}} >
      <Routes>
        {/* Public Routes */}

        <Route path='about' element={<About/>}/>
        <Route path='login' element={<Login/>}/>
        <Route path='register' element={<Register/>}/>


        {/* Protected Routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.User]}/>}>
         <Route index element={<Home/>}/>
        </Route>
        {/* Catch all routes */}
        <Route path="*" element={<Missing />} />

      </Routes>
      </EventContext.Provider>

    </div>
  );
}

export default App;
