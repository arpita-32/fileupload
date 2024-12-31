"use strict";

var mongoose = require("mongoose");

var nodemailer = require("nodemailer");

var fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String
  },
  tags: {
    type: String
  },
  email: {
    type: String
  }
});
fileSchema.post("save", function _callee(doc) {
  var transporter, info;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          console.log("DOC", doc);
          transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
              user: process.env.MAIL_USER,
              pass: process.env.MAIL_PASS
            }
          });
          _context.next = 5;
          return regeneratorRuntime.awrap(transporter.sendMail({
            from: "Web",
            to: doc.email,
            subject: "New file uploaded on cloudinary",
            html: "<h2>Hello</h2> <p>File uploaded View here: <a href=\"".concat(doc.imageUrl, "\">").concat(doc.imageUrl, "</a> </p>")
          }));

        case 5:
          info = _context.sent;
          console.log("INFO", info);
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
});
var File = mongoose.model("File", fileSchema);
module.exports = File;
//# sourceMappingURL=File.dev.js.map
