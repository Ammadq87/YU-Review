const express = require('express');
const router = express();
const usersDAO = require('./../DAO/usersDAO');

router.post('/signUp', (req, res) => {
    console.log(req.body);
    const _usersDAO = new usersDAO.usersDAO();
    const registerMessage = _usersDAO.registerUser(req.body)
    res.send(registerMessage);
})

module.exports = router;