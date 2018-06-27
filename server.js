const express= require("express");
const hbs = require('hbs');



const request=require('request');
//const yargs=require('yargs');
//const argv=yargs.argv;


const app= express();

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

app.get('/',(request,response)=>{

 
    response.render('index.hbs');


});

app.get('/weather',(req,resp)=>{

   var address= req.query.texto;

//keys!

const googleApi="AIzaSyBzvFI8XsflDcxb0cme4FTTdBI0U9adacc";
const darkskyApi="022f9088d02a045d2289954d60f6a501";


//var address=shoppingList_string;
//var address="Rua D. Sancho I, 4480-876, Vila do Conde";
//var address = argv.address;
var addressEncoded=encodeURIComponent(address);

var date= new Date().toString();

var urlGeo=`https://maps.googleapis.com/maps/api/geocode/json?address=${addressEncoded}&key=${googleApi}`;
request({url:urlGeo,
    json:true},
    (error,response,body)=>{

      //console.log(JSON.stringify(body,undefined,2));
      try{
        var lat = body.results[0].geometry.location.lat;
        var lng = body.results[0].geometry.location.lng;
        formatted_address = body.results[0].formatted_address;

        var urlTemp=`https://api.darksky.net/forecast/${darkskyApi}/${lat},${lng}?exclude=hourly,daily,flags&units=si`;
        request({url:urlTemp
            ,json:true},
            (error,response,body)=>{
                tempAtual=body.currently.temperature;
                tempAparente = body.currently.apparentTemperature;
                summary = body.currently.summary;
                icon = body.currently.icon;
                vento= body.currently.windSpeed;
                humidade = body.currently.humidity;
                precipitacao = body.currently.precipIntensity;

                resp.render('papagaio.hbs',{temperaturaMax: tempAtual, temperaturaMaxAp: tempAparente, data:date,morada:address, icon:icon, summary:summary, vento:vento, humidade:humidade, precipitacao:precipitacao});


    });
}
catch(error){

        resp.render('papagaio.hbs', {morada:"Destino Inválido."})

    }
    
    });

});


app.listen(4000);