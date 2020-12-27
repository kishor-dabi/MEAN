const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.user = require("./user.model.js")(mongoose);
db.task = require("./task.model.js")(mongoose);
db.developer = require("./developer.model.js")(mongoose);

module.exports = db;
