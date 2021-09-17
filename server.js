require('./models/db');

const express = require('express');

const path = require('path');

const exphbs = require('express-handlebars');

const bodyParser = require('body-parser');

// const expressHandlebars = require('express-handlebars');

const Handlebars = require('handlebars');

const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');

const employeeController = require('./controller/employeeController');

var app = express();

app.use(bodyParser.urlencoded({
    extended:true
}));

// Configure View Engine
app.set('views', path.join(__dirname, '/views/'));
app.engine(
  'hbs',
  exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/',

    // Issue in Access has been denied to resolve the property
    //"---" because it is not an "own property" of its parent.
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set('view engine', 'hbs')

app.use(bodyParser.json());

// app.set('views',path.join(__dirname,'/views/'))

// app.engine('hbs',expressHandlebars({
//     extname:'hbs',
//     defaultLayout:'mainLayout',
//     layoutsDir:__dirname + '/views/layouts/'
// }))

app.set('view engine','hbs');

app.get('/',(req,res) => {
    res.send("Hello world");
})

app.listen(5000,() => {
    console.log("Serve is listening Port 5000");
})

app.use('/employee',employeeController);