const Database = require('../db/config');

module.exports = {
  async create(req, res) {
    const db = await Database();
    const pass = req.body.password;
    let room;
    let isRoom = true;

    const roomsExists = await db.all(`SELECT id FROM rooms`);
    //const teste = await db.run(`SELECT * FROM rooms WHERE id = room`)
    while (isRoom) {
      // Generate room number
      for (var i = 0; i < 6; i++) {
        i == 0
          ? (room = Math.floor(Math.random() * 10).toString())
          : (room += Math.floor(Math.random() * 10).toString());
      }
      // Return isRoom=false if there is not a room with the random room number
      isRoom = roomsExists.some(roomExist => roomExist === room);
      // Verify if room number already exists
      if (!isRoom) {
        // Insert room number and password in database
        await db.run(`INSERT INTO rooms (
        id,
        pass
      ) VALUES (
        ${parseInt(room)},
        ${pass}
      )`);
      }
    }
    await db.close();

    res.redirect(`/room/${room}`);
  },

  async open(req, res) {
    const db = await Database();
    const room = req.params.room;
    const questions = await db.all(
      `SELECT * FROM questions WHERE room = ${room} AND read = 0`
    );
    const readQuestions = await db.all(
      `SELECT * FROM questions WHERE room = ${room} AND read = 1`
    );
    res.render('room', {
      room: room,
      questions: questions,
      readQuestions: readQuestions
    });
  }
};
