const express= require("express");
const hbs = require('hbs');


const request=require('request');
//const yargs=require('yargs');
//const argv=yargs.argv;


const app= express();



app.set('view engine', 'hbs');

app.get('/',(request,response)=>{

 
    response.render('index.hbs');


});

app.get('/weather',(req,resp)=>{

   var address= req.query.texto;


//var address=shoppingList_string;
//var address="Rua D. Sancho I, 4480-876, Vila do Conde";
//var address = argv.address;
var addressEncoded=encodeURIComponent(address);



var urlGeo=`https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${googleApi}`;
request({url:urlGeo,
    json:true},
    (error,response,body)=>{
        var vila = {};

      //console.log(JSON.stringify(body,undefined,2));
 
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;
        vila.formatted_address = body.results[0].formatted_address;

        var urlTemp=`https://api.darksky.net/forecast/${darkskyApi}/${lat},${lng}?exclude=hourly,daily,flags&units=si`;
        request({url:urlTemp
            ,json:true},
            (error,response,body)=>{
                vila.tempAtual=body.currently.temperature;
                vila.tempAparente = body.currently.apparentTemperature;
                resp.render('papagaio.hbs',{texto: vila.tempAtual, corpo: vila.tempAparente});


        });
});


 


});

app.listen(4000);