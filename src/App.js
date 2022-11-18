import logo from './logo.svg';
import './App.css';
import Navbar from '../src/components/Navbar'
import Dashboard from './pages/Dashboard';
import {Route, Routes} from 'react-router-dom' 
import Login from './pages/Login';
import NewBlog from './pages/NewBlog';
import Profile from './pages/Profile';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
    <Navbar/>
    <Routes>
      <Route path='/' element={<Dashboard/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/newblog' element={<NewBlog/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/logout' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>

    </Routes>
    </div>
  );
}

export default App;
