import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Review from './Review.jsx';
import SignUp from './Pages/SignUp.jsx';
import '../styles/Pages/Main.css'
import axios from 'axios';

export default function Main () {

    const getCourse = () => {
        axios.get('http://localhost:3000/api/course')
        .then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        }) 
    }

    return (
        <div className='Main'>
            <Navbar/>
            <Banner title={'Courses and Professors at YorkU'}/>
            <div className="layout">
                <button onClick={getCourse}>Click</button>
            </div>
        </div>
    )
}