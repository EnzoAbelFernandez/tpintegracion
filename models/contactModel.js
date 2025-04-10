const db = require('../database/db');

exports.getAll = () => {
  return new Promise((resolve, reject) => {
    db.all('SELECT * FROM contacts', [], (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

exports.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.get('SELECT * FROM contacts WHERE id = ?', [id], (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

exports.create = ({ nombre, email, telefono }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'INSERT INTO contacts (nombre, email, telefono) VALUES (?, ?, ?)',
      [nombre, email, telefono],
      function (err) {
        if (err) reject(err);
        else resolve({ id: this.lastID, nombre, email, telefono });
      }
    );
  });
};

exports.update = (id, { nombre, email, telefono }) => {
  return new Promise((resolve, reject) => {
    db.run(
      'UPDATE contacts SET nombre = ?, email = ?, telefono = ? WHERE id = ?',
      [nombre, email, telefono, id],
      function (err) {
        if (err) reject(err);
        else resolve(this.changes);
      }
    );
  });
};

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.run('DELETE FROM contacts WHERE id = ?', [id], function (err) {
      if (err) reject(err);
      else resolve(this.changes);
    });
  });
};
