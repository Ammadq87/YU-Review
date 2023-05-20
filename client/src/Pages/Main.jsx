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
                <a href="/course/LE-EECS-3311-3-00">EECS 3311</a>
                <br />
                <a href="/course/LE-EECS-3101-3-00">EECS 3101</a>
                {/* <br /> */}
                {/* <a href="/course/BIOL1000">BIOL 1000</a> */}
                {/* <br /> */}
                {/* <a href="/course/MATH2030">MATH 2030</a> */}

            </div>
            
        </div>
    )
}