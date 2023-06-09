import { useEffect, useState } from "react";
import './styles/CourseSchedule.css'

export default function CourseSchedule (props) {

    if (!props || !props.pageData) {
        return <div>Loading...</div>;
    }

    const [rowData, setRowData] = useState(props?.pageData);

    return (
        <div className="timetable">
            <table>
                <tbody>
                    <tr>
                        <th>Section</th>
                        <th>Time</th>
                        <th>Days</th>
                        <th>Location</th>
                        <th>Instructor</th>
                    </tr>
                    <tr>
                        <td colSpan={5} className="line">
                            <hr />
                        </td>
                    </tr>
                    {
                        rowData.map((data,i) => {
                            return (
                                GenerateRow(data, i)
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const GenerateRow = (data, i) => {
    return (
        <tr key={i} className="row">
            <td className="section">{data.section}</td>
            <td className="time">{GetTime(data)[0]} — {GetTime(data)[1]}</td>
            <td className="days">
                {
                    FormatDays(GetDays(data)).map((day, i) => {
                        return (
                            <p key={i} style={{'display':'inline'}}>
                                {day}
                            </p>
                        )
                    })
                }
            </td>
            <td className="location">{GetLocation(data)}</td>
            <td className="instructor">{GetInstructor(data).map((prof,i) => {
                return (
                    <p key={i}>{prof}</p>
                )
            })}</td>
            
        </tr>
        
    )
}

const GetInstructor = (rowData) => {
    const data = rowData?.classes?.[0];
    const profs = [];
    const instructors = data?.instructors;
    if (!instructors)
      return ['---'];
      instructors.forEach(prof => {
        if (!profs.includes(prof))
            profs.push(prof);
    });

    let profLinks = profs.map(prof => {
        return <a href={`/professor/${prof.split(' ').join('_')}`}>{prof}</a> 
    })

    return profLinks;
}

const GetLocation = (rowData) => {
    const data = rowData?.classes?.[0];
    const rooms = [];
    const schedule = data?.schedule;
    if (!schedule)
      return ['---'];
    schedule.forEach(slot => {
        if (!rooms.includes(slot.room))
            rooms.push(slot.room);
    });
    return rooms.join(' / ');
}

const GetTime = (rowData) => {
    const timeInfo = rowData?.classes?.[0].schedule[0];
    if (!timeInfo || !timeInfo.time) 
        return ['---', '---'];
    
    let startTime = timeInfo?.time?.split(':');
    const d = parseFloat(timeInfo['duration']);
    const h = parseInt(startTime[0])
    let m = parseFloat(startTime[1]);
    let endTime = ""+(h + m/60 + d/60);

    if (endTime.includes('.25'))
        endTime = endTime.replace('.25', ':15')    
    else if (endTime.includes('.5'))
        endTime = endTime.replace('.5', ':30')    
    else if (endTime.includes('.75'))
        endTime = endTime.replace('.75', ':45')    
    else
        endTime += ":00";
    return [timeInfo.time, endTime];
}

const FormatDays = (selectedDays) => {
    const days = ['M','T','W','R','F','S','Su']
    const output = [];
    days.forEach(day => {
        if (selectedDays.includes(day))
            output.push(<span className="bold">{day}</span>)
        else
            output.push(<span>{day}</span>)
    });
    return output;
}

const GetDays = (rowData) => {
    const data = rowData?.classes?.[0];
    const days = [];
    const schedule = data?.schedule;
    if (!schedule)
      return ['---'];
    schedule.forEach(slot => {
      days.push(slot.day);
    });
    return days;
}
  