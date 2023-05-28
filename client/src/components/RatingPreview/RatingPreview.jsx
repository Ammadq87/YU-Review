import axios from "axios";
import { useEffect, useState } from "react";
import './RatingPreview.css'

/**
 * Displays the percentages for the ratings based course/professor
 * @param {object} props data => {type: 'course' || 'professor', code: courseCode || professorName}
 * @returns 
 */

export default function RatingPreview (props) {
    
    const [previewList, setPreviewList] = useState([]);
    useEffect(() => {
        getRatingPreviewData();
    }, [])

    const db = axios.create({
        baseURL: `http://localhost:3000/api/${props?.data?.type}`
    }); 
    
    const getRatingPreviewData = async () => {
        try {
            const res = await db.get(`/ratingPreview/${props?.data?.code}`);
            const data = res['data'];
            setPreviewList(data);
        } catch(err) {
            console.log(err);
        }
    } 

    return (
        <div className="RatingPreview">
            <div className="labels">
                {
                    previewList.map((preview, i) => {
                        return (
                            <div key={i} className="previewLabel">
                                <p className="value">{preview['value']}</p>
                                <p className="label">{preview['label']}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}