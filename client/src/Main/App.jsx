import { useState } from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SignUp from '../Pages/SignUp/SignUp.jsx'
import Login from '../Pages/Login/Login.jsx'
import ReviewPage from '../Pages/ReviewPage/ReviewPage.jsx'
import Course from '../Pages/Course/Course.jsx'
import Welcome from '../Pages/Welcome/Welcome.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Welcome/>}/>
          <Route path='/SignUp' element={<SignUp/>}/>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/course/:courseCode' element={<Course/>}/>
          <Route path='/professor/:courseCode' element={<Course/>}/>

          <Route path='/Review' element={<ReviewPage data={{isCourse: true, value: 'EECS3311'}}/>}/>
        </Routes>
      </Router>
    </div>        
  )
}

export default App
