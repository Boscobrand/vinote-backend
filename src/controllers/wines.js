const Wine = require("../models/Wine");

module.exports = {
  index: (req, res) => {
    Wine.find({}).then(wines => {
      res.json(wines);
    });
  }
};