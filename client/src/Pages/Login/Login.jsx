import Banner from '../../components/Banner/Banner';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Form from '../../components/Form/Form';
import './Login.css'
import { useState } from 'react';
import axios from 'axios';

export default function Login(props) {

    const bannerData = {
        title: props?.data?.title ? props.data.title : 'Login', // Temp
        subtitle: props?.data?.subtitle ? props.data.subtitle : '',
        extend: false,
        favouritable: false
    };

    const fields = [
        {label: 'Email', type: 'email'}, 
        {label: 'Password', type: 'password'},
    ]

    return (
        <div className="loginPage">
            <Banner data={bannerData}/>
            <div className="loginForm">
                
                <Form data={{'fields': fields, 'endPoint': '/users/login/', 'type': 'Login'}}/>

                <div className='image'>
                    <img src="https://yorkulions.ca/images/2020/5/20/10199_YUAT_Lions_RGB_black_lion_black_YU.png" alt="" />
                </div>

            </div>

        </div>
    )
}