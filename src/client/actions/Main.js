const initialize = history => ({
  type: 'INITIALIZE',
  data: {
    history
  }
});

const reloadAllStock = () => ({
  type: 'RELOAD_ALL_STOCK'
});

export default {
  initialize,
  reloadAllStock
};
