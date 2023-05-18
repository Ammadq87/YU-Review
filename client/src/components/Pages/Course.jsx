import {useParams} from 'react-router-dom'
import Banner from "../Banner";
import Navbar from "../Navbar";
import axios from 'axios';
import { useEffect, useState } from "react";
import Review from '../Review.jsx';

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
                            {/* {pageData['Description']} */}
                        </p>
                    </div>
                    <div className="scores">
                    </div>
                </div>
            </div>

        </div>
    )
}