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
  const order = req.query.order || 'asc';
  const sortBy = req.query.sortBy || '_id';
  const limit = req.query.limit ? +req.query.limit : 6;

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

/****
 * it will find the products base on the req product category
 * other products that has the same category, will be returned
 */
exports.listRelated = (req, res) => {
  let limit = req.query.limit ? +req.query.limit : 6;
  Product
  .find({ _id: { $ne: req.product }, category: req.product.category })
  .limit(limit)
  .populate('category', '_id name')
  .exec((err, products) => {
    if (err) {
      return res.status(400).json({
        err: 'Products not found'
      })
    }
    res.json(products);
  });
}

exports.listCategories = (req, res) => {
  Product.distinct('category', {}, (err, categories) => {
    if (err) {
      return res.status(400).json({
        err: 'Categories not found'
      })
    }
    res.json(categories);
  });
}

/**
 * list products by search
 * we will implement product search in react frontend
 * we will show categories in checkbox and price range in radio buttons
 * as the user clicks on those checkbox and radio buttons
 * we will make api request and show the products to users based on what he wants
 */
 exports.listBySearch = (req, res) => {
  const order = req.body.order || "desc";
  const sortBy = req.body.sortBy || "_id";
  const limit = req.query.limit ? +req.query.limit : 6;
  const skip = +req.body.skip || 0;
  let findArgs = {};

  // console.log(order, sortBy, limit, skip, req.body.filters);
  // console.log("findArgs", findArgs);

  for (let key in req.body.filters) {
      if (req.body.filters[key].length > 0) {
          if (key === 'price') {
              // gte -  greater than price [0-10]
              // lte - less than
              findArgs[key] = {
                  $gte: req.body.filters[key][0],
                  $lte: req.body.filters[key][1]
              };
          } else {
              findArgs[key] = req.body.filters[key];
          }
      }
  }

  console.log(findArgs);
  
  Product.find(findArgs)
      .select("-photo")
      .populate("category")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit)
      .exec((err, data) => {
        console.log(err);
        
          if (err) {
              return res.status(400).json({
                  err: "Products not found"
              });
          }
          res.json({
              size: data.length,
              data
          });
      });
};

exports.photo = (req, res, next) => {
  if (req.product.photo.data) {
    res.set('Content-Type', req.product.photo.contentType);
    return res.send(req.product.photo.data)
  }
  next();
}