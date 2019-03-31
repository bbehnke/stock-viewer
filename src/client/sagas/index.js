import { takeLatest, all } from 'redux-saga/effects';
import initialize from './initialize';

export default function* watcherSaga() {
  yield all([
    yield takeLatest('INITIALIZE', initialize)
  ]);
}
