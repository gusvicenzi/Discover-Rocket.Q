module.exports = {
  create(req, res) {
    let room = 123456;

    res.redirect(`/room/${room}`);
  }
};
