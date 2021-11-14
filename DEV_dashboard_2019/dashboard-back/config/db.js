import mongoose from 'mongoose';

const InitiateMongoServer = async () => {
    try {
        await mongoose.connect('mongodb://MartinLepoutre:epitech2019@51.91.254.200:27017/IRC-ml', {
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