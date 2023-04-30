import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'
import Banner from './components/Banner'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>
      <Banner/>
    </div>        
  )
}

export default App
