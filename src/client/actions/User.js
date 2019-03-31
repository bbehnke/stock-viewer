const setUsers = users => ({
  type: 'SET_USERS',
  data: {
    users
  }
});

const setActiveUser = user => ({
  type: 'SET_ACTIVE_USER',
  data: {
    activeUser: user
  }
});

const clearActiveUser = () => ({
  type: 'CLEAR_ACTIVE_USER'
});

const addStockToProfile = (user, stock) => ({
  type: 'ADD_TO_PROFILE',
  data: {
    userId: user.id,
    stockId: stock.id,
    stockName: stock.name
  }
});

const removeStockFromProfile = (user, stock) => ({
  type: 'REMOVE_FROM_PROFILE',
  data: {
    userId: user.id,
    stockId: stock.id
  }
});

const updateUserProfile = profileStock => ({
  type: 'UPDATE_USER_PROFILE',
  data: {
    profileStock
  }
});

export default {
  setUsers,
  setActiveUser,
  clearActiveUser,
  addStockToProfile,
  removeStockFromProfile,
  updateUserProfile
};
