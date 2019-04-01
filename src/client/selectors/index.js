import { createSelector } from 'reselect';

const getUserStock = state => state.user.stock;

// eslint-disable-next-line import/prefer-default-export
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
