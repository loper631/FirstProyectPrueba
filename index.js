
const express = require('express');
const morgan = require('morgan');
const ejs = require("ejs");
const app = express();

//settings
app.set('Looper APP','Super server op');
app.set('views',__dirname + '/views');
app.set('view engine','ejs');

app.use(morgan("common"));

app.get('/', (req,res) => {
    res.render("index.ejs");
});

app.get("/login",(req,res) => {
    res.render("login.ejs");
});

app.get("*", (req, res) => {
  res.end("No se encuentra la ruta  ");
});


app.listen(80,() =>{
    console.log('Server On');
});

