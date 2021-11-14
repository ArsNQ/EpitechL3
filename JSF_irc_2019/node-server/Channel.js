const mongoose = require("mongoose");

const ChannelSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    chanelName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

// export model user with UserSchema
module.exports = mongoose.model("channels", ChannelSchema);