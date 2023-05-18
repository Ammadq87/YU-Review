import {useParams} from 'react-router-dom'
import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import axios from 'axios';
import './styles/Course.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faHeart, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function Course () {
    const {courseCode} = useParams();
    const [bannerData, setBannerData] = useState({});
    const [pageData, setPageData] = useState({});

    //#region API Setup
    const api = axios.create({
        baseURL: 'http://localhost:3000/api'
    });
    //#endregion

    //#region UseEffect setup API Call
    useEffect(() => {
        getPageData();
    }, [])
    //#endregion

    //#region UseEffect to update banner
    useEffect(() => {
        setBannerData({
            title: pageData['CourseCode'],
            subtitle: pageData['Name'],
            extend: true,
            favouritable: true,
          });
        }, [pageData]);
    //#endregion

    const getPageData = async () => {
        try {
            const res = await api.get(`/course/${courseCode}`);
            setPageData(res['data'][0]);
            setBannerData({
                title: pageData['CourseCode'],
                subtitle: pageData['Name'],
                extend: true,
                favouritable: true
            })
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
                        <p>
                            {pageData['Description']}
                        </p>
                    </div>
            
                    <div className="actions">
                        <div className="ratingActions">
                            <div className="ratings">
                                <p>Share your thoughts on {pageData['CourseCode']}:</p>
                                <p className='icon'><FontAwesomeIcon icon={faThumbsUp}/></p>
                                <p className='icon'><FontAwesomeIcon icon={faThumbsDown}/></p>
                            </div>

                            <button className='reviewBtn'>Leave a Review</button>
                        </div>

                        <div className="otherActions">
                            <p>Course actions: </p>
                            <p className='favouriteBtn'><a href='/' ><FontAwesomeIcon icon={faHeart}/></a></p>
                            <p className='takenCourseBtn'><a href='/' ><FontAwesomeIcon icon={faCirclePlus}/></a></p>
                        </div>

                    </div>
                
                </div>
            </div>
        </div>
    )
}