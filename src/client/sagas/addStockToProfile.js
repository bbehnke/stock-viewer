import { put, call } from 'redux-saga/effects';
import { addStockToProfile as addStockToProfilePost } from '../fetches';
import { userActions, pageActions } from '../actions';

export default function* addStockToProfile({ data: { userId, stockId, stockName } }) {
  try {
    yield put(pageActions.setLoading(true));
    const { data, error } = yield call(addStockToProfilePost, userId, stockId, stockName);
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
