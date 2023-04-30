import '../styles/Navbar.css'
import Search from './Search'
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';


/*
ToDo:
- switch between Login and MyProfile links after successful login
*/

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const linkStyle = {
        'textDecoration': 'none',
        'padding-left': '15px',
        'fontSize': '14px',
        'fontWeight': 'bold',
        'color': 'rgb(227,24,55)'
    };

    return (
        <div className='Navbar'>

            <div className="siteLogo">
                <p><span style={{'color': 'rgb(227,24,55)', 'fontWeight': 'bold'}}>YU</span> <span>Review</span></p>
            </div>

            <div className="searchComponent">
                <Search/>
            </div>


            <div className='linkContainer'>

                {
                    !isLoggedIn 
                    &&
                    <div className='links'>
                        <Link style={linkStyle} to='/'>Login</Link>
                        <Link style={linkStyle} to='/Menu'>Sign-Up </Link>
                    </div>                           
                }

                {
                   isLoggedIn 
                   &&
                   <div className='links'>
                       <Link style={linkStyle} to='/'>My Profile</Link>
                   </div>   
                }

                
            </div>

            <Routes>
                {/* <Route path='/login' element={}/> */}
                {/* <Route path='/signup' element={}/> */}
                {/* <Route path='*' element={<h1>Page Not Found</h1>}/> */}
            </Routes>
        </div>
    )
}