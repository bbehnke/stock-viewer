const initializeNotes = () => ({
  type: 'INITIALIZE_NOTES'
});

const updateNote = (id, value) => ({
  type: 'UPDATE_NOTE',
  data: {
    id,
    value
  }
});

const createNote = () => ({
  type: 'CREATE_NOTE'
});

const setNotes = notes => ({
  type: 'SET_NOTES',
  data: {
    notes
  }
});

export default {
  initializeNotes,
  updateNote,
  createNote,
  setNotes
};
