const setStock = stock => ({
  type: 'SET_STOCK',
  data: {
    stock
  }
});

export default {
  setStock
};
