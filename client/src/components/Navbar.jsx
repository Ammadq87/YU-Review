import './styles/Navbar.css'
import Search from './Search.jsx'
import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

/*
ToDo:
- update Navbar on successful login
    - switch between Login and MyProfile links after successful login
*/

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const linkStyle = {
        'textDecoration': 'none',
        'paddingLeft': '15px',
        'fontSize': '14px',
        'fontWeight': 'bold',
        'color': 'rgb(227,24,55)'
    };

    return (
        <div className='Navbar'>
            <div className="siteLogo">
                <a href='/'><span style={{'color': 'rgb(227,24,55)', 'fontWeight': 'bold'}}>YU</span> <span>Review</span></a>
            </div>
            <div className="searchComponent">
                <Search/>
            </div>
            <div className='linkContainer'>
                {
                    !isLoggedIn 
                    &&
                    <div className='links'>
                        <Link style={linkStyle} to='/Login'>Login</Link>
                        <Link style={linkStyle} to='/SignUp'>Sign-Up </Link>
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
        </div>
    )
}