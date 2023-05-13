import Banner from '../Banner';
import Navbar from '../Navbar.jsx';
import '../../styles/Pages/SignUp.css'
import { useState } from 'react';

/*
ToDo:
Remove other fields from signup page and move the fields to the my profile page where user sets up their profile
*/

export default function SignUp() {

    const formData = {
        'FirstName': '',
        'LastName': '',
        'Email': '',
        'Password': '',
        'ConfirmPassword': ''
    }

    const [formState, setFormState] = useState(formData);
    
    function handleState(field, e) {
        formState[field] = e.target.value;
        setFormState(formState);
        if(field === 'ConfirmPassword') {
            if (formState['ConfirmPassword'] !== formState['Password'])
                console.log('Passwords do not match')
        }
        console.log(formState);
    }

    const GenerateTableRow = (label, inputType) => {
        return (
            <div className='fieldInput'>
                <label htmlFor="">{label}:</label>
                <input type={inputType} onChange={(e) => handleState(label.replace(/\s+/g, ''), e)} />
            </div>
        )
    }

    return (
        <div className="SignUpPage">
            <Navbar/>
            <Banner title={'Sign Up'}/>
            
            <div className="signUpForm">
                <form method='POST' action="http://localhost:3000/api/users/signUp">
                    <table>
                        <tbody>
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
                                <td colSpan={2} className='buttons'>
                                    <button onSubmit={handleSubmit}>Join Now</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        </div>
    )
}