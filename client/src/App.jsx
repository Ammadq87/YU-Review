import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/Main.jsx'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import SignUp from './components/Pages/SignUp'
import Login from './components/Pages/Login'
import ReviewPage from './components/Pages/ReviewPage'
import Course from './components/Pages/Course'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Main/>}/>
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
