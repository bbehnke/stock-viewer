import { put, call, select } from 'redux-saga/effects';
import { setNotifyDays as setNotifyDaysPost } from '../fetches';
import { userActions, pageActions } from '../actions';

export default function* setNotifyDays({ data: { value } }) {
  try {
    yield put(pageActions.setLoading(true));
    const { user: { user } } = yield select();
    const { id: userId } = user;
    const { data, error } = yield call(setNotifyDaysPost, userId, value);
    if (error) {
      // TODO add error handling/logging
      console.error(error);
      return;
    }
    const { users, notifications } = data;
    yield put(userActions.setUsers(users));
    yield put(userActions.setActiveUser({ ...user, notifyDays: value }));
    yield put(userActions.setActiveUserNotifications(notifications));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
