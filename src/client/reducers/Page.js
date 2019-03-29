export default (state = { loading: true }, action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_LOADING':
      return {
        ...state,
        loading: data
      };
    default:
      return state;
  }
};
