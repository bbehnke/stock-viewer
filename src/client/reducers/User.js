export default (state = { users: {} }, action) => {
  const { type, data } = action;
  let users;
  let profileStock;
  let userId;
  switch (type) {
    case 'SET_USERS':
      users = {};
      data.users.forEach((user) => {
        users[user.id] = user;
      });
      return {
        ...state,
        users
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
    case 'UPDATE_USER_PROFILE':
      userId = state.activeUser.id;
      users = { ...state.users };
      ({ profileStock } = data);
      users[userId].profileStock = profileStock;
      return {
        ...state,
        users
      };
    default:
      return state;
  }
};
