const express = require('express');
const router = express();
const usersDAO = require('./../DAO/usersDAO');

/*
MiddleWares:
1. logged-in authentication?

Actions:
1. sign up
2. login in
3. update information for
    a. Newly Signed-Up User
        - application will ask for information after successful sign-up
    b. Current User
4. add friend
5. remove friend
6. add course to 'favourites'
7. add course to 'already taken'
8. add course to 'currently taking'
9. add professor to 'favourites'
10. add professor to 'already taken'
11. add professor to 'currently taking'
12. view friends/users:
    a. friends
    b. favourite, already taken, and currently taken courses and professors
*/

router.post('/signUp', async (req, res) => {
    try {
        const _usersDAO = new usersDAO.usersDAO();
        const registerMessage = await _usersDAO.registerUser(req.body)
        res.send(registerMessage)
    } catch (e) {
        res.send('Email Already Exists');
    }
})

router.post('/login', async (req, res) => {
    try {
        console.log(JSON.stringify(req.body))
        const _usersDAO = new usersDAO.usersDAO();
        const loginStatus = await _usersDAO.loginUser(req.body);
        res.send(loginStatus);
    } catch (e) {
        res.status(401).send('Invalid Credentials');
    }
})

module.exports = router;