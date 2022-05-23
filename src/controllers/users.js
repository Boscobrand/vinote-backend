const User = require("../models/User");


module.exports = {
  index: (req, res) => {
    User.find({})
      .populate("Wine")
      .then(users => {
        res.json(users);
      });
  }
};