import './Banner.css'

/**
 * Banner component used for every page to display the title and any subtitles 
 * @param {object} props includes 'data' json which includes title:string, subtitle:string, extend:boolean, and favouritable:boolean 
 * @returns 
 */
export default function Banner (props) {
    const bottomPosition = '20%';
    return (
        <div className="Banner" style={{'height': props?.data?.extend?'150px':'100px'}}>
            <h1 style={{'bottom': props?.data?.subtitle ? bottomPosition : '0%'}}>
                {props?.data?.title}
            </h1>          
            <h2>{props?.data?.subtitle}</h2>
        </div>
    )
}