import { put, call, all } from 'redux-saga/effects';
import {
  getUsers, getStock, getUserStock, getUserNotifications
} from '../fetches';
import { userActions, stockActions, pageActions } from '../actions';
import { STOCK } from '../routes';

export default function* initialize({ data: { history } }) {
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

    const activeUserId = sessionStorage.getItem('active_user_id');
    if (activeUserId) {
      const user = userData.find(u => u.id === activeUserId);
      if (user) {
        // TODO deduplicate
        const [userStockResponse, notificationResponse] = yield all([
          call(getUserStock, user.id),
          call(getUserNotifications, user.id)
        ]);
        const { data: userStockData, error: userStockError } = userStockResponse;
        const { data: notificationData, error: notificationError } = notificationResponse;
        if (userStockError) {
          // TODO add error handling/logging
          console.error(userStockError);
        }
        if (notificationError) {
          // TODO add error handling/logging
          console.error(notificationError);
        }
        if (userStockError || notificationError) {
          return;
        }
        yield put(userActions.setActiveUser(user));
        yield put(userActions.setActiveUserStock(userStockData));
        yield put(userActions.setActiveUserNotifications(notificationData));
        history.push(STOCK);
      } else {
        sessionStorage.removeItem('active_user_id');
      }
    }
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
