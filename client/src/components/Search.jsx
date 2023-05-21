import './styles/Search.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

export default function Search() {
    const [search, setSearch] = useState('');
    const [courseList, setCourseList] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const explore = 'Explore other courses offered at YorkU';

    const yorkApi = axios.create({
        baseURL: 'https://yorkapi.isaackogan.com/v1/courses/info/FW_2022'
    })
    

    useEffect(() => {
        getCourseData();
    }, [])

    
    const getCourseData = async () => {
        try {
            const res = await yorkApi.get('/codes');
            console.log(res['data']);
            setCourseList(res['data']);
        } catch (e) {
            console.log(e);
        }
    }

    const searchForCourse = () => {
        const value = search.toUpperCase().split(' ').join('-');
        let res = courseList.filter(course => {
            return course.includes(value);
        })

        if (!res)
            setSearchResults([explore]);
        if (res.length > 5) {
            setSearchResults(res.splice(4, res.length-4).push(explore));
        }
        setSearchResults([...res, explore]);
    }

    const generateLink = (code) => {
        if (code === explore)
            return '/';

        const regex = /\d/;

        // contains number
        if (regex.test(code)) {
            const lastDotIndex = code.lastIndexOf('.');
            return '/course/'+code.slice(0, lastDotIndex) + '-' + code.slice(lastDotIndex + 1);
        } else {
            return '/professor/'+code.split(' ').join('_');
        }
    }

    return (
        <div className="SearchBar">
            <div className="Search">
                <input type="text" placeholder="Search for courses or professors" onChange={e => setSearch(e.target.value)}/>
                <button onClick={searchForCourse}><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon></button>
            </div>
            <div className="SearchResults">
                {
                    searchResults.map(res => {
                        return (
                            <p>
                                <a href={generateLink(res)}>{res}</a>
                            </p>
                        )
                    })
                }
            </div>
        </div>
    );
}