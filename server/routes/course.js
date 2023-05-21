const express = require('express');
const router = express();
const courseDAO = require('../DAO/courseDAO.js');

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

router.get('/', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const courses = await _courseDAO.getAllCourses();
    res.json(courses);
})

// ToDo - add code to add courses -- might have to look into an API
router.post('/', async (req, res) => {
    
})

// Gets specific course information
router.get('/:code', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const course = await _courseDAO.getCourseInformation(req.params.code);
    res.json('deprecated');
})

// ToDo - implement search for courses
router.get('/search/:code', async (req,res) => {

})

// ToDo - Returns only professorID, need to return name
router.get('/:code/professors', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const courses = await _courseDAO.getProfessorsTeachingCourse(req.params.code);
    res.json(courses);
})

module.exports = router;