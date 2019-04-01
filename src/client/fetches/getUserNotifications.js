const getUserNotifications = userId => fetch(`/api/user/notifications/${userId}`)
  .then(res => res.json())
  .then(data => ({ data }))
  .catch(error => ({
    error
  }));

export default getUserNotifications;
