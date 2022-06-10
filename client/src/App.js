import './App.css';
import Home from './components/Pages/Home/Home';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom'
import About from './components/Pages/About/About';
import { createContext, useState, useContext } from 'react';
import Register from './components/Pages/Login/Register';
import Login from './components/Pages/Login/Login';
import Index from './components/Pages/Index/Index';
import AuthContext, { AuthContextProvider } from './Context/AuthProvider';
export const EventContext = createContext()


// const ROLES = {
//   'User': 2001,
//   'Admin': 5150
// }

const RequireAuth = () => {
  const authCtx = useContext(AuthContext);
  if (!authCtx.token) {
    return <Navigate to="/home" />;
  }
  return <Outlet />;
};


function App() {
  const [eventModal, setEventModal] = useState(false);
  const [forumModal, setForumModal] = useState(false);

  return (

    <div className="App">
      <AuthContextProvider>
        <EventContext.Provider value={{eventModal, setEventModal, forumModal, setForumModal}} >
          <Routes>
            {/* Public Routes */}
            <Route path='home' element={<Index/>}/>
            <Route path='about' element={<About/>}/>
            <Route path='login' element={<Login/>}/>
            <Route path='register' element={<Register/>}/>

            {/* Protected Routes */}
            <Route path='/' element={<RequireAuth/>}>
              <Route path='/' element={<Home/>}/>
            </Route>
            {/* Catch all routes */}
            {/* <Route path="*" element={<Index />} /> */}

          </Routes>
        </EventContext.Provider>
      </AuthContextProvider>

    </div>
  );
}

export default App;
