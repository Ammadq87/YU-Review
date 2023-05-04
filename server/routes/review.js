const express = require('express');
const router = express();
const reviewDAO = require('../DAO/reviewDAO.js');

router.get('/', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getAllCourseReviews();
    res.json(reviews);
})

router.get('/:courseCode', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getCourseReviews(req.params.courseCode);
    res.json(reviews);
})

module.exports = router;