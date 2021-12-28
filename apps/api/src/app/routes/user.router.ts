import * as express from 'express';
const router = express.Router();

const { requireSignin } = require('../controllers/auth.controller');

const {
  userById
} = require('../controllers/user.controller');

router.get('/secret/:userId', requireSignin, (req: any, res) => {
  res.json({
    user: req.profile
  })
});

router.param('userId', userById);

module.exports = router;