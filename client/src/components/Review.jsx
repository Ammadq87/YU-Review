import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faStarHalf, faUpLong, faDownLong } from '@fortawesome/free-solid-svg-icons'
import './styles/Review.css'

/*
ToDo:
- separate GenerateStar and GenerateUpVote components into separate components
    -- only do this if necessary    
- improves readabiliy 
*/

export default function Review(props) {
    const easyScore = new ScoreData('Easy', props?.data?.Easiness);
    const usefulScore = new ScoreData('Usefulness', props?.data?.Usefulness);
    const color = '#407edf';
    const professorLink = `/professor/${props?.data?.ProfessorID}`;
    
    return (

        <div className="reviewBlock">

            <div className="profilePanel">
                <div className="profile">
                    <div className="background" style={{'backgroundColor': color }}>
                    </div>
                </div>
            </div>

            <div className="reviewPanel">
                <div className="reviewContent">
                    {props?.data?.Review}
                </div>

                <div className="reviewFooter">
                    <p>— {props?.data?.Username}, {props?.data?.Major} student, {props?.data?.DatePosted !== 0 ? `${props?.data?.DatePosted} days ago` : 'posted recently'}, taught by <a href={professorLink}>{props?.data?.Professor}</a></p>
                </div>

                <div className="reviewVote">
                    {GenerateVoteUI(true, props?.data?.Likes)}
                    {GenerateVoteUI(false, props?.data?.Dislikes)}
                </div>

            </div>

            <div className="scoresPanel">
                {GenerateScore(easyScore)}  
                {GenerateScore(usefulScore)}
                {GenerateTags('Liked', props?.data?.Liked)}
                {GenerateTags('Would Retake', props?.data?.Retake)}
            </div>

        </div>

    )
}

const GenerateTags = (name, num) => {
    return (
        <div className='tag'>
            {
                num === 1 && <p>{name}</p>  
            }
        </div>
    )
}

/**
 * Generates full and half stars based on the review rating
 * @param {number} num Rating number for review 
 * @returns FontAwesomeIcon star and half-star icons
 */
const GenerateStars = (num) => {
    const stars = [];

    const fullStars = (num) => {
        for (let i=0; i<Math.floor(num); i++)
            stars.push(<FontAwesomeIcon style={{'color': 'gold'}} key={i} icon={faStar}/>);
    }

    const halfStar = (num) => {
        if (num - Math.floor(num) != 0)
            stars.push(<FontAwesomeIcon style={{'color': 'gold'}} key={stars.length} icon={faStarHalf}/>)
    }

    fullStars(num);
    halfStar(num);

    return (
        <div className='stars'>
            {
                stars.map(s => {
                    return (
                        s
                    )
                })
            }
        </div>
    )
}

/**
 * Generates UI for the individual score ratings
 * @param {ScoreData} scoreData Object containing label and ratings 
 */
const GenerateScore = (scoreData) => {
    return (
        <div className='score'>
            <p className='label'>{scoreData.label}:</p>
            {GenerateStars(scoreData.score)}
        </div>
    )
}

/**
 * 
 * @param {boolean} isUpVote 
 * @returns 
 */
const GenerateVoteUI = (isUpVote, value) => {
    return (
        <div className='vote'>
            <button>
                <FontAwesomeIcon icon={isUpVote ? faUpLong : faDownLong}/>
            </button>
            <p style={{'display': 'inline' }}>{value}</p>
        </div>
    )
}

class ScoreData {
   constructor(label, score) {
    this.label = label;
    this.score = score;
   }
}