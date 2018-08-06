//Project init
const express = require("express");
const path = require("path");

const app = express();

//Port config
const PORT = process.env.PORT || 1337;

//Middleware to serve res to css file
app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});


//GET route 
app.get("/api/whoami", (req, res) => {
  //Getting user IP, same as npm request-ip
    const ip = (
    req.headers["x-forwarded-for"] ||
    req.connection.remoteAddress ||
    req.ip
  )
    .split(",")[0]
    .trim();
  const software = req.headers["user-agent"];
  const language = req.headers["accept-language"];

  res.send({ ipaddress: ip, language: language, software: software });
});


//Listening for requests here
app.listen(PORT, () => console.log(`Server is running on the Port ${PORT}`));
