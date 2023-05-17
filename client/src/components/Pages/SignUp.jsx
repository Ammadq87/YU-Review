import Banner from '../Banner';
import Navbar from '../Navbar.jsx';
import '../../styles/Pages/SignUp.css'
import { useState } from 'react';
import axios from 'axios';

/*
ToDo:
Remove other fields from signup page and move the fields to the my profile page where user sets up their profile
*/

export default function SignUp(props) {
    const bannerData = {
        title: props?.data?.title ? props.data.title : 'Sign Up', // Temp
        subtitle: props?.data?.subtitle ? props.data.subtitle : '',
        extend: false,
        favouritable: false
    };

    const fields = [
        {label: 'First Name', type: 'text'}, 
        {label: 'Last Name', type: 'text'},
        {label: 'Email', type: 'email'},
        {label: 'Password', type: 'password'},
        {label: 'Confirm Password', type: 'password'}
    ];

    const api = axios.create({
        baseURL: 'http://localhost:3000/api'
    })

    const [formInput, setFormInput] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Password: '',
        ConfirmPassword: ''
    })

    const handleFormChange = (e, field) => {
        const value = e.target.value;
        setFormInput({...formInput, [field.split(' ').join('')]: value});
    }

    const GenerateField = (field, i) => {
        return (
            <tr key={i}>
                <td className='field'>
                    <label htmlFor="">{field.label}:</label>
                    <input type={field.type} onChange={e => handleFormChange(e, field.label)}/>
                </td>
            </tr>
        )
    }

    const handleSubmit = async () => {
        const res = await api.post('/users/signUp/', formInput);
        console.log(res);
    } 

    return (
        <div className="SignUpPage">
            <Navbar/>
            <Banner data={bannerData}/>
            
            <div className="signUpForm">

                <div className='image'>
                    <img src="https://yorkulions.ca/images/2020/5/20/10199_YUAT_Lions_RGB_black_lion_black_YU.png" alt="" />
                </div>

                <div className="form">
                    <table>
                        <tbody>
                            {
                                fields.map((field, i) => {
                                    return (
                                        GenerateField(field, i)
                                    )
                                })
                            }

                            <tr>
                                <td className='actionItems'>
                                    <button type='button' onClick={handleSubmit}>Get Started!</button>
                                    <a href="/Login">Already have an account?</a>
                                </td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}