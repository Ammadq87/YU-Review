/*
    Purpose: configure filter options and return a filter object to query later
    filter options:
        1. course code
        2. # of ratings
        3. course type => LE, AP, etc

    data {
        filters: [
            {
                filterName: string,
                filterType: string => 'button', 'range',
                filterValues: [x,y,z] => if filterType 'range', only retrieve filterValues[0]  
            }
        ]
    }
*/

import { useEffect, useState } from "react";
import './Filter.css'

export default function Filter(props) {
    const {filters} = props?.data;

    //#region UseStates:
    const [selectedFilter, setSelectedFilter] = useState({});

    const handleSelectedFilterBtn = (value, filter) => {
        let _selectedFilterBtn = [];

        if (filter in selectedFilter)
            _selectedFilterBtn = selectedFilter[filter];

        if (_selectedFilterBtn.includes(value)) {
            const i = _selectedFilterBtn.indexOf(value);
            _selectedFilterBtn.splice(i, 1);
        } else {
            _selectedFilterBtn.push(value);
        }

        setSelectedFilter({...selectedFilter, [filter]: _selectedFilterBtn});
    }

    const handleSelectedRangeInput = (e, filter) => {
        setSelectedFilter({...selectedFilter, [filter]: e.target.value})
    }
    //#endregion

    //#region UseEffects:
    useEffect(() => {
        props?.setFilters(selectedFilter);
    }, [selectedFilter])
    //#endregion

    const GenerateFilter = (filter, i) => {
        const {filterName, filterType, filterValues} = filter;
        
        if (filterType === 'button') {
            return (
                <div className="buttonFilter" key={i}>
                    <p className='filterText'>{filterName}:</p>
                    <div className="filterBtns">
                        {
                            filterValues.map((value, j) => {
                                return (
                                    <button 
                                        style={{backgroundColor: selectedFilter[filterName]?.includes(value) ? '#91D772' : '#C0BA99'}}
                                        onClick={() => handleSelectedFilterBtn(value, filterName)} key={j}>{value}</button>
                                )
                            })
                        }
                    </div>
                </div>
            )            
        } 
        
        else if(filterType === 'range') {
            return (
                <div className="rangeFilter" key={i}>
                    <p className="filterText">{filterName}:</p>
                    <input onChange={(e) => handleSelectedRangeInput(e, filterName)} type="range" min={0} max={filterValues[0]}/>
                    <p className="rangeText">≥{selectedFilter[filterName] ? selectedFilter[filterName] : filterValues[0]}</p>
                </div>
            )
        }
    }

    return (
        <div className="filterContainer">
            <p style={{
                fontSize: '20px',
                color: '#1E1E1E',
                fontWeight: 'bold'
            }}>Filter(s)</p>
            <div className="Filter">
                
                {
                    filters?.map((filter, i) => {
                        return (
                            GenerateFilter(filter, i)
                        )
                    })
                }
            </div>
        </div>

    )
}