import { createSelector } from 'reselect';

// const getStock = state => state.stock.stock;
// const getUser = state => state.user.user;
const getUserStock = state => state.user.stock;

// export const getUserId = createSelector(
//   [getActiveUser],
//   activeUser => (activeUser ? activeUser.id : undefined)
// );

export const getUserStockMap = createSelector(
  [getUserStock],
  (stock) => {
    const stockMap = {};
    stock.forEach((s) => {
      stockMap[s.id] = s;
    });
    return stockMap;
  }
);
