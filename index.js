var http = require('http');

var app = require('./app');

var port = process.env.PORT || 3000; // set port

var host = process.env.HOST || '127.0.0.1' // for heroku ( hebergement application nodeJS) to run successful

http.createServer(app).listen(port, host, () =>{
    console.log("Server ready at http://"+host+":"+port);
})