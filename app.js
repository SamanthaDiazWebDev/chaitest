const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.json());

const people = [];

app.post("/api/v1/people", (req, res) => {
  if (!req.body.name) {
    res.status(400).json({ error: "Enter Name" });
    return;
  }
  if (!req.body.age) {
    res.status(400).json({ error: "Enter Age" });
    return;
  }
  const age = Number(req.body.age);
  if (isNaN(age) || age < 0) {
    res.status(400).json({ error: "The age must be greater than 0" });
    return;
  }
  req.body.age = age;
  req.body.index = people.length;
  people.push(req.body);
  res
    .status(201)
    .json({ message: "Person added.", index: req.body.index });
});

app.get("/api/v1/people", (req, res) => {
  res.json(people);
});

app.get("/api/v1/people/:id", (req, res) => {
  const index = Number(req.params.id);
  if (
    isNaN(index) ||
    !Number.isInteger(index) ||
    index < 0 ||
    index >= people.length
  ) {
    res.status(404).json({ message: "Person information not found" });
    return;
  }
  res.json(people[index]);
});

app.all("/api/v1/*", (req, res) => {
  res.json({ error: "That route is not implemented." });
});

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});

module.exports =  { app, server }