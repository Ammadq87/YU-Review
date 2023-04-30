import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Main from './components/Main.jsx'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Main />}/>
        </Routes>
      </Router>

      
    </div>        
  )
}

export default App
