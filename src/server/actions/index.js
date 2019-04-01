const uuidv4 = require('uuid/v4');

const getUserStock = (db, userId) => {
  const userStock = db.get('userStock')
    .filter({ userId })
    .value();
  if (userStock.length === 0) {
    return [];
  }
  const userStockMap = {};
  userStock.forEach((us) => {
    userStockMap[us.stockId] = us;
  });
  const allStock = db.get('stock')
    .orderBy('currentValue', 'desc')
    .value();
  const finalStock = [];
  allStock.forEach((s) => {
    const us = userStockMap[s.id];
    if (us) {
      finalStock.push({
        ...us,
        ...s
      });
    }
  });
  return finalStock;
};

const getUsers = db => db.get('user')
  .orderBy('name', 'asc')
  .value();

const getUserNotifications = (db, userId) => db.get('notification')
  .filter({ userId })
  .orderBy('date', 'desc')
  .value();

const getStock = db => db.get('stock')
  .orderBy('currentValue', 'desc')
  .value();

const getStockClone = db => db.get('stock')
  .orderBy('currentValue', 'desc')
  .cloneDeep()
  .value();

const updateUserNotifyDays = (db, userId, givenDays) => {
  db.get('user')
    .find({ id: userId })
    .assign({ notifyDays: givenDays })
    .write();
};

const createUserStock = (db, userId, stockId) => {
  db.get('userStock')
    .push({
      id: uuidv4(),
      userId,
      stockId
    })
    .write();
};

const createDaysNotifications = (db, userId, givenDays) => {
  db.get('notification')
    .remove({ userId })
    .write();
  if (givenDays) {
    const stock = getStockClone(db);
    stock.forEach((s) => {
      let count = 1;
      const data = s.data.reverse();
      let i;
      for (i = data.length - 1; i >= 0; i -= 1) {
        if (i !== 0) {
          const prev = s.data[i - 1].value;
          if (prev === s.data[i].value) {
            count += 1;
          }
          if (count === givenDays) {
            db.get('notification')
              .push({
                id: uuidv4(),
                userId,
                date: Date.now(),
                message: `${s.name} has been the same price for ${givenDays} days.`
              })
              .write();
            break;
          }
        }
      }
    });
  }
};


const deleteUserStock = (db, userId, stockId) => {
  db.get('userStock')
    .remove({ userId, stockId })
    .write();
};

module.exports = {
  getUserStock,
  getUsers,
  getUserNotifications,
  getStock,
  updateUserNotifyDays,
  createUserStock,
  createDaysNotifications,
  deleteUserStock
};
