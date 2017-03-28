const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

//Register
router.post('/register', (req, res, next) =>{
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    
    User.addUser(newUser, (err, user) => {
        if(err){
            res.json({success: false, msg: 'Failed to register User'});
        }else{
            res.json({success: true, msg: 'User registered'});
        }
    });
});


//authenticate
router.post('/authenticate', (req, res, next) =>{
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    
    User.getUserByUsernameOrEmail(username, email, (err, user) =>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: 'No user found'});
        }
        
          User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                throw err;
            }
            if(isMatch){
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 //one week
                });
                
                res.json({
                    success: true, 
                    token: 'JWT '+token, 
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            }else{
                return res.json({success: false, msg: 'Wrong password'});
            }
        });
    });
});

//forgot password
router.post('/sendForgotPassword', (req, res, next) =>{
    const username = req.body.username;
    const email = req.body.email;
    
    User.getUserByUsernameOrEmail(username, email, (err, user) =>{
       if(err){
           throw err;
       } 
        if(!user){
            return res.json({success: false, msg: 'If you are registered with that username/email you will recive an email soon'});
        }else{
            return res.json({success: true, msg: 'If you are registered with that username/email you will recive an email soon'});
        }
    });
});

router.post('/resetPassword',(req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const newpassword = req.body.newpassword;
    
//    return res.json({success: true, msg: 'If you are registered with that username/email you will recive an email soon'});
    
    User.getUserByUsernameOrEmail(username, email, (err, user) =>{
        if(err){
            throw err;
        }
        if(!user){
            return res.json({success: false, msg: 'No user found'});
        }
        
          User.comparePassword(password, user.password, (err, isMatch) =>{
            if(err){
                throw err;
            }
            if(isMatch){
                User.resetPassword(user, newpassword, (err, user) =>{
                   if(err){
                      res.json({success: false, msg: 'Ops. Something went wrong'});
                   }else{
                     res.json({success: true, msg: 'Password Changed'});  
                   } 
                });
            }else{
                return res.json({success: false, msg: 'Something went wrong'});
            }
          });
    });
    
});

//profile (protected route)
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) =>{
    res.json({
        user: req.user
    });
});


module.exports = router;