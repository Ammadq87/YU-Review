import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import './styles/NewSearch.css'
import { useState, useEffect } from 'react'
import axios from 'axios'

/*
ToDo:
- on click, the results panel needs to display and convert searchbars bottom radius corner to 90deg
*/
export default function NewSearch() {
    const exploreLbl = 'Explore other courses offered at YorkU';  
    
    const [searchInput, setSearchInput] = useState('');

    const [results, setResults] = useState([exploreLbl]);
    const [viewResult, setViewResult] = useState(false);

    const handleSearch = (e) => {
        if (e.key === 'Enter') {
            const value = searchInput?.toUpperCase().trim().split(' ').join('-');
            

            setResults(r => [searchInput, exploreLbl])
        }
    }



    const clearPanel = () => {
        setViewResult(false);

    }
    
    return (
        <div className="Search">
            <div className="SearchInput">
                <input 
                    onBlur={() => setViewResult(false)} 
                    onFocus={() => setViewResult(true)} 
                    onChange={(e) => setSearchInput(e.target.value)} 
                    onKeyPress={handleSearch} 
                    style={{
                        'borderBottomLeftRadius': viewResult ? '0px' : '5px'
                    }}
                    type="search" 
                    placeholder='Search for courses or professors'
                />
                <button 
                    style={{
                        'borderBottomRightRadius': viewResult ? '0px' : '5px'
                    }}>
                    <FontAwesomeIcon 
                        icon={faSearch}>
                    </FontAwesomeIcon>
                </button>
            </div>
            <div className="SearchResults">
                {
                    viewResult && 
                    results.map((result, i) => {
                        return (
                            <h5 key={i}><a href={result===exploreLbl ? '/Main' : '*'}>{result}</a></h5>
                        )
                    })
                }
            </div>
        </div>
    )
}