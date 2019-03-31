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

export default {
  setUsers,
  setActiveUser,
  clearActiveUser
};
