const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const dns = require("dns");
const dbKey = require("./secret/secret.js");

const app = express();
let url_id;

mongoose.connect(dbKey.db);

const PORT = process.env.PORT || 1337;

const Schema = mongoose.Schema;

const urlSchema = Schema({
    original_url: String,
    short_url: Number
});
const URL = mongoose.model("URL", urlSchema);

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});


app.get("/api/shorturl/:id", (req, res) => {
    const id = req.params.id;
    if (id === "new") {
        if (url_id) {
            URL.findById(url_id, "-_id -__v", (err, data) => {
                url_id = null;
                res.send(data)
            })
        } else {
            res.send({
                "error": "invalid URL"
            })
        }
    } else if (parseInt(id) === +id) {
        URL.findOne({
            short_url: +req.params.id
        }, (err, data) => {

            if (err) return new Error(err);
            else if (!data) {
                res.send({
                    "error": "No short url found for given input"
                });
            } else {
                res.redirect("https://" + data.original_url);
            }

        });
    } else {
        res.send({
            "error": "invalid URL"
        })
    }

})

app.post("/api/shorturl/new", (req, res) => {
    dns.lookup(req.body.url, (err, address, family) => {
        if (err) {
            res.send({
                redirect: "/api/shorturl/new"
            });
        } else {
            URL.findOne({
                original_url: req.body.url
            }, (err, found) => {
                if (!found) {
                    URL.find().count((err, count) => {
                        if (err) console.log(new Error(err));
                        const urlInstance = new URL({
                            original_url: req.body.url,
                            short_url: +count
                        });
                        urlInstance.save((err, data) => {
                            if (err) console.log(err);
                            url_id = data["_id"];
                            res.send({
                                redirect: "/api/shorturl/new"
                            });

                        })
                    });
                } else {
                    url_id = found["_id"];
                    res.send({
                        redirect: "/api/shorturl/new"
                    });
                }
            });



        }


    })
});


app.listen(PORT, () => console.log(`Server is running on the PORT ${PORT}`));