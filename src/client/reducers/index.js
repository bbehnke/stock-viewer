import { combineReducers } from 'redux';
import user from './User';
import stock from './Stock';
import page from './Page';

const rootReducers = combineReducers({
  user,
  stock,
  page
});

export default rootReducers;
