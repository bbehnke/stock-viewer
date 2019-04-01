import { takeLatest, all } from 'redux-saga/effects';
import initialize from './initialize';
import addStockToProfile from './addStockToProfile';
import removeStockFromProfile from './removeStockFromProfile';
import loadUser from './loadUser';

export default function* watcherSaga() {
  yield all([
    yield takeLatest('INITIALIZE', initialize),
    yield takeLatest('ADD_TO_PROFILE', addStockToProfile),
    yield takeLatest('REMOVE_FROM_PROFILE', removeStockFromProfile),
    yield takeLatest('LOAD_USER', loadUser)
  ]);
}
