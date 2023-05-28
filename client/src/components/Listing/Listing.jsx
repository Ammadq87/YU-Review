import './Listing.css'
import { useEffect, useState } from 'react'
import axios from 'axios';

const pageSize = 25;

export default function Listing () {
    
    //#region Filter useStates
    const levelFilterBtns = ['1XXX', '2XXX', '3XXX', '4XXX'];
    const [showCourses, setShowCourses] = useState(true);
    const [levelFilter, setLevelFilter] = useState([0,0,0,0]);
    //#endregion

    const [courseList, setCourseList] = useState([]); 

    //#region LazyLoading Setup
    const [currentPage, setCurrentPage] = useState(1);

    // start and end index:
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentCourses = courseList?.slice(startIndex, endIndex);
    //#endregion

    useEffect(() => {
        getCourseData();
    }, [])

    const handleLevelFilter = (i) => {
        const updatedFilter = [...levelFilter];
        updatedFilter[i] = updatedFilter[i] === 0 ? 1 : 0;
        setLevelFilter(updatedFilter);
        filterResults();
    }

    const filterResults = () => {
        let currentResults = [...currentCourses];
        currentResults = currentResults.filter(course => {
            if (levelFilter[0] === 1 && course['CourseCode'].split('-')[2][0] === 1)
                return course;
        })
        console.log(currentResults);
        setCourseList(currentResults);
    }

    const db = axios.create({
        baseURL: 'http://localhost:3000/api/course/courseListings'
    });

    const getCourseData = async () => {
        try {
            const res = await db.get('/');
            const data = res['data'];
            setCourseList(data);
        } catch (err) {
            console.log(err);
        }
    };


    
    return (
        <div className="Listing">
            <div className="actions">
                <button onClick={() => setShowCourses(true)} style={{'borderTopLeftRadius': '5px', 'borderTopRightRadius': '0px', 'backgroundColor': showCourses ? '#E31837' : '#ECECEC', 'color': showCourses ? 'white' : '#747474' }}>Courses</button>
                <button onClick={() => setShowCourses(false)} style={{'borderTopLeftRadius': '0px', 'borderTopRightRadius': '5px', 'backgroundColor': !showCourses ? '#E31837' : '#ECECEC', 'color': !showCourses ? 'white' : '#747474'}}>Professors</button>
            </div>
            <div className="filters">
                <p>Filter(s)</p>
                <div className="filterActions">
                    <div className="levelFilter">
                        <p>Level:</p>
                        <div className="options">
                            {
                                levelFilterBtns.map((name, i) => {
                                    return (
                                        <button style={{'backgroundColor': levelFilter[i] === 0 ? '#C0BA99' : '#91D772' }} onClick={() => handleLevelFilter(i)} key={i}>{name}</button>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="ratingRange">
                        <p>Min # of Ratings:</p>
                        <div className="range">
                            <input type="range" />
                        </div>
                        <p>≥300</p>
                    </div>
                </div>
            </div>
            <div className="resultsPanel">
                    <table>
                    <tbody>
                        <tr>
                            <th>Course Code</th>
                            <th>Ratings</th>
                            <th>Useful</th>
                            <th>Easy</th>
                            <th>Liked</th>
                        </tr>
                        {
                            currentCourses.map((c, i) => {
                                return (
                                    GenerateRow(c,i)
                                )
                            })
                            
                        }
                    </tbody>
                </table>
                <div className="paginationControls">
                    <button onClick={() => setCurrentPage((p) => p-1)}disabled={endIndex === 1}>Show Prev {pageSize}</button>
                    <button onClick={() => setCurrentPage((p) => p+1)} disabled={endIndex >= courseList.length}>Show Next {pageSize}</button>
                </div>
            </div>
        </div>
    )
}

/**
 * Reformats course name to valid link 
 * @param {string} course course display name 
 * @returns link string
 */
const formatLink = (course) => {
    const lastDotIndex = course.lastIndexOf('.');
    return course.slice(0, lastDotIndex) + '-' + course.slice(lastDotIndex + 1);
};

const GenerateRow = (courseData, i) => {
    return (
        <tr key={i}>
            <td><a href={'/course/'+formatLink(courseData['CourseCode'])}>{courseData['CourseCode']}</a></td>
            <td>{courseData['Easy']}%</td>
            <td>{courseData['Useful']}%</td>
            <td>{courseData['Liked']}%</td>
            <td>{courseData['Total']}</td>
        </tr>
    )
}