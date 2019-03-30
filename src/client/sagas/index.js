import { takeLatest, all } from 'redux-saga/effects';
import initializeStock from './initializeStock';

export default function* watcherSaga() {
  yield all([
    yield takeLatest('INITIALIZE_STOCK', initializeStock)
  ]);
}
