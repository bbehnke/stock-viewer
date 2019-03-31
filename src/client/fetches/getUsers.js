const getUsers = () => fetch('/api/users')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default getUsers;
