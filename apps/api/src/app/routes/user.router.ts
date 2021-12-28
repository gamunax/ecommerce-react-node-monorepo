const express = require('express');
const router = express.Router();

const { signup } = require('../controllers/user.controller');
const {userSignupValidator, validateResults} = require('../validator');

router.post('/signup', userSignupValidator, validateResults, signup);

module.exports = router;