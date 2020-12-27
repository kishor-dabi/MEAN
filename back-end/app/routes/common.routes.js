module.exports = app => {
    const adminController = require("../controllers/admin.controller.js");
  
    var router = require("express").Router();
  
    
    router.get("/admin-dashboard", adminController.adminDashboardCount);
    router.get("/admin-dashboard/:id", adminController.adminDashboardCount);
    router.get("/dev-dashboard/:id", adminController.devDashboardCount);
  
    app.use("/api/", router);
  };
  