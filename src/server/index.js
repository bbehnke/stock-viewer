const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');
const uuidv4 = require('uuid/v4');
const StockDataGenerator = require('./StockDataGenerator');
const actions = require('./actions');

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

    // GET /user/stock
    app.get('/api/user/stock/:userId', (req, res) => {
      const { userId } = req.params;
      res.send(actions.getUserStock(db, userId));
    });

    // GET /user/notifications
    app.get('/api/user/notifications/:userId', (req, res) => {
      const { userId } = req.params;
      res.send(
        db.get('notifications')
          .filter({ userId })
          .orderBy('date', 'desc')
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

    // POST /user/stock/add
    app.post('/api/user/stock/add', (req, res) => {
      const { userId, stockId } = req.body;
      db.get('userStock')
        .push({
          id: uuidv4(),
          userId,
          stockId
        })
        .write();
      res.send(actions.getUserStock(db, userId));
    });


    // POST /user/notify/days
    app.post('/user/notify/days', (req, res) => {
      const { userId, notifyDays } = req.body;
      db.get('users')
        .find({ id: userId })
        .assign({ notifyDays })
        .write();
      res.send(notifyDays);
    });

    // DELETE /user/stock
    app.delete('/api/user/stock/remove', (req, res) => {
      const { userId, stockId } = req.body;
      db.get('userStock')
        .remove({ userId, stockId })
        .write();
      res.send(actions.getUserStock(db, userId));
    });

    // DELETE /user/notify/days
    app.delete('/user/notify/days', (req, res) => {
      const { userId } = req.body;
      db.get('users')
        .find({ id: userId })
        .assign({ notifyDays: undefined })
        .write();
      res.send({});
    });

    // Set db default values
    return db.defaults({
      user: [
        {
          id: uuidv4(), name: 'User 1'
        },
        {
          id: uuidv4(), name: 'User 2'
        },
        {
          id: uuidv4(), name: 'User 3'
        },
        {
          id: uuidv4(), name: 'User 4'
        }
      ],
      userStock: [
        { id: uuidv4(), userId: uuidv4(), stockId: uuidv4() }
      ],
      notifications: [],
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
