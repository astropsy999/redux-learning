import { legacy_createStore as createStore } from 'redux';
import taskReducer from './task';

const initialState = [
  { id: 1, title: 'Таск 1', description: 'Завдання 1', completed: false },
  { id: 2, title: 'Таск 2', description: 'Завдання 2', completed: false },
];

function configureStore() {
  return createStore(taskReducer, initialState);
}

export default configureStore;
