//APP API Endpoint
// Setup empty JS object to act as endpoint for all routes
projectData = {};

//Project Dependencies
// Require Express to run server and routes
const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
// Start up an instance of app
const app=express()
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
//Local Server
app.listen(3000);