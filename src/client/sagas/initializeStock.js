import { put, call } from 'redux-saga/effects';
import { getStock } from '../fetches';
import { stock as stockActions, page as pageActions } from '../actions';

export default function* initializeNotes() {
  try {
    yield put(pageActions.setLoading(true));
    const {
      data,
      error
    } = yield call(getStock);

    if (error) {
      // TODO add error handling/logging
      console.error(error);
      return;
    }

    yield put(stockActions.setStock(data));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
