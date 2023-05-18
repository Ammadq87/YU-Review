import '../styles/Banner.css'

/*
ToDo:
- Banner is a global component
- Should be used in all pages
- Replace text in Banner, show main stats here
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

/*
props
    data
        title
        subtitle -- opt
        extend -- opt
        favourite -- only on ReviewPage
 data
    
 */