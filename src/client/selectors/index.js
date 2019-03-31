import { createSelector } from 'reselect';

const getStock = state => state.stock.stock;
const getActiveUser = state => state.user.activeUser;
const getActiveUserProfileStock = state => getActiveUser(state).profileStock;

export const getUserProfileStockList = createSelector(
  [getStock, getActiveUserProfileStock],
  (stock, profileStock) => Object.keys(profileStock).map(stockId => stock[stockId])
);

export const getStockList = createSelector(
  [getStock],
  stock => Object.keys(stock).map(id => stock[id])
);

export const getActiveUserId = createSelector(
  [getActiveUser],
  activeUser => (activeUser ? activeUser.id : undefined)
);
