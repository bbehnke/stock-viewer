export default (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_STOCK':
      return {
        ...state,
        stock: data.stock
      };
    default:
      return state;
  }
};
