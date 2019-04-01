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

module.exports = { getUserStock };
