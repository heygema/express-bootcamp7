export type Products = Array<Product>;

export type Product = {
  id: string;
  name: string;
  price: number;
  photo: string;
};

export type ProductEditInput = {
  name: string;
  price: number;
  photo: string;
};

let products: Products = [
  {id: '1', name: 'banana', price: 2000, photo: '...'},
  {id: '2', name: 'apple', price: 5000, photo: '...'},
  {id: '3', name: 'microsoft', price: 1200000, photo: '...'}
];

export type User = {
  id: string;
  name: string;
  password: string;
};

let users = [{id: '1', name: 'jess', password: '123'}];

type CreateDB = {
  getItems: () => Array<Product>;
  getUserByName: Function;
  getItem: Function;
  addItem: Function;
  editItem: Function;
  removeItem: Function;
};

function createDB(): CreateDB {
  let state = products;
  function setState(newState) {
    state = newState;
  }
  return {
    getItems: () => state,
    getUserByName: (name: string) => users.find(user => user.name === name),
    getItem: (id: string) => state.find(item => item.id === id),
    addItem: (item: Product) => {
      setState([...state, item]);
    },
    editItem: (id: string, data: ProductEditInput) => {
      let removedState = state.filter(i => i.id !== id);
      let newItem = {
        id,
        name: data.name,
        price: data.price,
        photo: data.photo
      };
      let newState = [...removedState, newItem];
      setState(newState);
    },
    removeItem: (id: string) => {
      let newState = state.filter(i => i.id !== id);
      setState(newState);
    }
  };
}

export default createDB;
