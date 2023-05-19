const express = require('express');
const router = express();
const reviewDAO = require('../DAO/reviewDAO.js');

/*
Actions:

1. get all reviews
2. get course-based reviews
3. get professor-based reviews
4. add review
    a. update review
        - ran when user has already added a review but they want to review again
        - prevents review bombing
5. like/unlike a review
*/

router.get('/', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getAllCourseReviews();
    res.json(reviews);
})

router.get('/course/:courseCode', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getCourseReviews(req.params.courseCode);
    res.json(reviews);
})

router.get('/professor/:professorID', async (req, res) => {
})

router.post('/course/:courseCode', async (req,res) => {

})

router.post('/professor/:professorID', async (req,res) => {
    
})

/**
 * vote: boolean
 * reviewID: number
 */
router.post('/:reviewID/:vote', async (req, res) => {
    const upVote = req.params.vote;
    const reviewID = req.params.reviewID;

    if (upVote) {

    } else {

    }
})

module.exports = router;