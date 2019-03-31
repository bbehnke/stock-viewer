const addStockToProfile = (
  userId,
  stockId,
  stockName
) => fetch('/api/user/stock/add', {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer',
  body: JSON.stringify({ userId, stockId, stockName }),
})
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default addStockToProfile;
