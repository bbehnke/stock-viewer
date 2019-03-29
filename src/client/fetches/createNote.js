const createNote = () => fetch('/api/notes', {
  method: 'PUT',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer'
})
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default createNote;
