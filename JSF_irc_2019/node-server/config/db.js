const mongoose = require("mongoose");

const _20027017 = 'mongodb://xxxxxxxxxxxx@xxx.xxx.xxx.xxx:27017/IRC-ml';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect(_20027017, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to DB !!");
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = InitiateMongoServer;
