import './App.css';
import Home from './components/Pages/Home/Home';
import { Routes, Route } from 'react-router-dom'
import About from './components/Pages/About/About';

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<Layout />}>
        </Route> */}
        <Route index element={<Home/>}/>
        <Route path='about' element={<About/>}/>
      </Routes>

    </div>
  );
}

export default App;
