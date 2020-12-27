
const db = require("../models");
const moment = require("moment");
const User = db.user;
const DeveloperModel = db.developer;
const Task = db.task;
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const mongoose = require("mongoose");

const ObjectId = mongoose.Types.ObjectId;

exports.adminDashboardCount = (req, res) => {

  let  devId = req.params.id;
  const resBody = {} ;
  User.find({'user_type':{$ne :1}}).countDocuments()
  .then(data => {
    if (!data)
    res.status(404).send({ message: "Not found with id " });
    else {
    //   res.status(200).send({manager:data});
      resBody.manager = data;
      let devquery = devId ? {manager:devId} : {}
      DeveloperModel.find(devquery).countDocuments()
        .then(devdata => {
            // if (!devdata)
            // res.status(404).send({ message: "Not found with id " });
            // else {
            //   res.status(200).send({manager:devdata});
            resBody.developer = devdata ? devdata : 0;
            let taskquery = devId ? {user_id:devId, } : {} // $group: 'status'
            
            if (devId) { //status
                Task.aggregate([{$group :{ "_id": "$status", count: { $sum: 1 }}}])//.countDocuments()
                    .then(taskData => {
                        // if (!taskData)
                        // res.status(404).send({ message: "Not found with id " });
                        // else {
                        resBody.task = taskData;
                        res.status(200).send(resBody);
                        
                        // }
                    })
                    .catch(err => {
                        console.log(err);
                        res
                        .status(500)
                        .send({ message: err  });
                    });
            }else {
                Task.find(taskquery).countDocuments()
                    .then(taskData => {
                        // if (!taskData)
                        // res.status(404).send({ message: "Not found with id " });
                        // else {
                        console.log(taskData , "taskData");
                        resBody.task = taskData;
                        res.status(200).send(resBody);
                        
                        // }
                    })
                    .catch(err => {
                        console.log(err);
                        res
                        .status(500)
                        .send({ message: err  });
                    });
            }

            // }
        })
        .catch(err => {
            console.log(err);
            res
            .status(500)
            .send({ message: err  });
        });
    }
})
.catch(err => {
    console.log(err);
    res
    .status(500)
    .send({ message: err  });
});

};


exports.devDashboardCount = (req, res) => {

    let  Id = req.params.id;
    const resBody = {} ;
let devId = null


    // DeveloperModel.findById({'user_type':{$ne :1}}).countDocuments()
    DeveloperModel.findById(Id)//.countDocuments()
    .then(data => {
      if (!data)
      res.status(404).send({ message: "Not found with id " });
      else {
      //   res.status(200).send({manager:data});
        resBody.manager = data;
        devId = data.manager;
        let devquery = devId ? {manager:data.manager} : {}
        DeveloperModel.find(devquery).countDocuments()
          .then(devdata => {
              // if (!devdata)
              // res.status(404).send({ message: "Not found with id " });
              // else {
              //   res.status(200).send({manager:devdata});
              resBody.developer = devdata ? devdata : 0;
              let taskquery = devId ? {user_id:devId, } : {} // $group: 'status'
              if (devId) { //status
                  Task.aggregate([ {$match : { "developer": ObjectId(Id) }} ,{$group :{ "_id": "$status",  count: { $sum: 1 }, }}
                  ])//.countDocuments()
                      .then(taskData => {
                          // if (!taskData)
                          // res.status(404).send({ message: "Not found with id " });
                          // else {
                          resBody.task = taskData;
                          res.status(200).send(resBody);
                          
                          // }
                      })
                      .catch(err => {
                          console.log(err);
                          res
                          .status(500)
                          .send({ message: err  });
                      });
              }
  
              // }
          })
          .catch(err => {
              console.log(err);
              res
              .status(500)
              .send({ message: err  });
          });
      }
  })
  .catch(err => {
      console.log(err);
      res
      .status(500)
      .send({ message: err  });
  });
  
  };

