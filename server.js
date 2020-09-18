// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes

const express = require('express'); //include Express installation
const app = express(); //create new instance of app

/* Dependencies */
const bodyParser = require('body-parser');
const cors = require('cors');

//Send hello world

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening(){
    console.log('Server running.')
    console.log(`Running on localhost: ${port}`);
}

//GET route
app.get('/all', function(){
    console.log("Hello, world");
});

function getWeather(req, res) {
    console.log("GET request received:");
    let projectData = request.body;
    //res.send(projectData);
    console.log(projectData);
};

//POST route
app.post('/addWeather', addWeather);

function addWeather(req, res) {
    newEntry = {
        temperature: req.body.temperature,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    projectData.push(newEntry);
    res.send(projectData)
    console.log("POST request received:");
    console.log(projectData);
}
