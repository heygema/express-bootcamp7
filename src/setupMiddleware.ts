import * as bodyParser from 'body-parser';
import {SECRET_KEY} from './config';
import * as jwt from 'jsonwebtoken';

let authMiddleware = (req, res, next) => {
  let {
    headers: {token}
  } = req;
  try {
    let {name} = jwt.verify(token, SECRET_KEY);

    console.log('USER >>', name);
    next();
  } catch (err) {
    console.log('err', err);
    next();
  }
};

let blablabla = (req, res, next) => {
  console.log('bla bla bla');
  next();
};

export default function setupMiddleware(app: any) {
  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({extended: false}));
  // parse application/json
  app.use(bodyParser.json());
  app.use(authMiddleware);
  app.use(blablabla);
}
