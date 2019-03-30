import { combineReducers } from 'redux';
import stock from './Stock';
import page from './Page';

const rootReducers = combineReducers({
  stock,
  page
});

export default rootReducers;
