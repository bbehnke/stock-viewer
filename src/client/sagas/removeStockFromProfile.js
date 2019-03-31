import { put, call } from 'redux-saga/effects';
import { removeStockFromProfile as removeStockFromProfilePost } from '../fetches';
import { userActions, pageActions } from '../actions';

export default function* removeStockFromProfile({ data: { userId, stockId } }) {
  try {
    yield put(pageActions.setLoading(true));
    const { data, error } = yield call(removeStockFromProfilePost, userId, stockId);
    if (error) {
      // TODO add error handling/logging
      console.error(error);
      return;
    }
    yield put(userActions.updateUserProfile(data));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
