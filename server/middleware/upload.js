const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir =
            process.env.Node_ENV === "production"
                ? "server/uploads/"
                : "client/public/uploads/";
        cb(null, dir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png")
        cb(null, true);
    else cb(null, false);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;
