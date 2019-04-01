const setNotifyDays = (
  userId,
  value
) => fetch('/api/user/notify/days', {
  method: 'POST',
  mode: 'cors',
  cache: 'no-cache',
  headers: {
    'Content-Type': 'application/json',
  },
  referrer: 'no-referrer',
  body: JSON.stringify({ userId, value }),
})
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default setNotifyDays;
