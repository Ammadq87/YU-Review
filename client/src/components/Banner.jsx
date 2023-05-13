import '../styles/Banner.css'

/*
ToDo:
- Banner is a global component
- Should be used in all pages
- Replace text in Banner, show main stats here
*/

export default function Banner (props) {
    return (
        <div className="Banner">
            <p>{props.title}</p>
        </div>
    )
}