import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SignUp from '../Pages/SignUp/SignUp.jsx'
import Login from '../Pages/Login/Login.jsx'
import Course from '../Pages/Course/Course.jsx'
import Welcome from '../Pages/Welcome/Welcome.jsx';
import ReviewPage from '../Pages/ReviewPage/ReviewPage';
import NewNavbar from '../components/Navbar/NewNavbar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <NewNavbar/>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/course/:courseCode' element={<Course/>}/>
          <Route path='/professor/:courseCode' element={<Course/>}/>
          <Route path='course/:courseCode/review' element={<ReviewPage data={{'type': location.href.split('/')[3], 'value': location.href.split('/')[4]}}/>}/>
        </Routes>
      </Router>


    </div>        
  )
}

export default App
