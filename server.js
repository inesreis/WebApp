const express= require("express");
const hbs = require('hbs');

const app= express();



app.set('view engine', 'hbs');

app.get('/',(request,response)=>{

 
    response.render('index.hbs');


});

app.listen(4000);