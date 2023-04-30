import '../styles/Navbar.css'
import Search from './Search'
import { useState } from 'react'


/*
ToDo:
- switch between Login and MyProfile links after successful login
*/

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);


    return (
        <div className='Navbar'>

            <div className="siteLogo">
                <p><span style={{'color': 'rgb(227,24,55)', 'fontWeight': 'bold'}}>YU</span> <span>Review</span></p>
            </div>

            <div className="searchComponent">
                <Search/>
            </div>

            {
                !isLoggedIn 
                && 
                <div className='links'>
                    <a href=''>Login</a>
                    <a href=''>Sign-up</a>
                </div>
            }

            {
                isLoggedIn 
                && 
                <div className='links'>
                    <a href=''>My Profile</a>
                </div>
            }

            
        </div>
    )
}