import {
  put, call, all, select
} from 'redux-saga/effects';
import { getUserStock, getStock } from '../fetches';
import { stockActions, userActions, pageActions } from '../actions';

export default function* reloadAllStock() {
  try {
    yield put(pageActions.setLoading(true));
    const { user: { user: { id: userId } } } = yield select();
    const [stockResponse, userStockResponse] = yield all([
      call(getStock),
      call(getUserStock, userId)
    ]);
    const { data: stockData, error: stockError } = stockResponse;
    const { data: userStockData, error: userStockError } = userStockResponse;
    if (stockError) {
      // TODO add error handling/logging
      console.error(stockError);
    }
    if (userStockError) {
      // TODO add error handling/logging
      console.error(userStockError);
    }
    if (stockError || userStockError) {
      return;
    }
    yield put(stockActions.setStock(stockData));
    yield put(userActions.setActiveUserStock(userStockData));
  } catch (e) {
    // TODO add error handling/logging
    console.error(e);
  } finally {
    yield put(pageActions.setLoading(false));
  }
}
