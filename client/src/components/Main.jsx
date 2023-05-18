import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Review from './Review.jsx';
import SignUp from './Pages/SignUp.jsx';
import '../styles/Pages/Main.css'
import axios from 'axios';

export default function Main () {
    return (
        <div className='Main'>
            <Navbar/>
            <Banner title={'Courses and Professors at YorkU'}/>
            <div className="layout">
                <a href="/course/EECS3311">EECS 3311</a>
            </div>
        </div>
    )
}