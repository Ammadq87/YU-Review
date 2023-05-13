import Banner from '../Banner';
import Navbar from '../Navbar.jsx';
import '../../styles/Pages/Login.css'

export default function Login(props) {
    return (
        <div className="loginPage">
            <Navbar/>
            <Banner title={'Login'}/>

            <div className="loginForm">
                <form action="">
                    <table>
                        <tr>
                            <td colSpan={2} className='single'>
                                {GenerateTableRow('Email', 'email')}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} className='single'>
                                {GenerateTableRow('Password', 'password')}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={1}>
                                <a href="">Forgot Password?</a>
                                <a href="/SignUp">Sign Up</a>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} className='buttons'>
                                <button>Login</button>
                            </td>
                        </tr>
                    </table>
                </form>
            </div>

        </div>
    )
}

const GenerateTableRow = (label, inputType) => {
    return (
        <div className='fieldInput'>
            <label htmlFor="">{label}:</label>
            <input type={inputType} />
        </div>
    )
}