const mongoose = require('mongoose');

const User = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 1024
    },
    role:  {
        type: String,
        required: true,
        default: 'User'
    },
    currency: {
        type: String,
        minlength: 3,
        maxlength: 4,
        default: "usd"
    },
    twitter_id : {
        type: String
    }
});

// function to verify the data fro push on the db (use Joi npm)

module.exports = mongoose.model('user', User);