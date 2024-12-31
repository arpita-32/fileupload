"use strict";

var express = require("express");

var app = express();

require('dotenv').config();

var PORT = process.env.PORT || 3000;
app.use(express.json());

var fileupload = require("express-fileupload");

app.use(fileupload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
}));

var db = require("./config/database");

db.connect();

var cloudinary = require("./config/cloudinary");

cloudinary.cloudinaryConnect();

var Upload = require("./routes/FileUpload");

app.use('/api/v1/upload', Upload);
app.listen(PORT, function () {
  console.log("App is running at ".concat(PORT));
});
//# sourceMappingURL=index.dev.js.map
