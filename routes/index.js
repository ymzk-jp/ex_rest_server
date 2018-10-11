const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(process.env);
});

router.get('/tag', function (req, res, next) {
  var async = require('async');
  var SensorTag = require('sensortag');
  SensorTag.discover(function (sensorTag) {
    sensorTag.on('disconnect', function () {
      process.exit(0);
    });
    async.series([function (callback) {
      sensorTag.connectAndSetUp(callback);
    }, function (callback) {
      sensorTag.enableIrTemperature(callback);
    }, function (callback) {
      setTimeout(callback, 2000);
    }, function (callback) {
      sensorTag.readIrTemperature(function (error, objectTemperature, ambientTemperature) {
        console.log("temp: " + ambientTemperature);
        callback();
      });
    }, function (callback) {
      sensorTag.disableIrTemperature(callback);
    }, function (callback) {
      sensorTag.disconnect(callback);
    }]);
  });
});

module.exports = router;