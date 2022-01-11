import e = require('express');
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

exports.read = (req, res) => {
  console.log(req.profile)
  req.profile.hashed_password = undefined;
  req.profile.salt = undefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          err: 'You are not authorized to perform this action'
        });
      }
      req.profile.hashed_password = undefined;
      req.profile.salt = undefined;
      res.json(user);
    });

}