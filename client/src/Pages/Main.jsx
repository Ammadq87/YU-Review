import Navbar from '../components/Navbar.jsx';
import Banner from '../components/Banner.jsx';
import Review from '../components/Review.jsx';
import axios from 'axios';
import './styles/Main.css'
import { useEffect, useState } from 'react';

export default function Main () {
    
    const [courseLinks, setCourseLinks] = useState([]);

    useEffect(() => {
        getCourseData();
    },[])

    const bannerData = {
        title: 'Courses and Professors at YorkU',
        subtitle: '',
        extend: false    
    }

    const yorkApi = axios.create({
        baseURL: 'https://yorkapi.isaackogan.com/v1/courses/info/FW_2022'
    });

    const getCourseData = async () => {
        try {
            const res = await yorkApi.get('/codes');
            let courseData = res['data'];
            
            courseData = courseData.map(c => {
                const lastDotIndex = c.lastIndexOf('.');
                c = c.slice(0, lastDotIndex) + '-' + c.slice(lastDotIndex + 1);
                return c;
            })

            setCourseLinks(courseData);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className='Main'>
            <Navbar/>
            <Banner data={bannerData}/>
            <div className="layout">
                {
                    courseLinks.map(link => {
                        return (
                            <a href={`/course/${link}`} style={{'display': 'block'}}>{link}</a>
                        )
                    })
                }
                
                {/* <a href="/course/LE-EECS-3311-3-00">EECS 3311</a> */}
                {/* <br /> */}
                {/* <a href="/course/LE-EECS-3101-3-00">EECS 3101</a> */}
                {/* <br /> */}
                {/* <a href="/course/BIOL1000">BIOL 1000</a> */}
                {/* <br /> */}
                {/* <a href="/course/MATH2030">MATH 2030</a> */}

            </div>
            
        </div>
    )
}