// Setup empty JS object to act as endpoint for all routes
projectData = {temperature:'',date:'',userResponse:''};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser');
const cors = require('cors');

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Get routes
app.get('/projectData', getData);
app.post('/addData', addData);
function getData(req,res){res.send(projectData);}
function addData(req,res){
    const data = req.body;
    projectData.temperature = data.temperature;
    projectData.date = data.date;
    projectData.userResponse = data.userResponse;
}
// Setup Server
const port = 8000;
const server = app.listen(port, ()=>{console.log(`running on localhost: ${port}`)});
