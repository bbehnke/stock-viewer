const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const uuidv4 = require('uuid/v4');
const StockDataGenerator = require('./StockDataGenerator');

// Create server
const app = express();
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync('db.json');
low(adapter)
  .then((db) => {
    // Routes
    // GET /users
    app.get('/api/users', (req, res) => {
      res.send(
        db.get('user')
          .orderBy('name', 'asc')
          .value()
      );
    });
    // GET /stock
    app.get('/api/stock', (req, res) => {
      res.send(
        db.get('stock')
          .orderBy('currentValue', 'desc')
          .value()
      );
    });

    // Set db default values
    return db.defaults({
      user: [
        { id: uuidv4(), name: 'User 1', profileStock: {} },
        { id: uuidv4(), name: 'User 2', profileStock: {} },
        { id: uuidv4(), name: 'User 3', profileStock: {} },
        { id: uuidv4(), name: 'User 4', profileStock: {} }
      ],
      stock: [
        { id: uuidv4(), name: 'VNET', ...StockDataGenerator.getStockData(1) },
        { id: uuidv4(), name: 'AKAM', ...StockDataGenerator.getStockData(2) },
        { id: uuidv4(), name: 'BIDU', ...StockDataGenerator.getStockData(3) },
        { id: uuidv4(), name: 'BCOR', ...StockDataGenerator.getStockData(4) },
        { id: uuidv4(), name: 'WIFI', ...StockDataGenerator.getStockData(5) },
        { id: uuidv4(), name: 'BRNW', ...StockDataGenerator.getStockData(6) },
        { id: uuidv4(), name: 'CARB', ...StockDataGenerator.getStockData(7) },
        { id: uuidv4(), name: 'JRJC', ...StockDataGenerator.getStockData(8) },
        { id: uuidv4(), name: 'CCIH', ...StockDataGenerator.getStockData(9) },
        { id: uuidv4(), name: 'CCOI', ...StockDataGenerator.getStockData(10) }
      ]
    }).write();
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'));
  });
