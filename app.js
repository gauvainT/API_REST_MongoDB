const express = require("express");
const Mongoose = require("mongoose");
const BodyParser = require("body-parser");
var configDb = require('./configDatabase/configDb');

var app = express();
Mongoose.connect(configDb.Database_Url);

// when successfully connected
Mongoose.connection.on('connected', () => {
    console.log('Mongoose default connection open to : ' + configDb.Database_Url);
  });
  
  // when connection throws an error
  Mongoose.connection.on('error', (err) => {
    console.log('Mongoose default connection error: ' + err);
  });
  
  // when connection is disconnected
  Mongoose.connection.on('disconnected', (err) => {
    console.log('Mongoose default connection disconnected:', err);
  });
  
  // close the Mongoose connection when node process ends
  process.on('SIGINT', function() {
    Mongoose.connection.close(() => {
      console.log('Mongoose default connection disconnected through app termination');
      process.exit(0);
    });
});
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Listening at :3000...");
});



var apiSession = require('./controllersApi/sessionApi')(express, Mongoose);
app.use('/api', apiSession);

var apiFormateur = require('./controllersApi/formateurApi')(express, Mongoose);
app.use('/api', apiFormateur);

var apiSpecialite = require('./controllersApi/specialiteApi')(express, Mongoose);
app.use('/api', apiSpecialite);

var apiApprenant = require('./controllersApi/apprenantApi')(express, Mongoose);
app.use('/api', apiApprenant);

module.exports = app;