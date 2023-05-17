const express = require('express');
const router = express();
const usersDAO = require('./../DAO/usersDAO');

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