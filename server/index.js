const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1> hello world!</h1>");
});

let PORT = 4500;
app.listen(PORT, (req, res) => {
  console.log("server listening on port");
});
