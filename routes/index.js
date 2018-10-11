const express = require('express');
const router = express.Router();
const async = require('async');
const SensorTag = require('sensortag');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.send(process.env);
});

router.get('/tag', (req, res, next) => {
  SensorTag.discover((sensorTag) => {
    sensorTag.on('disconnect', () => {
      process.exit(0);
    });
    async.series([(callback) => {
      sensorTag.connectAndSetUp(callback);
    }, (callback) => {
      sensorTag.enableIrTemperature(callback);
    }, (callback) => {
      setTimeout(callback, 2000);
    }, (callback) => {
      sensorTag.readIrTemperature((error, objectTemperature, ambientTemperature) => {
        console.log("temp: " + ambientTemperature);
        res.send("temp: " + ambientTemperature);
        callback();
      });
    }, (callback) => {
      sensorTag.disableIrTemperature(callback);
    }, (callback) => {
      sensorTag.disconnect(callback);
    }]);
  });
});

module.exports = router;