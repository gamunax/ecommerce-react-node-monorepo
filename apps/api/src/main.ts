import * as express from 'express';
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const authRouters = require('./app/routes/auth.router');
const userRouters = require('./app/routes/user.router');
const categoryRouters = require('./app/routes/category.router');
const productRouters = require('./app/routes/product.router');

import { Message } from '@ecommerce/api-interfaces';

const app = express();
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('DB connected'));

const greeting: Message = { message: 'Welcome to api2!' };

// * middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// * routes middleware
app.use('/api', authRouters);
app.use('/api', userRouters);
app.use('/api', categoryRouters);
app.use('/api', productRouters);

const port = process.env.port || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
