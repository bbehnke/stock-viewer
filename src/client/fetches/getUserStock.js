const getUserStock = userId => fetch(`/api/user/stock/${userId}`)
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default getUserStock;
