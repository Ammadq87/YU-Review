import NewNavbar from "../../components/Navbar/NewNavbar"
import Banner from "../../components/Banner/Banner"
import Form from "../../components/Form/Form"
import utils from "../../models/utils"

// data = {type: string -> course || professor, value: string -> EECS3311 || Hadi_Hemmati }
export default function ReviewPage (props) {
    const {type, value} = props?.data;
    const _value = formatSubtitle(type, value);
    const bannerData = {
        'title': 'Leave a Review for',
        'subtitle': _value,
        'extend': true
    }
 
    const fields = [
        {label: 'Review', type: 'text'},
        {label: type === 'course' ? 'Easiness' : 'Engaging', type: 'range'},
        {label: type === 'course' ? 'Usefulness' : 'Clarity', type: 'range'},
        {label: 'Liked', type: 'checkbox'},
        {label: 'Retake', type: 'checkbox'}
    ]

    if (type === 'course') {
        fields.push({label: 'Professor Name', type: 'text'});
    } else if (type === 'professor') {
        fields.push({label: 'Course Code', type: 'text'});
    }
    
    const formData = {
        'fields': fields, 
        'type': 'Review',
        'reviewType': type
    }

    return (
        <div className="ReviewPage">
            <Banner data={bannerData}/>

            <Form data={formData}/>

        </div>
    )
}

const formatSubtitle = (type, value) => {
    if (!type)
        return `this ${location.href.split('/')[3]}`

    if (type === 'course' || type === 'professor')
        return new utils().formatCode(value, type);    
    
    return `this ${type}`;
}