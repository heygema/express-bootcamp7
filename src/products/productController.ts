import createDB from '../db';

let db = createDB();

export function getProducts() {
  let products = db.getItems();

  if (products.length > 0) {
    return {
      status: 200,
      products
    };
  } else {
    return {
      status: 404,
      products: null
    };
  }
}
