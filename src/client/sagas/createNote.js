import { put, call } from 'redux-saga/effects';
import { createNote as createNotePut } from '../fetches';
import { notes as noteActions, page as pageActions } from '../actions';

export default function* createNote() {
  try {
    yield put(pageActions.setLoading(true));
    const {
      data,
      error
    } = yield call(createNotePut);

    if (error) {
      // TODO add error handling/logging
      console.error(error);
      return;
    }

    yield put(noteActions.setNotes(data));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
