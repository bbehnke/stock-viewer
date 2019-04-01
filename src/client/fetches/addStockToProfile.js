const addStockToProfile = (
  userId,
  stockId
) => fetch('/api/user/stock/add', {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer',
  body: JSON.stringify({ userId, stockId }),
})
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default addStockToProfile;
