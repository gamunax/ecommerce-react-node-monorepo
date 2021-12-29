import * as express from 'express';
const router = express.Router();

const { create } = require('../controllers/category.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');
const {
  userById
} = require('../controllers/user.controller');

router.param('userId', userById);
router.post('/category/create/:userId', requireSignin, isAuth, isAdmin, create);

module.exports = router;