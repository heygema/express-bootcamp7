import * as express from 'express';
import createDB from '../db';
import {Request, Response, NextFunction} from 'express';
import {getProducts} from './productController';
let db = createDB();

let products = express.Router();

products.get('/', (request: Request, response: Response) => {
  let result = getProducts();

  response.status(result.status);
  response.json(result);
});

products.get('/:id', (req: Request, res: Response) => {
  let {
    params: {id}
  } = req;
  console.log(req.params);
  res.status(200).json({
    product: db.getItem(id)
  });
});

products.post('/', (req: Request, res: Response) => {
  let {body} = req;

  let {name, price, photo} = body;

  let item = {
    name,
    price,
    photo
  };

  db.addItem(item);

  res.status(200).json({
    status: 'success',
    item
  });
});

export default products;
