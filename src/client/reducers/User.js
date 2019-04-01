export default (state = { users: {} }, action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_USERS':
      return {
        ...state,
        users: data.users
      };
    case 'SET_ACTIVE_USER':
      return {
        ...state,
        user: data.user
      };
    case 'SET_ACTIVE_USER_STOCK':
      return {
        ...state,
        stock: data.stock,
      };
    case 'SET_ACTIVE_USER_NOTIFICATIONS':
      return {
        ...state,
        notifications: data.notifications,
      };
    case 'CLEAR_ACTIVE_USER':
      return {
        ...state,
        user: undefined,
        stock: undefined,
        notifications: undefined
      };
    default:
      return state;
  }
};
