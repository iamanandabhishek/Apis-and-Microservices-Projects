const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./secret/secret");
const bodyParser = require("body-parser");
const User = require("./model/user");
const app = express();

let tmpId, tmpData;

mongoose.connect(db.key, {
    useNewUrlParser: true
});

const PORT = process.env.PORT || 1337;

app.use(bodyParser.json());

app.use(express.static("public"));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

app.get("/api/exercise/new-user", (req, res) => {
    if (tmpId == "username") {
        res.send("username already taken");
    } else if (tmpId === "no username") {
        res.send("Path `username` is required.");
    } else if (tmpId) {
        User.findById({
            _id: tmpId
        }, "_id username", (err, user) => {
            if (err) return new Error(err).message;
            res.send(user);

        })
    } else {
        res.send("not found");
    }
    tmpId = null;
})

app.get("/api/exercise/users", (req, res) => {
    User.find({}, "_id username", (err, users) => {
        if (err) return new Error(err).message;
        res.send(users);
    })
});

app.get("/api/exercise/add", (req, res) => {
    if (tmpId == "unknown") {
        res.send("unknown _id");
    } else if (tmpId == "no description") {
        res.send("Path `description` is required.");
    } else if (tmpId == "no duration") {
        res.send("Path `duration` is required.");
    } else if (tmpId == "not a number") {
        res.send(`Cast to Number failed for value "a" at path "duration"`);
    } else if (tmpId == "short") {
        res.send(`duration too short`);
    } else {
        User.findById(tmpId, (err, user) => {
            res.send(tmpData);
        })
    }
    tmpId = null;
})

app.get("/api/exercise/log?", (req, res) => {
    User.findOne({
        _id: req.query.userId
    }, "-__v", (err, user) => {
        if (err) return err;
        if (user) {
            const fromDate = new Date(req.query.from).valueOf();
            const toDate = new Date(req.query.to).valueOf();
            fromDate ? user.log = user.log.filter(obj => obj.date.valueOf() >= fromDate) : null;
            toDate ? user.log = user.log.filter(obj => obj.date.valueOf() <= toDate) : null;
            req.query.limit ? user.log.splice(req.query.limit, user.log.length) : null;
            res.send(user);
        } else {
            res.send("unknown userId");
        }

    })
});

app.post("/api/exercise/new-user", (req, res) => {
    const userRecieve = req.body.username;
    if (userRecieve === "") {
        tmpId = "no username";
        res.send({
            redirect: "/api/exercise/new-user"
        })
    }
    User.findOne({
        username: userRecieve
    }, (err, data) => {
        if (err) return new Error(err).message;
        if (!data) {
            const user = new User({
                username: userRecieve
            });
            user.save((err, data) => {
                if (err) return new Error(err).message;
                tmpId = data._id;
                res.send({
                    redirect: "/api/exercise/new-user"
                })
            })
        } else {
            tmpId = "username";
            res.send({
                redirect: "/api/exercise/new-user"
            })
        }
    });
});

app.post("/api/exercise/add", (req, res) => {
    const userRecieve = req.body.details;
    User.findById(userRecieve._id, (err, user) => {
        if (!user) {
            tmpId = "unknown"
            res.send({
                redirect: "/api/exercise/add"
            });
        } else {
            if (userRecieve.description == "") {
                tmpId = "no description";
                res.send({
                    redirect: "/api/exercise/add"
                });
            } else if (userRecieve.duration == "" || (parseInt(userRecieve.duration) !== +userRecieve.duration) || +userRecieve.duration < 0) {
                tmpId = userRecieve.duration == "" ? "no duration" : isNaN(userRecieve.duration) ? "not a number" : "short";
                res.send({
                    redirect: "/api/exercise/add"
                });
            } else {
                user.count ? ++user.count : (user.count = 1);
                const date = new Date(userRecieve.date) === "Invalid Date" ? "" : userRecieve.date;
                tmpData = {
                    description: userRecieve.description,
                    duration: +userRecieve.duration,
                    date: date.toString()
                };
                user.log.push(tmpData);
                user.save((err, data) => {
                    if (err) return new Error(err).message;
                    tmpId = data._id;
                    tmpData = Object.assign({
                        username: data.username,
                        _id: data._id
                    }, tmpData);
                    res.send({
                        redirect: "/api/exercise/add"
                    });
                })
            }
        }
    })
});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));