const db = require("../models");
const moment = require("moment");
const User = db.user;
const DeveloperModel = db.developer;
const bcrypt = require('bcrypt');
var saltRounds = 10;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.email) {
    res.status(400).send({ message: "Email can not be empty!" });
    return;
  }

let body =  req.body;
body.date_of_birth =  body.date_of_birth ? new Date(body.date_of_birth) : new Date()

User.find({email: req.body.email})
.then(data => {

    if (data.length) {
        res.status(500).send({
            message: "User with this email already exist."
          });
    } else {
        
        bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
            if(err){
                res.status(500).send({
                    message:
                      err.message || "Some error occurred while save password."
                  });
            }else{
                body.password = hash;
                let userreq =  new User(body);
                userreq
                    .save(userreq)
                    .then(data => {
                    res.send(data);
                    })
                    .catch(err => {
                    res.status(500).send({
                        message:
                        err.message || "Some error occurred while creating the Tutorial."
                    });
                    });
            }
        });
        
        
    }

})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving."
  });
});

// userreq.date_of_birth = moment(req.body.date_of_birth)

};


exports.createDeveloper = (req, res) => {
    // Validate request
    if (!req.body.email) {
      res.status(400).send({ message: "Email can not be empty!" });
      return;
    }
    
    
let body =  req.body;
body.date_of_birth =  body.date_of_birth ? new Date(body.date_of_birth) : new Date()

DeveloperModel.find({email: req.body.email})
.then(data => {

    if (data.length) {
        res.status(500).send({
            message: "User with this email already exist."
          });
    } else {

    bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        if(err){
            res.status(500).send({
                message:
                err.message || "Some error occurred while save password."
            });
            return;
        }else{
            body.password = hash;
            
            let developer =  new DeveloperModel(body);

            developer
                .save(developer)
                .then(data => {
                res.send(data);
                })
                .catch(err => {
                res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the Tutorial."
                });
                });
        }
    });
  
  
}

})
.catch(err => {
  res.status(500).send({
    message:
      err.message || "Some error occurred while retrieving."
  });
});

  };

// Retrieve all user from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};

  User.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving."
      });
    });
};

// Retrieve all user from the database.
exports.findAllDev = (req, res) => {
    let id = req.params.id; 
    var condition = id ? { manager: id } : {};
  
    DeveloperModel.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      });
  };

// Retrieve all user from the database.
exports.findAllManager = (req, res) => {
    const title = req.query.title;
    var condition = {'user_type':{$ne :1}};
  
    User.find(condition)
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving."
        });
      });
  };

// Find a single Tutorial with an id
exports.findOneDev = (req, res) => {
  const id = req.params.id;

  DeveloperModel.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving with id=" + id });
    });
};


exports.updateDeveloper = (req, res) => {
    if (!req.body) {
      return res.status(400).send({
        message: "Data to update can not be empty!"
      });
    }
  
    const id = req.params.id;
    req.body.date_of_birth = new Date(req.body.date_of_birth)
  
    DeveloperModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
          });
        } else res.send({ message: "Tutorial was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating Tutorial with id=" + id
        });
      });
  };
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found!`
        });
      } else res.send({ message: "Tutorial was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + id
      });
    });
};

exports.deleteDev = (req, res) => {
  const id = req.params.id;

  DeveloperModel.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete  with id=${id}. Maybe user was not found!`
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Tutorials were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
