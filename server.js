// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes

const express = require('express'); //include Express installation
const app = express(); //create new instance of app

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors());

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server and start it up
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log('Server running.')
    console.log(`Running on localhost: ${port}`);
}

//GET route
app.get('/all', function (req, res) {
    console.log("Get request received");
    res.send(projectData);
    console.log(projectData);
  })

//POST route
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userResponse = req.body.userResponse;
    res.end();
    console.log(projectData);
}
