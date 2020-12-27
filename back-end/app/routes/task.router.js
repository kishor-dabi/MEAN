module.exports = app => {
    const task = require("../controllers/task.controller.js");
  
    var router = require("express").Router();
  
    // Create a new task
    router.post("/", task.create);
  
    // Retrieve all task
    router.get("/", task.findAll);

    // // Retrieve a single  with id
    router.get("/:id", task.findOne);
    router.get("/developer/:id", task.findAllbyDeveloperId);
  
    // // Update a  with id
    router.put("/:id", task.update);
  
    // // Delete a with id
    router.delete("/:id", task.delete);

  
    app.use("/api/task", router);
  };
  