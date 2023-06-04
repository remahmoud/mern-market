const cors = require("cors");
const path = require("path");
const morgan = require("morgan");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const dbConnect = require("./config/dbConnect");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");

// config
dotenv.config();
dbConnect();

// app config
const port = process.env.PORT || 5000;
const app = express();

// dev
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"));
}

// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// // serve static files
// app.use(express.static(path.join(__dirname, "../build")));
// app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "../build/index.html"));
// });

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(port, () => {
    console.log(`server started at port ${port}`);
});
