import mongoose from "mongoose";

const Users = new mongoose.Schema({
    email: String,
    password: String,
    name: String,
    twitter_id: String,
    accountType: String,
    location: Object,
    service: {
        type: Object,
        default: {}
    },
    dashboard: {
        type: Object,
        default: {}
    },
    createdAt: Number,
    updatedAt: Number,
}, { timestamps: { currentTime: () => Date.now() } });

export default mongoose.model('users', Users);
