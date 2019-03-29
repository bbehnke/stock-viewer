import { put, call } from 'redux-saga/effects';
import { updateNote as updateNotePost } from '../fetches';
import { notes as noteActions, page as pageActions } from '../actions';

export default function* updateNote({ data: { id, value } }) {
  try {
    yield put(pageActions.setLoading(true));
    const {
      data,
      error
    } = yield call(updateNotePost, id, value);

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
