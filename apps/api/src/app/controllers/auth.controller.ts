import User from '../models/user.model';
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.signup = (req, res) => {
  console.log('req.body', req.body);
  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    res.json({
      user
    });
  });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json(
        { err: 'User with that email does not exist. Please signup' }
      );
    }

    if (!user.authenticate(password)) {
      return res.status(401).json({ err: 'Email and password dont match' });
    }
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    const { _id, name, email, role } = user;
    return res.json({ token, user: { _id, name, email, role } });
  });
}

exports.signout = (req, res) => {
  res.json({ message: 'Signout success'})
}

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
  userProperty: 'auth'
});

exports.isAuth = (req, res, next) => {
  console.log(req.profile._id);
  console.log(req.auth._id);
  
  let user = req.profile && req.auth && req.profile._id.toString() === req.auth._id.toString();
  if (!user) {
    return res.status(403).json({
      err: 'Access denied'
    });
  }
  next();
}

exports.isAdmin = (req, res, next) => {
  if(req.profile.role === 0)   {
    return res.status(403).json({
      err: 'Admin resource! Access denied'
    });
  }
  next();
}