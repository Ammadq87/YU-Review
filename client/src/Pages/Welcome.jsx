import './styles/Welcome.css';
import NewNavbar from '../components/NewNavbar';
import Listing from '../components/Listing';

export default function Welcome() {
    return (
        <div className="Welcome">
            <NewNavbar/>
            <div className="description">
                <h1>Welcome 👋</h1>
                <div className='intro'>
                Hi there fellow/incoming Lion! Explore course and professor 
                reviews from YorkU students. You can also plan out your next 
                semesters or share you calendars with your fellow Lions. Feel free to check out other <a href='*'>YorkU projects</a>
                </div>
            </div>
            <Listing/>
        </div>
    )
}