const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

import Product from '../models/product.model';
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {

    if (err) {
      console.log('PHOTO UPLOAD ERROR ----->', err)
      return res.status(400).json({
        err: 'Image could not be uploaded'
      });
    }

    // * check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        err: 'All fields are required'
      });
    }

    let product = new Product(fields);
    if (files.photo) {
      if (files.photo.size > 1_000_000) {
        return res.status(400).json({
          err: 'Image should be less than 1mb in size'
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, results) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err)
        });
      }

      res.json(results);
    });
  });
}

exports.productById = (req, res, next, id) => {
  Product.findById(id).exec((err, product) => {
    if (err || !product) {
      return res.status(400).json({
        err: "Product not found"
      });
    }
    req.product = product;
    next();
  });
};

exports.read = (req, res) => {
  req.product.photo = undefined;
  return res.json(req.product);
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        err: errorHandler(err)
      });
    }
    res.json({
      deletedProduct,
      "message": 'Product deleted successfully'
    });
  });
}

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {

    if (err) {
      console.log('PHOTO UPLOAD ERROR ----->', err)
      return res.status(400).json({
        err: 'Image could not be uploaded'
      });
    }

    // * check for all fields
    const { name, description, price, category, quantity, shipping } = fields;

    if (!name || !description || !price || !category || !quantity || !shipping) {
      return res.status(400).json({
        err: 'All fields are required'
      });
    }

    let product = req.product;  
    product = Object.assign(product, fields);

    if (files.photo) {
      if (files.photo.size > 1_000_000) {
        return res.status(400).json({
          err: 'Image should be less than 1mb in size'
        });
      }
      product.photo.data = fs.readFileSync(files.photo.filepath);
      product.photo.contentType = files.photo.type;
    }

    product.save((err, results) => {
      if (err) {
        return res.status(400).json({
          err: errorHandler(err)
        });
      }

      res.json(results);
    });
  });
}

/*****
 * sell / arrival
 * by sell = /products?sortBy=sold&order=desc&limit=4
 * by arrival = /products?sortBy=createdAt&order=desc&limit=4
 * if no params are sent, then all products are returned
 */

exports.list = (req, res) => {
  let order = req.query.order || 'asc';
  let sortBy = req.query.sortBy || '_id';
  let limit = req.query.limit ? +req.query.limit : 6;

  Product.find()
    .select('-photo')
    .populate('category')
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, data) => {
      if (err) {
        return res.status(400).json({
          err: 'Products not found'
        })
      }

      res.json(data);
    });
}
