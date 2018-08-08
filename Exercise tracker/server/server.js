const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const db = require("./secret/secret");
const bodyParser = require("body-parser");
const User = require("./model/user");
const app = express();

let tmpId;

mongoose.connect(db.key, {
    useNewUrlParser: true
});

const PORT = process.env.PORT || 1337;

//Mongoose woooohooo

app.use(bodyParser.json());

app.use(express.static("public"));

const John = new User({
    username: "monkaS"
});

John.save((err, data) => {
    console.log(data);
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../views", "index.html"));
});

app.get("/api/exercise/new-user", (req, res) => {
    if (tmpId) {
        User.findById({
            _id: tmpId
        }, "_id username", (err, user) => {
            if (err) return new Error(err).message;
            res.send(user);
            tmpId = null;
        })
    }
    else {
        res.send("not found");
    }
})

app.get("/api/exercise/users", (req, res) => {
    User.find({}, "_id username", (err, users) => {
        if (err) return new Error(err).message;
        res.send(users);
    })
});

app.post("/api/exercise/new-user", (req, res) => {
    const userRecieve = req.body.username;
    User.findOne({
        username: userRecieve
    }, (err, data) => {
        if (err) return new Error(err).message;
        console.log(data)
        if (!data) {
            const user = new User({
                username: userRecieve
            });
            user.save((err, data) => {
                if (err) return new Error(err).message;
                console.log(data);
                tmpId = data._id;
                res.send({
                    redirect: "/api/exercise/new-user"
                })
            })
        }
    });


});

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));