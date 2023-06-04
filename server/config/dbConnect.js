const mongoose = require("mongoose");

const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            family: 4,
        });
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = dbConnect;
