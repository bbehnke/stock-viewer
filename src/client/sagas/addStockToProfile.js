import { put, call, select } from 'redux-saga/effects';
import { addStockToProfile as addStockToProfilePost } from '../fetches';
import { userActions, pageActions } from '../actions';

export default function* addStockToProfile({ data: { stockId } }) {
  try {
    yield put(pageActions.setLoading(true));
    const { user: { user: { id: userId } } } = yield select();
    const { data, error } = yield call(addStockToProfilePost, userId, stockId);
    if (error) {
      // TODO add error handling/logging
      console.error(error);
      return;
    }
    yield put(userActions.setActiveUserStock(data));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
