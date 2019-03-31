import { put, call, all } from 'redux-saga/effects';
import { getUsers, getStock } from '../fetches';
import { userActions, stockActions, pageActions } from '../actions';

export default function* initialize() {
  try {
    yield put(pageActions.setLoading(true));
    const [usersResponse, stockResponse] = yield all([
      call(getUsers),
      call(getStock)
    ]);
    const { data: userData, error: userError } = usersResponse;
    const { data: stockData, error: stockError } = stockResponse;
    if (userError) {
      // TODO add error handling/logging
      console.error(userError);
    }
    if (stockError) {
      // TODO add error handling/logging
      console.error(stockError);
    }
    if (userError || stockError) {
      return;
    }
    yield put(userActions.setUsers(userData));
    yield put(stockActions.setStock(stockData));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
