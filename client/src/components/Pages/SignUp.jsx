import Banner from '../Banner';
import Navbar from '../Navbar.jsx';
import '../../styles/Pages/SignUp.css'

export default function SignUp(props) {
    return (
        <div className="SignUpPage">
            <Navbar/>
            <Banner title={props.title}/>
            
            <div className="signUpForm">
                <form action="">
                    <table>

                        <tr>
                            <td colSpan={1}>
                                {GenerateTableRow('First Name', 'text')}
                            </td>
                            <td colSpan={1}>
                                {GenerateTableRow('Last Name', 'text')}
                            </td>
                        </tr>

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
                            <td colSpan={2} className='single'>
                                {GenerateTableRow('Confirm Password', 'password')}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={1}>
                                {GenerateTableRow('Major', 'text')}
                            </td>
                            <td colSpan={1}>
                                {GenerateTableRow('Start Date', 'date')}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} className='single'>
                                {GenerateTableRow('Courses Taken', 'text')}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} className='single'>
                                {GenerateTableRow('Bio', 'text')}
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2} className='buttons'>
                                <button>Join Now</button>
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