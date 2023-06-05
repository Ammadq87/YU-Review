import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar.jsx';
import './SignUp.css'
import Form from '../../components/Form/Form';
import { useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faHeart, faCirclePlus, faLock } from '@fortawesome/free-solid-svg-icons'


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
        <div className="signUpPage">
            <h1>Sign Up</h1>
            
            <div className="multiColumn">
                <input className="textInput" placeholder='First Name' type='text'></input>
                <input className="textInput" placeholder='Second Name' type='text'></input>
            </div>

            <input className="textInput" placeholder='Email' type='email'></input>
            <input className="textInput" placeholder='Password' type='password'></input>
            <input className="textInput" placeholder='Confirm Password' type='password'></input>

            <a className="pageLink" href='/Login' style={{width: 'fit-content', color: '#3876F9', display: 'block', margin: '8px', marginBottom: '16px'}}>Already have an account?</a>
            <button className='selectedBtn'>Get Started!</button>
        </div>
    )
}