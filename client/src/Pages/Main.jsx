import Navbar from '../components/Navbar.jsx';
import Banner from '../components/Banner.jsx';
import Review from '../components/Review.jsx';
import './styles/Main.css'

export default function Main () {
    const bannerData = {
        title: 'Courses and Professors at YorkU',
        subtitle: '',
        extend: false    
    }

    return (
        <div className='Main'>
            <Navbar/>
            <Banner data={bannerData}/>
            <div className="layout">
                <a href="/course/EECS3311">EECS 3311</a>
            </div>
            
        </div>
    )
}