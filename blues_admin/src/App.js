import Atm_logo from './Blues_Logo.png'
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Components/Home/Home';
import Add_User from './Components/Add_User/Add_User';
import View from './Components/View/View';
import Navbor from './Components/Navbor/Navbar';

function App() {
  return (
    <div >
      <Navbor/>  
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/add' element={<Add_User/>}/>
        <Route path ='/view/:id' element={<View/>}/>
      </Routes>
      </BrowserRouter>   
    </div>
  );
}

export default App;
