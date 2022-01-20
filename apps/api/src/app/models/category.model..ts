const mongoose = require('mongoose');
import * as crypto from 'crypto';
const { v1: uuidv1 } = require('uuid');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    maxlength: 32,
    unique: true
  },
}, { timestamps: true });

const Category = mongoose.model('Category', categorySchema);
export default Category;