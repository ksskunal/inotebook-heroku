const mongoose = require("mongoose");
const dbUri = "mongodb+srv://kunal987:kskunal123@mydatabase.plyh7nl.mongodb.net/inotebook";

const connectToMongo = () => {
  mongoose.connect(dbUri, () => {
    console.log("connected to mongoDB");
  });
};

module.exports = connectToMongo;
