const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please enter your name"],
            trim: true,
            maxLength: [30, "Your name cannot exceed 30 characters"],
        },
        email: {
            type: String,
            required: [true, "Please enter your email"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "Please enter your password"],
            trim: true,
            select: false,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
            default: "https://i.pravatar.cc/150?u=" + new Date().getTime(),
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, user) {
                delete user._id;
                return user;
            },
        },
    }
);

// hash password before saving to database
User.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// compare password
User.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// generate token
User.methods.generateToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

module.exports = mongoose.model("User", User);
