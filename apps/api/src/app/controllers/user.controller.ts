import User from '../models/user.model';

exports.userById = (req, res, next, id) => {
  User.findById(id).select('-hashed_password -salt').exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        err: 'User not found'
      });
    }
    req.profile = user;
    next();
  });
};