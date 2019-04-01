const setUsers = users => ({
  type: 'SET_USERS',
  data: {
    users
  }
});

const loadUser = (user, history) => ({
  type: 'LOAD_USER',
  data: {
    user,
    history
  }
});

const setActiveUser = user => ({
  type: 'SET_ACTIVE_USER',
  data: {
    user
  }
});

const setActiveUserStock = stock => ({
  type: 'SET_ACTIVE_USER_STOCK',
  data: {
    stock
  }
});

const setActiveUserNotifications = notifications => ({
  type: 'SET_ACTIVE_USER_NOTIFICATIONS',
  data: {
    notifications
  }
});

const clearActiveUser = () => ({
  type: 'CLEAR_ACTIVE_USER'
});

const addStockToProfile = stock => ({
  type: 'ADD_TO_PROFILE',
  data: {
    stockId: stock.id
  }
});

const removeStockFromProfile = stock => ({
  type: 'REMOVE_FROM_PROFILE',
  data: {
    stockId: stock.id
  }
});

const setNotifyDays = notifyDays => ({
  type: 'SET_NOTIFY_DAYS',
  data: {
    notifyDays
  }
});

const disableNotifyDays = () => ({
  type: 'DISABLE_NOTIFY_DAYS'
});

export default {
  setUsers,
  loadUser,
  setActiveUser,
  setActiveUserStock,
  setActiveUserNotifications,
  clearActiveUser,
  addStockToProfile,
  removeStockFromProfile,
  setNotifyDays,
  disableNotifyDays
};
