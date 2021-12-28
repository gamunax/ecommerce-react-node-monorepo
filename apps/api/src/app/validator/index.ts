const { check, validationResult } = require('express-validator');

exports.userSignupValidator = [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Email must be between 3 to 32 characters')
    .matches(/.+\@.+\..+/)
    .withMessage('Email must be contain @')
    .isLength({
      min: 4,
      max: 32
    }),
  check('password', 'Password is required').not().isEmpty(),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must contain at least 6 characters')
    .matches(/\d/)
    .withMessage('Password must contain a number')
];

exports.validateResults = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array().map(error => error.msg)[0];
    return res.status(400).json({ errors: firstError });
  }
  next();
}