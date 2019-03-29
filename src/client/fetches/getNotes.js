const getNotes = () => fetch('/api/notes')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default getNotes;
