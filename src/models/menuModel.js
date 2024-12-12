const db = require('../config/database');

const Menu = {
  getAllByType: async (type) => {
    const [rows] = await db.query('SELECT * FROM Menu WHERE type = ?', [type]);
    return rows;
  },
  create: async (data) => {
    const { name, price, type } = data;
    const [result] = await db.query(
      `INSERT INTO Menu (name, price, type) VALUES (?, ?, ?)`,
      [name, price, type]
    );
    return result.insertId;
  },
  update: async (id, data) => {
    const { name, price, type } = data;
    await db.query(`UPDATE Menu SET name = ?, price = ?, type = ? WHERE id = ?`, [name, price, type, id]);
  },
  delete: async (id) => {
    await db.query('DELETE FROM Menu WHERE id = ?', [id]);
  },
};
module.exports = Menu;
