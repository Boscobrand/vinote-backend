const mongoose = require("mongoose");

mongoose.Promise = Promise;

const mongoURI = "mongodb://localhost/user-api";

mongoose
  .connect(mongoURI, { useNewUrlParser: true },{ useUnifiedTopology: true })
  .then(instance =>
    console.log(`Connected to db: ${instance.connections[0].name}`)
  )
  .catch(err => console.log("Connection Failed.", err));

module.exports = mongoose;
