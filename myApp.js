let express = require('express');
let app = express();
require('dotenv').config();
let bodyParser = require('body-parser');

// Logger middleware at the root level
app.use((req, res, next) => {
    let logString = `${req.method} ${req.path} - ${req.ip}`;
    console.log(logString);
    next(); // Important: move to the next middleware or route
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
  
//console.log("Hello World");

// app.get("/", (req, res) =>{
//     res.send('Hello Express');
//   });

  app.get("/", (req, res) =>{
    absolutePath= __dirname + '/views/index.html';
    return res.sendFile(absolutePath);
  });

  app.use('/public', express.static(__dirname+'/public/style.css'));


app.get("/json", (req, res) =>{
    msgKey = "Hello json";
    if (process.env.MESSAGE_STYLE === 'uppercase') msg = {"message":msgKey.toUpperCase()};
    else msg = {"message":msgKey.charAt(0).toUpperCase()+
        msgKey.toLowerCase().slice(1)};
    return res.json(msg);
  });


  app.get(
    "/now",
    (req, res, next) => {
      // adding a new property to req object
      // in the middleware function
      req.time = new Date().toString();
      next();
    },
    (req, res) => {
      // accessing the newly added property
      // in the main function
      res.send({
        time : req.time
      });
    }
  );


  app.get("/:word/echo", (req, res) => {
    const { word } = req.params;
    res.json({
      echo: word
    });
  });

  app.get("/name", (req, res) => {
    var name = req.query.first+ ' '+req.query.last;
    //var name = firstName.toString()+' '+lastName.toString()
    res.json({
      name
    });
  });

    app.post("/name", (req, res) => {
    var string = req.body.first+ ' '+req.body.last;
    //var name = firstName.toString()+' '+lastName.toString()
    res.json({
      name : string
    });
  });



















 module.exports = app;