module.exports = {
  index(req, res) {
    const room = req.params.room;
    const question = req.params.question;
    const action = req.params.action;
    const password = req.body.password;

    console.log(
      `room = ${room}, question = ${question}, action = ${action}, password = ${password}`
    );
  }
};
