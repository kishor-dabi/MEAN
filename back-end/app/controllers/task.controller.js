const db = require("../models");
const moment = require("moment");
const Task = db.task;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "title can not be empty!" });
    return;
  }

  if (!req.body.description) {
    res.status(400).send({ message: "description can not be empty!" });
    return;
  }

  if (!req.body.skill_set) {
    res.status(400).send({ message: "Skill can not be empty!" });
    return;
  }

  if (!req.body.user_id) {
    res.status(400).send({ message: "user can not be empty!" });
    return;
  }

let reqbody =  new Task(req.body);

  // Save Tutorial in the database
  reqbody
    .save(reqbody)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the task."
      });
    });
};

// Retrieve all user from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
  
    Task.find(condition).populate('user_id').populate('developer')
      .then(data => {
        res.send(data);
      })
      .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving task."
        });
      });
  };

  // Find a single Tutorial with an id
exports.findOne = (req, res) => {
    const id = req.params.id;
  
    Task.findById(id)
      .then(data => {
        if (!data)
          res.status(404).send({ message: "Not found task with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving task with id=" + id });
      });
  };
  
  
exports.findAllbyDeveloperId = (req, res) => {
    const id = req.params.id;
  
    Task.find({developer:id}).populate('user_id').populate('developer')
      .then(data => {
        if (data.length == 0)
          res.status(404).send({ message: "Not found task with id " + id });
        else res.send(data);
      })
      .catch(err => {
        res
          .status(500)
          .send({ message: "Error retrieving task with id=" + id });
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
  
    Task.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot update task with id=${id}. Maybe task was not found!`
          });
        } else res.send({ message: "Task was updated successfully." });
      })
      .catch(err => {
        res.status(500).send({
          message: "Error updating task with id=" + id
        });
      });
  };
  
  // Delete a Tutorial with the specified id in the request
  exports.delete = (req, res) => {
    const id = req.params.id;
  
    Task.findByIdAndRemove(id, { useFindAndModify: false })
      .then(data => {
        if (!data) {
          res.status(404).send({
            message: `Cannot delete task with id=${id}. Maybe task was not found!`
          });
        } else {
          res.send({
            message: "task was deleted successfully!"
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not delete task with id=" + id
        });
      });
  };