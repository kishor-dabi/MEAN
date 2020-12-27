module.exports = app => {
    const user = require("../controllers/user.controller.js");
    const login = require("../controllers/login.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Tutorial
    router.post("/", user.create);
    
    // Retrieve all user
    router.get("/", user.findAll);
    
    router.get("/manager", user.findAllManager);
    
    
    router.post("/developer", user.createDeveloper);
    router.get("/alldeveloper/:id", user.findAllDev);
    router.get("/developer", user.findAllDev);
    router.put("/developer/:id", user.updateDeveloper);
    router.get("/developer/:id", user.findOneDev);
    router.delete("/developer/:id", user.deleteDev);

    
  
    // // Retrieve all published user
    // router.get("/published", user.findAllPublished);
  
    // // Retrieve a single Tutorial with id
    // router.get("/:id", user.findOne);
  
    // // Update a Tutorial with id
    // router.put("/:id", user.update);
  
    // // Delete a Tutorial with id
    // router.delete("/:id", user.delete);
  
    // // Create a new Tutorial
    // router.delete("/", user.deleteAll);

    router.post("/login", login.login);

  
    app.use("/api/user", router);
  };
  