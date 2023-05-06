import Navbar from './Navbar.jsx';
import Banner from './Banner.jsx';
import Review from './Review.jsx';
import SignUp from './Pages/SignUp.jsx';

export default function Main (props) {

    return (
        <div>
            <Navbar/>
            <Banner title={props.title}/>
        </div>
    )
}