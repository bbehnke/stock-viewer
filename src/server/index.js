const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const StockDataGenerator = require('./StockDataGenerator');

// Create server
const app = express();
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync('db.json');
low(adapter)
  .then((db) => {
    // Routes
    // GET /stock
    app.get('/api/stock', (req, res) => {
      res.send(
        db.get('stock')
          .sortBy('name')
          .value()
      );
    });

    // Set db default values
    return db.defaults({
      stock: [
        { id: '1', name: 'VNET', data: StockDataGenerator.getStockData(1) },
        { id: '2', name: 'AKAM', data: StockDataGenerator.getStockData(2) },
        { id: '3', name: 'BIDU', data: StockDataGenerator.getStockData(3) },
        { id: '4', name: 'BCOR', data: StockDataGenerator.getStockData(4) },
        { id: '5', name: 'WIFI', data: StockDataGenerator.getStockData(5) },
        { id: '6', name: 'BRNW', data: StockDataGenerator.getStockData(6) },
        { id: '7', name: 'CARB', data: StockDataGenerator.getStockData(7) },
        { id: '8', name: 'JRJC', data: StockDataGenerator.getStockData(8) },
        { id: '9', name: 'CCIH', data: StockDataGenerator.getStockData(9) },
        { id: '10', name: 'CCOI', data: StockDataGenerator.getStockData(10) }
      ]
    }).write();
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'));
  });
