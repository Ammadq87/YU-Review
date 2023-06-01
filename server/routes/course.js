const express = require('express');
const router = express();
const courseDAO = require('../DAO/courseDAO.js');
const axios = require('axios');

/*
 Actions:
 1. get all courses
 2. add course (internal-use)
 3. get course specific information:
    - courseCode required
    - gets all information regarding course from CourseReview + Course
4. search for course
    - similar to (3) but have to use % operator
5. get all professors who have taught this course
 */

/**
 * Mid  dleware :: retrieves the york courses and course info and combines them together
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
let courseData = [];
// ToDo - remove middle and make it a proper function -- data does not seem to update
const setYorkCourseInfo = async (req, res, next) => {
    try {
        const courseListResponse = await axios.get('https://yorkapi.isaackogan.com/v1/courses/info/FW_2022/codes');
        
        const _courseDAO = new courseDAO.courseDAO();
        const listingInfo = await _courseDAO.getCourseListingInfo();
        
        const courseList = courseListResponse?.data;
    
        const listedCourses = [];
        listingInfo.forEach(course => {
            listedCourses.push(course['CourseCode']);
            courseData.push(course);
        });

        const filteredCourseList = courseList.filter((value) => !listedCourses.includes(value));
        filteredCourseList.forEach(course => {
            courseData.push({
                    'CourseCode': course, 
                    'Easiness': 0,
                    'Usefulness': 0,
                    'Liked': 0,
                    'Total': 0
                })
        })

        req.courseData = courseData;
        console.log(courseData[0]);
        next();
    } catch (error) {
        console.error(error);
        next(error);
    }
  };

router.get('/', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const courses = await _courseDAO.getAllCourses();
    res.json(courses);
})

// ToDo - add code to add courses -- might have to look into an API
router.post('/', async (req, res) => {
    
})

// Gets specific course information
// router.get('/:code', async (req, res) => {
    // const _courseDAO = new courseDAO.courseDAO();
    // const course = await _courseDAO.getCourseInformation(req.params.code);
    // res.json('deprecated');
// })

// ToDo - implement search for courses
router.get('/search/:code', async (req,res) => {

})

// ToDo - Returns only professorID, need to return name
router.get('/:code/professors', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const courses = await _courseDAO.getProfessorsTeachingCourse(req.params.code);
    res.json(courses);
})
  
router.get('/ratingPreview/:code', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const _code = reformtCourseCodeURL(1, req.params.code);
    const preview = await _courseDAO.getCourseRatingPreviewInfo(_code);
    const data = preview[0];

    const order = ['Liked', 'Easy', 'Useful', 'Comments'];
    const output = order.map(lbl => {
        return {'label': lbl, 'value': lbl !== 'Comments' ? (data ? data[lbl]+'%' : 'N/A') : (data ? data[lbl] : 'N/A')};
    })
    res.send(output);
})

router.get('/courseListings', setYorkCourseInfo, async (req, res) => {
    const courseData = req.courseData;
    res.send(courseData);
});

//#region Functions

/**
 * 
 * @param {number} format 0: dotted, 1:dashed
 * @param {string} code course code 
 */
const reformtCourseCodeURL = (format, code) => {
    const last = code.lastIndexOf(format === 0 ? '-' : '.');
    return code.substring(0,last) + '.' +code.substring(last+1, code.length);
}
//#endregion
module.exports = router;