import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Main from './Pages/Main'
import SignUp from './Pages/SignUp.jsx'
import Login from './Pages/Login.jsx'
import ReviewPage from './Pages/ReviewPage.jsx'
import Course from './Pages/Course.jsx'
import Welcome from './Pages/Welcome';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/Main' element={<Main/>}/>
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
