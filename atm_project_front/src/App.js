import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Components/Home/Home';
import Insetcard from './Components/Insetcard/Insetcard';
import Create_User from './Components/Insetcard/Create_User/Create_User';
import Transaction from './Components/Insetcard/Transaction/Transaction';

function App() {
  return (
    <div className=" flex justify-center items-center h-[100vh] ">
      <div className='App h-[70vh] w-[60%] relative pb-[5px]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/inset' element={<Insetcard/>}/>
          <Route path='/create' element={<Create_User/>}/>
          <Route path='/trans' element={<Transaction/>}/>
        </Routes>
      </BrowserRouter>
      </div>
     
      
    </div>
  );
}

export default App;
