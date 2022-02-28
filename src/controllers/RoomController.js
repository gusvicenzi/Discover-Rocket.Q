const Database = require('../db/config');

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let room;

    for (var i = 0; i < 6; i++) {
      i == 0
        ? (room = Math.floor(Math.random() * 10).toString())
        : (room += Math.floor(Math.random() * 10).toString());
    }

    await db.run(`INSERT INTO rooms (
      id,
      pass
    ) VALUES (
      ${parseInt(room)},
      ${pass}
    )`);

    await db.close();

    res.redirect(`/room/${room}`);
  }
};
