const express = require('express');
const router = express();
const courseDAO = require('../DAO/courseDAO.js');

// Should only retrieve information related to courses excluding reviews

router.get('/', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const courses = await _courseDAO.getAllCourses();
    res.json(courses);
})

router.get('/:code', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const course = await _courseDAO.getCourseInformation(req.params.code);
    res.json(course);
})

router.get('/:code/professors', async (req, res) => {
    const _courseDAO = new courseDAO.courseDAO();
    const courses = await _courseDAO.getProfessorsTeachingCourse(req.params.code);
    res.json(courses);
})

module.exports = router;
// method='POST' action="http://localhost:3000/api/users/signUp"