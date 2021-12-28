const express = require('express');
const router = express.Router();

const { signup, signin } = require('../controllers/user.controller');
const {userSignupValidator, validateResults} = require('../validator');

router.post('/signup', userSignupValidator, validateResults, signup);
router.post('/signin', signin);

module.exports = router;