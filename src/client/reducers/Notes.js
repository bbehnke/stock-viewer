export default (state = [], action) => {
  const { type, data } = action;
  switch (type) {
    case 'SET_NOTES':
      return [
        ...data.notes
      ];
    default:
      return state;
  }
};
