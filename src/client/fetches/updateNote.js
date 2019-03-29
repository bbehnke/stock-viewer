const updateNote = (id, value) => fetch('/api/notes', {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer',
  body: JSON.stringify({ id, value }),
})
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default updateNote;
