import Banner from '../components/Banner';
import Navbar from '../components/Navbar.jsx';
import './styles/Login.css'
import { useState } from 'react';
import axios from 'axios';

export default function Login(props) {

    const bannerData = {
        title: props?.data?.title ? props.data.title : 'Login', // Temp
        subtitle: props?.data?.subtitle ? props.data.subtitle : '',
        extend: false,
        favouritable: false
    };

    const [errorMsg, setErrorMsg] = useState('');
    
    
    function handleErrorMsg (msg) {
        setErrorMsg(msg);
    }

    const fields = [
        {label: 'Email', type: 'email'}, 
        {label: 'Password', type: 'password'},
    ]

    const [formInput, setFormInput] = useState({
        Email: '',
        Password: ''
    })

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

    const handleFormChange = (e, field) => {
        const value = e.target.value;
        setFormInput({...formInput, [field.split(' ').join('')]: value});
    }

    const api = axios.create({
        baseURL: 'http://localhost:3000/api'
    })

    const handleSubmit = async () => {
        let res;
        try {
            res = await api.post('/users/login/', formInput);
            if (res.status === 200) {
                handleErrorMsg('Logged In');
                location.href = '/'
            } 
        } catch (e) {
            handleErrorMsg('Invalid Credentials');
        }
        
    } 

    return (
        <div className="loginPage">
            <Navbar/>
            <Banner data={bannerData}/>
            <div className="loginForm">
                <form action="">
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
                                    <button type='button' onClick={handleSubmit}>Log In</button>
                                    <a href="/SignUp">Sign Up?</a>
                                    <a href="">Forgot Password?</a>
                                    <p>{errorMsg}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>

                <div className='image'>
                    <img src="https://yorkulions.ca/images/2020/5/20/10199_YUAT_Lions_RGB_black_lion_black_YU.png" alt="" />
                </div>

            </div>

        </div>
    )
}