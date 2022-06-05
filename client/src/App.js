import './App.css';
import Home from './components/Pages/Home/Home';
import { Routes, Route } from 'react-router-dom'
import About from './components/Pages/About/About';
import { createContext, useState } from 'react';
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
      </Routes>
      </EventContext.Provider>

    </div>
  );
}

export default App;
