const mongoose = require('mongoose');

const Crypto = new mongoose.Schema ({
    cryptoID:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        unique: true
    },
    cryptoNAME:{
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255,
        unique: true
    },
    cryptoENABLE:{
        type: Boolean,
        default: false
    },
})

module.exports = mongoose.model('Crypto', Crypto);