const TOTAL_DAYS = 60;
const SPREAD = 200;

const getStockData = (repeatLastCount) => {
  const data = [];
  let prevValue;
  for (let i = 0; i < TOTAL_DAYS; i += 1) {
    const date = new Date();
    date.setDate(date.getDate() - (TOTAL_DAYS - i));
    const dateString = `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
    if (i === 0) {
      prevValue = SPREAD;
      data.push({
        name: dateString,
        value: prevValue,
        change: 0
      });
    } else {
      const prevValueCopy = prevValue;
      if (TOTAL_DAYS - i + 1 > repeatLastCount) {
        const min = prevValue - SPREAD <= 0 ? 0 : prevValue - SPREAD;
        const max = prevValue + SPREAD;
        prevValue = Math.floor(Math.random() * (max - min) + min);
      }
      const change = prevValue - prevValueCopy;
      data.push({
        name: dateString,
        value: prevValue,
        change
      });
    }
  }
  return data;
};

module.exports = { getStockData };
