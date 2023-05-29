import './Opinion.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsDown, faThumbsUp, faHeart, faCirclePlus, faCalendarPlus } from '@fortawesome/free-solid-svg-icons'

const favouriteBtnStyle = {

}

export default function Opinion (props) {


    return (
        <div className="controls">

            <div className="rate">
                
                <h3 className="actionText">Taken {props?.data?.title}?</h3>
                
                <div className="links">
                    <a href='/' className='icon'><FontAwesomeIcon icon={faThumbsUp}/></a>
                    <a href='/' className='icon'><FontAwesomeIcon icon={faThumbsDown}/></a>
                </div>
                
                <div className="reviewBtn">
                    <button style={favouriteBtnStyle} className='reviewBtn'>Add a Review</button>
                </div>
            
            </div>

            <div className="otherContainer">
            
                <div className="other">
                    {GenerateAction('Favourite', faHeart)}
                    {GenerateAction('Calendar', faCalendarPlus)}
                </div>
            
            </div>

        </div>
    )
}

const GenerateAction = (label, value) => {
    return (
        <div className="opinion">
            <p className='value'><a style={{'color': label==='Calendar' ? '#407EDF' : '#E31837'}} href=''><FontAwesomeIcon icon={value}/></a></p>
            <p className='label'>{label}</p>
        </div>
    )
}

/*
<div className="actions">
            <div className="ratingActions">
                <div className="ratings">
                    <p>Opinions on {props?.data?.title}?</p>
                    <
                </div>
                <div className="reviewBtn">
                    <button className='reviewBtn'>Add a Review</button>
                </div>
            </div>
            <div className="otherActions">
                <p>Course actions: </p>
                <p className='favouriteBtn'><a href='/'><FontAwesomeIcon icon={faHeart}/></a></p>
                <p className='takenCourseBtn'><a href='/' ><FontAwesomeIcon icon={faCirclePlus}/></a></p>
            </div>
        </div>
*/