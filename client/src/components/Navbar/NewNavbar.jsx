import NewSearch from "../Search/NewSearch.jsx"
import './NewNavbar.css'
export default function NewNavbar () {
    return (
        <header className="header">
            <div className="Navbar">
                <div className="siteLogo">
                    <h3><a href="/"><span>YU</span> Reviews</a></h3>
                </div>

                <NewSearch/>

                <div className="links">
                    <h4><a href="/Login" style={{'marginRight':'1em'}}>Login</a></h4>
                    <h4><a href="/SignUp">Sign-Up</a></h4>
                </div>
            </div>
        </header>
    )
}