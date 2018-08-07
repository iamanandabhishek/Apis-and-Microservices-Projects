const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const dns = require("dns");

const app = express();

const PORT = process.env.PORT || 1337;


app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/shorturl/new", (req, res) => {
    res.send({
        "error": "invalid URL"
    })
});

app.post("/api/shorturl/new", (req, res) => {
    console.log("trigger my digger");
    console.log(req.body);
    dns.lookup(req.body.url, (err, address, family) => {
        if (err) {
            console.log(err);
            res.send({redirect: "/api/shorturl/new"});
        } else {
            console.log(address);
            console.log(family);
            return res.send("Fine");
        }


    })
});


app.listen(PORT, () => console.log(`Server is running on the PORT ${PORT}`));