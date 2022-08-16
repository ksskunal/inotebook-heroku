const connectToMongo = require("./db");
const express = require("express");
const fs = require('fs')
const app = express();
const cors = require('cors')
app.use(express.urlencoded({ extended: false }));
connectToMongo();
const session = require("express-session");
const path = require("path");

const port = 5000;
app.use(
  session({
    secret: "123",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors())
app.use(express.json());
app.use("/api/auth", require("./routers/auth"));
app.use("/api/notes", require("./routers/notes"));
app.use(express.static(path.join(__dirname, "/inotebook/build")));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/inotebook/build', 'index.html'));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(process.env.PORT||5000, () => {
  console.log(`Example app listening at  http://localhost:${port}`);
});
