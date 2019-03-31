export default (state = [], action) => {
  const { type, data } = action;
  let stock;
  switch (type) {
    case 'SET_STOCK':
      stock = {};
      data.stock.forEach((s) => {
        stock[s.id] = s;
      });
      return {
        ...state,
        stock
      };
    default:
      return state;
  }
};
