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
        image: {
            type: String,
            default:
                "https://tailwindui.com/img/ecommerce-images/product-page-03-related-product-01.jpg",
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
