import Banner from "../Banner"
import Navbar from "../Navbar"

export default function ReviewPage(props) {
    const bannerData = {
        title: props?.data?.title ? props.data.title : 'EECS 3311', // Temp
        subtitle: props?.data?.subtitle ? props.data.subtitle : 'Software Design',
        extend: true,
        favouritable: true
    };
    
    return (
        <div className="RaviewPage">
            <Navbar/>
            <Banner data={bannerData}/>

            <div className="ReviewPageContent">

            </div>

        </div>
    )
}