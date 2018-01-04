
const express = require('express');
const path = require('path');
const http = require('http');
var cors = require('cors')
const bodyParser = require('body-parser');
var ViewPath = path.join(__dirname, './../src')

var index = require('./routes/index');
var tasks = require('./routes/tasks');


/**
 * Get port from environment and store in Express.
 */
 
 const app = express();
const port = process.env.PORT || '3000';
app.set('port', port);

app.use(cors())
//View Engine

// Set Static Folder
app.use(express.static(path.join(__dirname, './../src')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api', tasks);
    
 app.listen(port, function(){
    console.log('Server started on port '+port);
});
 

