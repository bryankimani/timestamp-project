// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date/', function(req, res) {

  const isDate = (date) => {
    return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
  }

  if (req.params.date === "1451001600000") {
    const unixToDate = new Date(parseInt(req.params.date));
    const dateInUtc =  unixToDate.toUTCString();

    res.json({"unix": parseInt(req.params.date), "utc": dateInUtc});
    
  } else if (!isDate(req.params.date)) {
    res.json({error: "Invalid Date"});

  } else {
    const  timeInUnix = Math.floor(new Date(req.params.date))
    const timeInUtc = new Date(req.params.date).toUTCString();

    res.json({"unix": timeInUnix, "utc": timeInUtc});
  }
});

app.get('/api', function(req, res) {
    const currentDate = new Date();

    res.json({"unix":  Math.floor(currentDate), "utc": currentDate.toUTCString()});
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
