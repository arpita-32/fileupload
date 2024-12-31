"use strict";

var File = require("../models/File");

var cloudinary = require("cloudinary").v2;

exports.localFileUpload = function _callee(req, res) {
  var file, path;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          try {
            file = req.files.file;
            console.log("FILE ->", file);
            path = __dirname + "/files/" + Date.now() + ".".concat(file.name.split('.')[1]);
            console.log("PATH-> ", path);
            file.mv(path, function (err) {
              if (err) {
                console.error(err);
                return res.status(500).json({
                  success: false,
                  message: 'Error in file upload'
                });
              }
            });
            res.json({
              success: true,
              message: 'Local file upload successfully'
            });
          } catch (error) {
            console.error("Not able to upload the file on server:", error);
            res.status(500).json({
              success: false,
              message: 'Server error in file upload'
            });
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

function uploadFileToCloudinary(file, folder, quality) {
  var options, response;
  return regeneratorRuntime.async(function uploadFileToCloudinary$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          options = {
            folder: folder,
            resource_type: "auto",
            timeout: 120000 // Increased timeout for larger files

          };

          if (quality) {
            options.quality = quality;
          }

          console.log('Uploading to Cloudinary with options:', options);
          console.log('File temp path:', file.tempFilePath);
          _context2.next = 7;
          return regeneratorRuntime.awrap(cloudinary.uploader.upload(file.tempFilePath, options));

        case 7:
          response = _context2.sent;
          console.log('Cloudinary response:', response);
          return _context2.abrupt("return", response);

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](0);
          console.error("Error uploading to Cloudinary:", _context2.t0);
          throw _context2.t0;

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 12]]);
}

exports.imageUpload = function _callee2(req, res) {
  var _req$body, name, tags, email, file, supportedTypes, fileType, response, fileData;

  return regeneratorRuntime.async(function _callee2$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _req$body = req.body, name = _req$body.name, tags = _req$body.tags, email = _req$body.email;
          console.log(name, tags, email);
          file = req.files.imageFile;
          console.log(file);
          supportedTypes = ["jpg", "jpeg", "png"];
          fileType = file.name.split('.')[1].toLowerCase();

          if (isFileTypeSupported(fileType, supportedTypes)) {
            _context3.next = 9;
            break;
          }

          return _context3.abrupt("return", res.status(400).json({
            success: false,
            message: 'File format not supported'
          }));

        case 9:
          _context3.next = 11;
          return regeneratorRuntime.awrap(uploadFileToCloudinary(file, "Web"));

        case 11:
          response = _context3.sent;
          console.log(response);
          _context3.next = 15;
          return regeneratorRuntime.awrap(File.create({
            name: name,
            tags: tags,
            email: email,
            imageUrl: response.secure_url
          }));

        case 15:
          fileData = _context3.sent;
          res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded'
          });
          _context3.next = 23;
          break;

        case 19:
          _context3.prev = 19;
          _context3.t0 = _context3["catch"](0);
          console.error(_context3.t0);
          res.status(500).json({
            success: false,
            message: 'Something went wrong',
            error: _context3.t0.message
          });

        case 23:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

exports.videoUpload = function _callee3(req, res) {
  var _req$body2, name, tags, email, file, supportedTypes, fileType, response, fileData;

  return regeneratorRuntime.async(function _callee3$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          _req$body2 = req.body, name = _req$body2.name, tags = _req$body2.tags, email = _req$body2.email;
          console.log(name, tags, email);

          if (!(!req.files || !req.files.videoFile)) {
            _context4.next = 5;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: 'No video file uploaded'
          }));

        case 5:
          file = req.files.videoFile;
          console.log('Video file:', file);
          supportedTypes = ["mp4", "mov"];
          fileType = file.name.split('.')[1].toLowerCase();

          if (isFileTypeSupported(fileType, supportedTypes)) {
            _context4.next = 11;
            break;
          }

          return _context4.abrupt("return", res.status(400).json({
            success: false,
            message: 'File format not supported'
          }));

        case 11:
          _context4.next = 13;
          return regeneratorRuntime.awrap(uploadFileToCloudinary(file, "Web"));

        case 13:
          response = _context4.sent;
          console.log('Cloudinary response:', response);
          _context4.next = 17;
          return regeneratorRuntime.awrap(File.create({
            name: name,
            tags: tags,
            email: email,
            imageUrl: response.secure_url
          }));

        case 17:
          fileData = _context4.sent;
          res.json({
            success: true,
            videoUrl: response.secure_url,
            message: 'Video successfully uploaded'
          });
          _context4.next = 25;
          break;

        case 21:
          _context4.prev = 21;
          _context4.t0 = _context4["catch"](0);
          console.error('Video upload error:', _context4.t0);
          res.status(500).json({
            success: false,
            message: 'Video upload failed',
            error: _context4.t0.message
          });

        case 25:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 21]]);
};

exports.imageSizeReducer = function _callee4(req, res) {
  var _req$body3, name, tags, email, file, supportedTypes, fileType, response, fileData;

  return regeneratorRuntime.async(function _callee4$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _req$body3 = req.body, name = _req$body3.name, tags = _req$body3.tags, email = _req$body3.email;
          console.log(name, tags, email);

          if (!(!req.files || !req.files.imageFile)) {
            _context5.next = 5;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            success: false,
            message: 'No image file uploaded'
          }));

        case 5:
          file = req.files.imageFile;
          console.log('Image file:', file);
          supportedTypes = ["jpg", "jpeg", "png"];
          fileType = file.name.split('.')[1].toLowerCase();

          if (isFileTypeSupported(fileType, supportedTypes)) {
            _context5.next = 11;
            break;
          }

          return _context5.abrupt("return", res.status(400).json({
            success: false,
            message: 'File format not supported'
          }));

        case 11:
          _context5.next = 13;
          return regeneratorRuntime.awrap(uploadFileToCloudinary(file, "Web", 30));

        case 13:
          response = _context5.sent;
          console.log('Cloudinary response:', response);
          _context5.next = 17;
          return regeneratorRuntime.awrap(File.create({
            name: name,
            tags: tags,
            email: email,
            imageUrl: response.secure_url
          }));

        case 17:
          fileData = _context5.sent;
          res.json({
            success: true,
            imageUrl: response.secure_url,
            message: 'Image successfully uploaded with reduced size'
          });
          _context5.next = 25;
          break;

        case 21:
          _context5.prev = 21;
          _context5.t0 = _context5["catch"](0);
          console.error('Image size reducer error:', _context5.t0);
          res.status(500).json({
            success: false,
            message: 'Image compression failed',
            error: _context5.t0.message
          });

        case 25:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 21]]);
};
//# sourceMappingURL=fileUpload.dev.js.map
