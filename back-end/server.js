const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
var jwt = require('jsonwebtoken');
var saltRounds = 10;
var MY_TOKEN_SECRET = 'MY_TOKEN_SECRET'

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");

const User = db.user;
const DeveloperModel = db.developer;
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
    // db.createCollection();
    var MongoClient = require('mongodb').MongoClient;
    db.mongoose.connect(db.url, function(err, db) {
      if (err) throw err;
      console.log("Database created!");
    });
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hi." });
});


app.use((req, res, next) => {
  // console.log(req.originalUrl, req.path,req.url, req.headers.authorization)
  if (req.path == '/api/user/' || req.path == '/api/user/login/') {
    
    next();  
  }else if (!req.headers.authorization) {
    return res.status(403).json({ message: 'Header missing!' });
  }else{

    // var decoded = jwt.verify(token, 'shhhhh');
    let token = req.headers.authorization
    token = token ? token.split(" ") : [];
token
    if (token[1]) {
      jwt.verify(token[1], MY_TOKEN_SECRET, function(err, decoded) {

        if (decoded) {
            if (decoded.data.user_type == 1 || decoded.data.user_type == 2) {
              User.find({email:decoded.data.email})
              .then(data => {
                  if (data.length == 0)
                  res.status(404).send({ message: "Not found with id " });
                  else {
                      if(data.length){
                        next();
                      }
                      }
                    })
                    .catch(err => {
                        console.log(err);
                        res
                        .status(500)
                        .send({ message: "Error retrieving with id=" + email });
                    });
            } else {
              DeveloperModel.find({email:decoded.data.email})
              .then(data => {
                  if (data.length == 0)
                  res.status(404).send({ message: "Not found with id " });
                  else {
                      if(data.length){
                        next();
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
        }else{
          // if (req.headers.host.match(/^www/) == null) {
            res.set({
              'Access-Control-Allow-Origin': '*',
'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
            })
            // res.redirect(302, "/");//'https://www.'
          // } 
          // return res.redirect(302, '/login');
          res.status(302).send({url:'/', status:302})
        }
      });
      
    }

    // next()
  }
})

app.get("/api/login", (req, res) => {
  

  
  res.json({ message: "Hi." });

});

// require("./app/routes/turorial.routes")(app);
let userroute = require("./app/routes/user.routes")(app);
let commonroute = require("./app/routes/common.routes")(app);
let taskroute = require("./app/routes/task.router")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
