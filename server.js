const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
const MongoClient = require("mongodb").MongoClient;
app.set("view engine", "ejs");

var db;

MongoClient.connect(
  "mongodb+srv://admin:qwer1234@cluster0.6juaf4r.mongodb.net/?retryWrites=true&w=majority",
  function (err, client) {
    if (err) {
      return console.log(err);
    }

    db = client.db("todoapp");

    app.listen(8080, function () {
      console.log("listening on 8080");
    });
  }
);

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/write", function (req, res) {
  res.sendFile(__dirname + "/write.html");
});

app.post("/add", function (req, res) {
  res.send("completed");
  //console.log(req.body);
  console.log(req.body.title);
  console.log(req.body.date);
  db.collection("post").insertOne(
    { Title: req.body.title, Date: req.body.date, _id: 1 },
    function (err, result) {
      console.log("Saved");
    }
  );
});

app.get("/list", function (req, res) {
  res.render("list.ejs");
});
