const initializeStock = () => ({
  type: 'INITIALIZE_STOCK'
});

const setStock = stock => ({
  type: 'SET_STOCK',
  data: {
    stock
  }
});

export default {
  initializeStock,
  setStock
};
