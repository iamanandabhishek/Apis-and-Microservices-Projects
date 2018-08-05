const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 1337;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/timestamp/:date_string?", (req, res) => {
  let dateString = req.params.date_string;
  const date = dateString ? new Date(dateString) : new Date();
  res.send(
    date.toString() === "Invalid Date"
      ? { error: "Invalid Date" }
      : { unix: date.getTime(), utc: date.toUTCString() }
  );
});

app.listen(PORT, () =>
  console.log(`The server is running on the Port: ${PORT}`)
);
