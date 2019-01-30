import * as express from 'express';
import * as bodyParser from 'body-parser';
import products from './products/productRoutes';
import setupMiddleware from './setupMiddleware';
import * as jwt from 'jsonwebtoken';

import {PORT, SECRET_KEY} from './config';

import createDB from './db';
let db = createDB();

let app = express();

setupMiddleware(app);

app.get('/', (req, res) => {
  res.status(200);
  res.json({
    message: 'root'
  });
});

app.use('/products', products);

app.use('/login', (req, res) => {
  let {body} = req;

  let user = db.getUserByName(body.name);

  if (body.password !== user.password) {
    res.status(500).json({
      message: 'wrong password'
    });
  } else {
    res.status(200).json({
      user: {
        name: user.name
      },
      token: jwt.sign({name: user.name}, SECRET_KEY)
    });
  }
});

app.listen(PORT, () => {
  console.log('server running on http://localhost:', PORT);
});
