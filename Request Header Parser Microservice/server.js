const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 1337;


app.use(express.static("public"));

app.get("/", (req, res) => {
    res.send("hello world");
});

app.get("/api/whoami", (req, res) => {
    const ip = (req.headers['x-forwarded-for']  || req.connection.remoteAddress || req.ip).split(",")[0].trim();
    const software = req.headers["user-agent"];
    const language = req.headers["accept-language"];
   
    res.send({ipaddress: ip,  language: language, software: software});
});













app.listen(PORT, () => console.log(`Server is running on the Port ${PORT}`));