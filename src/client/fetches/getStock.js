const getStock = () => fetch('/api/stock')
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default getStock;
