import * as express from 'express';
const router = express.Router();

const { signup, signin, signout, requireSignin } = require('../controllers/auth.controller');
const {userSignupValidator, validateResults} = require('../validator');

router.post('/signup', userSignupValidator, validateResults, signup);
router.post('/signin', signin);
router.get('/signout', signout);

router.get('/hello', requireSignin, (req, res) => {
  res.send('Hello there');
});

module.exports = router;