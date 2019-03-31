export default (state = { }, action) => {
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
        activeUser: data.activeUser
      };
    case 'CLEAR_ACTIVE_USER':
      return {
        ...state,
        activeUser: undefined
      };
    default:
      return state;
  }
};
