const express = require('express');
const router = express.Router();

const { login, registration,send } = require('../controller/userController')
router.post('/registration', registration)
router.post('/login', login)
router.post('/send',send)

module.exports = router;