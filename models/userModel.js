const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name : {
        type: String,
        requires: true
    },

    email : {
        type: String,
        requires: true
    },

    password : {
        type: String,
        requires: true
    },

    id : {
        type: String,
    },
});

module.exports = mongoose.model("User",userSchema);