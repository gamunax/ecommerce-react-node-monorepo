import Category from '../models/category.model.';
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  try {
    const category = new Category(req.body);
    category.save((err, data) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err)
        });
      }
      res.json({ data });
    });  
  } catch (error) {
    res.status(500).json({err: 'An error ocurred'});
  }
  
}

exports.categoryById = (req, res, next, id) => {
  Category.findById(id).exec((err, category) => {
    if (err || !category) {
      return res.status(400).json({
        err: 'Category does not exist'
      });
    }
    req.category = category;
    next();
  });
}

exports.read = (req, res) => {
  return res.json(req.category);
}

exports.update = (req, res) => {
  const category = req.category;
  category.name = req.body.name;
  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    res.json(data);
  });
}

exports.remove = (req, res) => {
  const category = req.category;
  category.remove((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    res.json({ message: 'Category deleted' });
  });
}

exports.list = (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    res.json(data);
  })
}