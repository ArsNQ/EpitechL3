import mongoose from 'mongoose';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect('mongodb://xxxxxxxxxxx@xxx.xxx.xxx.xxx:27017/IRC-ml', {
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
