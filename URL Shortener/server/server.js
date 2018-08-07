//Project init

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
const dns = require("dns");
const dbKey = require("./secret/secret.js");

//App config
const app = express();
let url_id;

//DB connect, use your own DB here
mongoose.connect(dbKey.db);

const PORT = process.env.PORT || 1337;

//URL Schema
const Schema = mongoose.Schema;

const urlSchema = Schema({
    original_url: String,
    short_url: Number
});

//URL Model
const URL = mongoose.model("URL", urlSchema);

//Middlewares
app.use(express.static("public"));

app.use(bodyParser.json());


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

//Main server logic
app.get("/api/shorturl/:id", (req, res) => {
    const id = req.params.id;

    //Checking if params passed is new
    if (id === "new") {
        if (url_id) { //If id exists (coming from redirect POST)
            URL.findById(url_id, "-_id -__v", (err, data) => {
                url_id = null;
                res.send(data)
            })
        } else { //Default case
            res.send({
                "error": "Wrong Format"
            });
        }
    } else if (parseInt(id) === +id) { //If valid number is passed then queried to DB
        URL.findOne({
            short_url: +req.params.id
        }, (err, data) => {
            if (err) return new Error(err);
            else if (!data) { //if no result found
                res.send({
                    "error": "No short url found for given input"
                });
            } else {
                //otherwise redirect
                res.redirect("https://" + data.original_url);
            }
        });
    } else {
        res.send({
            "error": "Wrong Format"
        });
    }
})

//AJAX POST request coming from form submit 
app.post("/api/shorturl/new", (req, res) => {
    //Looking if the site exists or not
    dns.lookup(req.body.url, (err, address, family) => {
        if (err) { //If invalid URL
            res.send({
                redirect: "/api/shorturl/new"
            });
        } else {
            URL.findOne({ //Otherwise querying the DB
                original_url: req.body.url
            }, (err, found) => {
                if (!found) {
                    URL.find().count((err, count) => {
                        if (err) console.log(new Error(err));
                        const urlInstance = new URL({ //Creating new model
                            original_url: req.body.url,
                            short_url: +count
                        });
                        urlInstance.save((err, data) => { //Save
                            if (err) console.log(err);
                            url_id = data["_id"];
                            res.send({
                                redirect: "/api/shorturl/new"
                            });
                        })
                    });
                } else { //Assigning ID and redirecting
                    url_id = found["_id"];
                    res.send({
                        redirect: "/api/shorturl/new"
                    });
                }
            });
        }
    })
});

//Listening for requests
app.listen(PORT, () => console.log(`Server is running on the PORT ${PORT}`));