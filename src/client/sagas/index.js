import { takeLatest, all } from 'redux-saga/effects';
import initializeNotes from './initializeNotes';
import updateNote from './updateNote';
import createNote from './createNote';

export default function* watcherSaga() {
  yield all([
    yield takeLatest('INITIALIZE_NOTES', initializeNotes),
    yield takeLatest('UPDATE_NOTE', updateNote),
    yield takeLatest('CREATE_NOTE', createNote)
  ]);
}
