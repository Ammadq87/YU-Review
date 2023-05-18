import Banner from "../components/Banner";
import Navbar from "../components/Navbar";
import axios from 'axios';
import { useEffect, useState } from "react";
import Review from '../components/Review.jsx';

/**
 * @deprecated split into Course and Professor components
 * @param {object} props Fields - isCourse: boolean | value: string (course title or prof name)
 * @returns 
 */
export default function ReviewPage(props) {
    
    const [reviewsList, setReviewsList] = useState([]);
    const reviewPageData = {
        description: '', // check for isCourse when setting up
        score1: {
            name: '',
            score: 0
        },
        score2: {
            name: '',
            score: 0
        },
        totalRatings: 0,
        totalReviews: 0,
        liked: 0
    }

    useEffect(() => {
        getReviewData();
    }, [])
    
    const bannerData = {
        title: props?.data?.title ? props.data.title : 'EECS 3311', // Temp
        subtitle: props?.data?.subtitle ? props.data.subtitle : 'Software Design',
        extend: true,
        favouritable: true
    };

    const api = axios.create({
        baseURL: 'http://localhost:3000/api'
    });

    const getPageData = async () => {

    }

    const getReviewData = async () => {
        if (!props || !props.data)
            console.log('No data provided');
        else {
            const res = await api.get(`/review/${props.data.value}`);
            setReviewsList(res['data'])
        }
    }

    return (
        <div className="ReviewPage">
            <Navbar/>
            <Banner data={bannerData}/>

            <div className="ReviewPageContent">

                {
                    reviewsList.map((review,i) => {
                        return (
                            <Review key={i}/>
                        )
                    })
                }

            </div>

        </div>
    )
}