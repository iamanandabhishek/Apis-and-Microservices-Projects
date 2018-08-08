const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 1337;


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
