import * as express from 'express';
const router = express.Router();

const { create, productById, read, remove, update, list } = require('../controllers/product.controller');
const { requireSignin, isAuth, isAdmin } = require('../controllers/auth.controller');
const { userById } = require('../controllers/user.controller');

router.get('/product/:productId', read);
router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/products', list);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;