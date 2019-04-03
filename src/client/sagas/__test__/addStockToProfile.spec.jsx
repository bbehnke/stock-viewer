import { put, call, select } from 'redux-saga/effects';
import addStockToProfile from '../addStockToProfile';
import { pageActions, userActions } from '../../actions';
import { addStockToProfile as addStockToProfilePut } from '../../fetches';

describe('addStockToProfile saga tests', () => {
  it('add stock to profile', async () => {
    const mockFetchData = [{ id: 1, value: 'test_value' }];
    const stockId = 'test_stock_id';
    const userId = 'test_user_id';
    const gen = addStockToProfile({ data: { stockId } });
    expect(gen.next().value).toEqual(put(pageActions.setLoading(true)));
    expect(gen.next().value).toEqual(select());
    expect(gen.next({ user: { user: { id: userId } } }).value)
      .toEqual(call(addStockToProfilePut, userId, stockId));
    expect(gen.next({ data: mockFetchData }).value)
      .toEqual(put(userActions.setActiveUserStock(mockFetchData)));
    expect(gen.next().value).toEqual(put(pageActions.setLoading(false)));
    expect(gen.next().done).toBeTruthy();
  });
  // TODO add error handling tests once error handling implemented.
});
