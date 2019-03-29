const express = require('express');
const bodyParser = require('body-parser');
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

// Create server
const app = express();
app.use(bodyParser.json());

// Create database instance and start server
const adapter = new FileAsync('db.json');
low(adapter)
  .then((db) => {
    // Routes
    // GET /notes
    app.get('/api/notes', (req, res) => {
      res.send(
        db.get('notes')
          .sortBy('id')
          .value()
      );
    });

    // POST /notes
    app.post('/api/notes', (req, res) => {
      const { id, value } = req.body;
      db.get('notes')
        .find({ id })
        .assign({ value })
        .write();
      res.send(
        db.get('notes')
          .sortBy('id')
          .value()
      );
    });

    // PUT /notes
    app.put('/api/notes', (req, res) => {
      db.get('notes')
        .push({
          id: db.get('notes')
            .sortBy('id')
            .last()
            .value().id + 1,
          value: ''
        })
        .write();
      res.send(
        db.get('notes')
          .sortBy('id')
          .value()
      );
    });

    // Set db default values
    return db.defaults({
      notes: [
        { id: 1, value: 'This is your first note!\nYou can update it and click \'Save note\'.\nYou can also create more notes by clicking \'Create note\'.' }
      ]
    }).write();
  })
  .then(() => {
    app.listen(3000, () => console.log('listening on port 3000'));
  });
