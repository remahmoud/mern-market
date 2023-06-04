const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        name: {
            type: String,
            required: true,
            trim: true,
            maxlength: 100,
        },

        description: {
            type: String,
            required: true,
            trim: true,
            maxlength: 1000,
        },
        price: {
            type: Number,
            required: true,
            trim: true,
            maxlength: 100,
        },
        quantity: {
            type: Number,
            required: true,
            default: 1,
        },
        sold: {
            type: Number,
            default: 0,
        },
        images: {
            type: Array,
            default: [],
        },
        category: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            virtuals: true,
            transform: function (doc, product) {
                delete product._id;
            },
        },
        toObject: { virtuals: true },
    }
);

module.exports = mongoose.model("Product", Product);
