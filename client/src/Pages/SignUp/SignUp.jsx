import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './SignUp.css'
import Form from '../../components/Form/Form';
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

    return (
        <div className="SignUpPage">
            <Banner data={bannerData}/>
            
            <div className="signUpForm">

                <div className='image'>
                    <img src="https://yorkulions.ca/images/2020/5/20/10199_YUAT_Lions_RGB_black_lion_black_YU.png" alt="" />
                </div>

                <Form data={{'fields': fields, 'endPoint': '/users/signUp/'}}/>
            </div>
        </div>
    )
}