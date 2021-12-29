import * as express from 'express';
const router = express.Router();

const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');

const {
  userById
} = require('../controllers/user.controller');

router.param('userId', userById);

router.get('/secret/:userId', requireSignin, isAuth, isAdmin, (req: any, res) => {
  res.json({
    user: req.profile
  })
});

module.exports = router;