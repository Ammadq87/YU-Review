import './Listing.css'
import { useEffect, useState } from 'react'
import Filter from './Filter';
import axios from 'axios';

const pageSize = 25;

export default function Listing () {
    
    //#region Filter useStates
    const [showCourses, setShowCourses] = useState(true);
    const [courseList, setCourseList] = useState([]); 
    const [listingObject, setListingObject] = useState('course');
    const [filter, setFilters] = useState({});

    const handleFilters = (_filter) => {
        setFilters(_filter);
    }

    const handleTabSwitch = (value) => {
        setShowCourses(value);
        setListingObject(value ? 'course' : 'professor')
    }
    //#endregion


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

    const db = axios.create({
        baseURL: 'http://localhost:3000/api'
    });

    const getCourseData = async () => {
        try {
            let data;
            if (listingObject === 'course') {
                const res = await db.get('/course/courseListings');
                data = res['data'];
            } else if (listingObject === 'professor') {
                const res = await db.get('/professor/professorListings');
                data = res['data'];
            }
            console.log(data)
            setCourseList(data);
        } catch (err) {
            console.log(err);
        }
    };

    const filterConfig = {
        'filters': [
            {
                filterName: 'Course Code',
                filterType: 'button',
                filterValues: ['1XXX', '2XXX', '3XXX', '4XXX']
            },
            {
                filterName: 'Min # of Ratings',
                filterType: 'range',
                filterValues: [courseList ? courseList.length : 0]
            }
        ]
    }
    
    return (
        <div className="Listing">
            <div className="actions">
                <button 
                    style={{backgroundColor: showCourses ? '#E31837' : '#ECECEC', color: showCourses ? 'white' : '#747474'}}
                    onClick={() => handleTabSwitch(true)}>Courses</button>
                <button 
                    style={{backgroundColor: showCourses ? '#ECECEC' : '#E31837', color: showCourses ? '#747474' : 'white'}}
                    onClick={() => handleTabSwitch(false)}>Professors</button>
            </div>
            <Filter data={filterConfig} setFilters={handleFilters}/>
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
                            currentCourses?.map((c, i) => {
                                return (
                                    GenerateRow(c,i)
                                )
                            })
                            
                        }
                    </tbody>
                </table>
                <div className="paginationControls">
                    <button onClick={() => setCurrentPage((p) => p-1)}disabled={endIndex === 1}>Show Prev {pageSize}</button>
                    <button onClick={() => setCurrentPage((p) => p+1)} disabled={endIndex >= courseList?.length}>Show Next {pageSize}</button>
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