import {useParams} from 'react-router-dom'
import Banner from "../../components/Banner/Banner.jsx";
import Opinion from '../../components/Opinion/Opinion.jsx';
import Review from '../../components/Review/Review';
import NewNavbar from '../../components/Navbar/NewNavbar';
import RatingPreview from '../../components/RatingPreview/RatingPreview';
import CourseSchedule from '../../components/CourseSchedule/CourseSchedule';
import axios from 'axios';
import './Course.css';
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faHeart, faCirclePlus } from '@fortawesome/free-solid-svg-icons'

export default function Course () {
    let {courseCode} = useParams();
    const ratingPreviewCode = courseCode;
    const [isFallTerm, setIsFallTerm] = useState(true);
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
    const [classesInfo, setClassesInfo] = useState({});

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
                /*
                 * Have to go through generalInfo of courses, traverse through each and get courses taught by prof
                 */
                generalInfo = await yorkApi.get(`/${courseCode}/teachers`);
                reviewInfo = await dbApi.get(`/review/professor/${courseCode}`); // ToDo - need to change route to be more specific
            } 

            const info = {
                'Fall': getSectionData(generalInfo, 'F'),
                'Winter': getSectionData(generalInfo, 'W')
            };

            const data = {
                'PageData': generalInfo,
                'ReviewData': reviewInfo,
                'ClassInfo': info
            };

            setClassesInfo(info);
            setPageData(data);
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    const getSectionData = (generalInfo, term) => {
        const sectionData = [];
        const sections = generalInfo['data']['sections'];
        for (let sectionKey in sections) {
            const section = sections[sectionKey];
            if (sections.hasOwnProperty(sectionKey)) {
                for (let key in section) {
                    if (section.hasOwnProperty(key)) {
                        if (section[key] === term) 
                            sectionData.push(section);
                    }
                }
            }
        }
        return sectionData;
    }

    return (
        <div className="ReviewPage">
            <Banner data={bannerData}/>

            <RatingPreview data={{'type': 'course', 'code': courseCode}}/>

            <div className="ReviewPageContent">
                <div className="details">
                    <div className="timeTable">

                        <h3>Course Schedule</h3>

                        <div className="terms">
                            <button onClick={() => setIsFallTerm(true)} style={
                                {'backgroundColor': isFallTerm ? 'rgb(227,24,55)' : 'lightgray',
                                'color': isFallTerm ? 'white' : 'rgb(81, 81, 81)' 
                                }
                                }>Fall 2022</button>
                            <button onClick={() => setIsFallTerm(false)} style={
                                {'backgroundColor': !isFallTerm ? 'rgb(227,24,55)' : 'lightgray',
                                'color': !isFallTerm ? 'white' : 'rgb(81, 81, 81)' 
                                }
                                }>Winter 2022</button>
                        </div>

                        {<CourseSchedule pageData={pageData?.ClassInfo?.[isFallTerm?'Fall':'Winter']}></CourseSchedule>}
                        {/* {!isFallTerm && <CourseSchedule pageData={pageData?.ClassInfo?.['Winter']}></CourseSchedule>} */}

                    </div>
                    
                    <Opinion data={{'title': title || 'the course'}}/>

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