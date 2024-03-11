const express =require("express");
const app =express();
const https = require("node:https");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/index.html");
});
app.post("/",function(req,res){

const query = req.body.cityName;
const id = "fbe0ecbd18437c0a5e4421cb5731b59f";
const unit ="metric";
const Url = "https://api.openweathermap.org/data/2.5/weather?q="+query +"&appid="+ id +"&units="+unit ;

https.get(Url , function(response){

    console.log(response.statusCode);


response.on("data",function(data){
    const weatherdata = JSON.parse(data);
   const temp = weatherdata.main.temp;
   const weatherdescription =weatherdata.weather[0].description;
   const Icon = weatherdata.weather[0].icon;
   const imageurl = "https://openweathermap.org/img/wn/"+ Icon +"@2x.png";

   res.write( "<h1> The temperature in "+ query+" is " + temp + "degree celcius </h1> " );
   res.write("<p> the wather is likely " + weatherdescription + "</p>" );
   res.write("<img src= "+imageurl+">");

   
});

});

})


app.listen(3000,function(req,res){
    console.log("server is live at locahost 3000");
});

