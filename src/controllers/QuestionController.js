const Database = require('../db/config');

module.exports = {
  index(req, res) {
    const room = req.params.room;
    const question = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    console.log(
      `room = ${room}, question = ${question}, action = ${action}, password = ${password}`
    );
  },
  async create(req, res) {
    const db = await Database();
    const question = req.body.question;
    const room = req.params.room;

    await db.run(
      `INSERT INTO questions (title, room, read) VALUES ( "${question}", ${room}, 0)`
    );

    await db.close();

    res.redirect(`/room/${room}`);
  }
};
