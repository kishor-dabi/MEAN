const db = require("../models");
const moment = require("moment");
const User = db.user;
const DeveloperModel = db.developer;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var MY_TOKEN_SECRET = 'MY_TOKEN_SECRET'
// Create and Save a new Tutorial
exports.login = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Please enter email!" });
    return;
  }
  if (!req.body.password) {
    res.status(400).send({ message: "Please enter password!" });
    return;
  }
  if (!req.body.user_type) {
    res.status(400).send({ message: "Please select user type!" });
    return;
  }

  const email = req.body.email;

  if (req.body.user_type == 1) {
    User.find({email:email, user_type:1})
    .then(data => {
        if (data.length == 0)
        res.status(404).send({ message: "Not found with id " });
        else {
            if(data.length){

            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                console.log(result);
                if (result) {
                    let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data[0]
                    }, MY_TOKEN_SECRET);
                    let resData = data[0];
                    resData.token = token;
                    res.send(resData);
        
                }else{
                    res.status(400).send({message:"Invalid username or password"});
                }
            });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res
        .status(500)
        .send({ message: "Error retrieving with id=" + email });
    });
  }else if (req.body.user_type == 2) {
      
    User.find({email:email})
    .then(data => {
        if (data.length == 0)
        res.status(404).send({ message: "Not found with id " });
        else {
            if(data.length){

            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                console.log(result);
                if (result) {
                    let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data[0]
                    }, 'MY_TOKEN_SECRET');
                    let resData = data[0];
                    resData.token = token;
                    res.send(resData);
        
                }else{
                    res.status(400).send({message:"Invalid username or password"});
                }
            });
            }
        }
    })
    .catch(err => {
        console.log(err);
        res
        .status(500)
        .send({ message: "Error retrieving with id=" + email });
    });
  }else if (req.body.user_type == 3) {
    
    DeveloperModel.find({email:email})
    .then(data => {
        // console.log(data, "dev data");
        if (data.length == 0)
        res.status(404).send({ message: "Not found with id " });
        else {
            if(data.length){

            bcrypt.compare(req.body.password, data[0].password, function(err, result) {
                console.log(result);
                if (result) {
                    let token = jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60),
                    data: data[0]
                    }, 'MY_TOKEN_SECRET');
                    let resData = data[0];
                    resData.token = token;
                    res.send(resData);
        
                }else{
                    res.status(400).send({message:"Invalid username or password"});
                }
            });


            }
        }
    })
    .catch(err => {
        console.log(err);
        res
        .status(500)
        .send({ message: "Error retrieving with id=" + email });
    });
  }

};

