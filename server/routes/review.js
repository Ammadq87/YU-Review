const express = require('express');
const router = express();
const reviewDAO = require('../DAO/reviewDAO.js');

/*
Actions:

* 1. get all reviews [DONE]
* 2. get course-based reviews [DONE]
* 3. get professor-based reviews [DONE]
4. add review 
    a. update review
        - ran when user has already added a review but they want to review again
        - prevents review bombing
5. like/unlike a review 
*    a. for course [DONE]
    b. for professor 
*/

router.get('/', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getAllCourseReviews();
    res.json(reviews);
})

router.get('/course/:courseCode', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getCourseReviewsByCode(req.params.courseCode);
    res.json(reviews);
})

/**
 * name must be in this format => firstname_lastname
 */
router.get('/professor/:name', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const reviews = await _reviewDAO.getProfessorReviews(req.params.name);
    res.json(reviews);
})

router.post('/course/:courseCode', async (req,res) => {

})

router.post('/professor/:professorID', async (req,res) => {
    
})

/**
 * req.body = {
 *  'vote': number,
 *  'reviewID': number,
 *  'studentID': number
 * }
 */
router.post('/voteCourseReview', async (req, res) => {
    const _reviewDAO = new reviewDAO.reviewDAO();
    const [vote, sID, rID] = [req.body['vote'], req.body['reviewID'],req.body['studentID']]
    await _reviewDAO.voteCourseReview(sID, rID, vote);
    res.send("Up/Down Vote Success");
})

module.exports = router;