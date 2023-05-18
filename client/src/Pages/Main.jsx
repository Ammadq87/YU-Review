import Navbar from '../components/Navbar.jsx';
import Banner from '../components/Banner.jsx';
import './styles/Main.css'

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