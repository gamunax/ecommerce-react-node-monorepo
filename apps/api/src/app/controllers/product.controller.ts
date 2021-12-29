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
    console.log('paso', files);
    
    let product = new Product(fields);
    if (files.photo) {
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