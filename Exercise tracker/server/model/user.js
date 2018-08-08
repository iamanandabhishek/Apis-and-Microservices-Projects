const mongoose = require("mongoose");
const shortid = require("shortid");
const Schema = mongoose.Schema;

const User = Schema({
    _id: {
        'type': String,
        'default': shortid.generate
    },
    username: {
        type: String,
        required: true
    },
    count: Number,
    log: [{
        description: String,
        duration: Number,
        date: {
            type: Date,
            default: Date.now
        },
        _id:false
    }]
});

module.exports = mongoose.model("Users", User);