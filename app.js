const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connecting to DB
mongoose.connect(config.database);
//on db connection
mongoose.connection.on('connected', () =>{
    console.log('Connected to mongodb: ' + config.database);
});
//on db error
mongoose.connection.on('error', (err) =>{
    console.log('Mongodb error: ' + err);
});

const app = express();

//bringing in dependency user routers (stuff to do with the user, login, register, etc)
const users = require('./routes/users');

const port = 3000;

//Cors middleware -> allowing access from other domains, public website
app.use(cors());

//set static files folder
app.use(express.static(path.join(__dirname, 'public')));

//body parser Middleware -> gets input from user forms
app.use(bodyParser.json());

//passport middleware
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

//using the user route file
app.use('/users', users);

//index route
app.get('/', (req, res) =>{
    res.send("Invalid");
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index'));
})

//start server message
app.listen(port, () =>{
    console.log("Server started on port: " + port);
});
