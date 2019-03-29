import { combineReducers } from 'redux';
import notes from './Notes';
import page from './Page';

const rootReducers = combineReducers({
  notes,
  page
});

export default rootReducers;
