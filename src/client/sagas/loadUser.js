import { put, call, all } from 'redux-saga/effects';
import { getUserStock, getUserNotifications } from '../fetches';
import { userActions, pageActions } from '../actions';
import { STOCK } from '../routes';

export default function* loadUser({ data: { user, history } }) {
  try {
    yield put(pageActions.setLoading(true));
    const [stockResponse, notificationResponse] = yield all([
      call(getUserStock, user.id),
      call(getUserNotifications, user.id)
    ]);
    const { data: stockData, error: stockError } = stockResponse;
    const { data: notificationData, error: notificationError } = notificationResponse;
    if (stockError) {
      // TODO add error handling/logging
      console.error(stockError);
    }
    if (notificationError) {
      // TODO add error handling/logging
      console.error(notificationError);
    }
    if (stockError || notificationError) {
      return;
    }
    yield put(userActions.setActiveUser(user));
    yield put(userActions.setActiveUserStock(stockData));
    yield put(userActions.setActiveUserNotifications(notificationData));
    history.push(STOCK);
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
