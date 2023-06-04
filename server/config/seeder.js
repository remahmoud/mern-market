const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dbConnect = require("./dbConnect");
const User = require("../models/user.model");

dotenv.config();
dbConnect();

const users = [
    {
        name: "admin",
        email: "admin@test.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
    {
        name: "Mahmoud Ibrahiam",
        email: "mahmoud@test.com",
        password: bcrypt.hashSync("123456", 10),
        isAdmin: true,
    },
];

const seedUsers = async () => {
    try {
        await User.deleteMany();
        await User.insertMany(users);
        console.log("Data Import Success");
        process.exit();
    } catch (error) {
        console.error("Error with data import", error);
        process.exit(1);
    }
};

seedUsers().catch((error) => {
    console.error(error);
    process.exit(1);
});
