import {useParams} from 'react-router-dom'
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import Review from '../components/Review'
import axios from 'axios';
import './styles/Course.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faHeart, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

/*
TODO:

*/

export default function Course () {
    let {courseCode} = useParams();
    let title; 

    if (location.toString().includes('course')) {
        const lastDotIndex = courseCode.lastIndexOf('-');
        courseCode = courseCode.slice(0, lastDotIndex) + '.' + courseCode.slice(lastDotIndex + 1);
        title = courseCode.substring(3, 12).split('-').join(' ')
    } else {
        title = courseCode.split('_').join(' ');
    }  

    // Dictionary object containing general page information and review information
    const [pageData, setPageData] = useState({});
    const [bannerData, setBannerData] = useState({});

    //#region API Setup
    const yorkApi = axios.create({
        baseURL: 'https://yorkapi.isaackogan.com/v1/courses/info/FW_2022'
    });

    const dbApi = axios.create({
        baseURL: 'http://localhost:3000/api'
    })
    //#endregion

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        setBannerData({
            title: title,
            subtitle: pageData?.PageData?.data?.title,
            extend: true
        })
    }, [pageData]);


    const getData = async () => {
        try {
            let generalInfo;
            let reviewInfo;
            if (location.toString().includes('course')) {
                generalInfo = await yorkApi.get(`/${courseCode}/schedule`);
                reviewInfo = await dbApi.get(`/review/course/${courseCode}`); // ToDo - need to change route to be more specific
            } else {
                generalInfo = await yorkApi.get(`/${courseCode}`);
                reviewInfo = await api.get(`/review/professor/${courseCode}`); // ToDo - need to change route to be more specific
            } 

            const data = {
                'PageData': generalInfo,
                'ReviewData': reviewInfo
            };

            console.log(data);
            setPageData(data);

        } catch (err) {
            console.log(err);
        }
    }
    

    return (
        <div className="ReviewPage">
            <Navbar/>
            <Banner data={bannerData}/>

            <div className="ReviewPageContent">
                <div className="details">
                    <div className="description">
                        {/* <p>{pageData?.PageData?.data?.[0]?.Description}</p> */}
                    </div>
                    <div className="actions">
                        <div className="ratingActions">
                            <div className="ratings">
                                <p>Opinions on {title}?</p>
                                <div className="buttons">
                                    <a href='/' className='icon'><FontAwesomeIcon icon={faThumbsUp}/></a>
                                    <a href='/' className='icon'><FontAwesomeIcon icon={faThumbsDown}/></a>
                                </div>
                            </div>
                            <div className="reviewBtn">
                                <button className='reviewBtn'>Add a Review</button>
                            </div>
                        </div>
                        <div className="otherActions">
                            <p>Course actions: </p>
                            <p className='favouriteBtn'><a href='/'><FontAwesomeIcon icon={faHeart}/></a></p>
                            <p className='takenCourseBtn'><a href='/' ><FontAwesomeIcon icon={faCirclePlus}/></a></p>
                        </div>
                    </div>
                    <div className="reviews">
                        {
                            pageData?.ReviewData?.data?.map((data, i) => {
                                return (
                                    <Review key={i} data={data}>hi</Review>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}