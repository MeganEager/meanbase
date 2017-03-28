const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

//User Schema -> database modle
const UserSchema = mongoose.Schema({
    name: {
       type: String 
    },
    email: {
       type: String,
       required: true
    },
    username:{
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = module.exports = mongoose.model('User', UserSchema);


//adds a user to DB
module.exports.addUser = function(newUser, callback){
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) =>{
            if(err){
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

//get user by ID
module.exports.getUserById = function(id, callback){
    User.findById(id, callback);
}

//get user by username or email
module.exports.getUserByUsernameOrEmail = function(username, email, callback){
    const query = {
        $or:[
            {username: username},
             {email: email}
            ]
    }
    User.findOne(query, callback);
}

//get user by username
module.exports.getUserByUsername = function(username, callback){
    const query = {username: username}
    User.findOne(query, callback);
}

//get user by email
module.exports.getUserByEmail = function(email, callback){
    const query = {email: email}
    User.findOne(query, callback);
}


//compare password with one from user to one in database
module.exports.comparePassword = function (enteredPassword, hashedPassword, callback){
    bcrypt.compare(enteredPassword, hashedPassword, (err, isMatch) =>{
        if(err){
            throw err;
        }
        callback(null, isMatch);
    });
}