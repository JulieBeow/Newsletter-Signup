const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", function(req, res){
res.sendFile(__dirname + "/signup.html")
});

app.post("/", function(req, res){
    const fname=req.body.firstName;
    const lname=req.body.lastName;
    const email = req.body.email;

    const data = {
        members:[
            {
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME : fname,
                LNAME : lname
            },
        }
    ]};

   const jsonData = JSON.stringify(data);
   const url = "https://us14.api.mailchimp.com/3.0/lists/6f6acea588";
   const options = {
        method : "POST",
        auth:"kimchi:ee3301ffe696a0ae3f2ca5e24d3860f8-us14"
    };
    const request = https. request(url, options, function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        } 
        else {res.sendFile(__dirname + "/failure.html")
    }
    
    response.on("data", function(data){
            console.log(JSON.parse(data));
        })
    })

request.write(jsonData);
request.end();
    });

app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(3000, function(){
    console.log("Server is running on port 3000.");
});

// var apiKey = "ee3301ffe696a0ae3f2ca5e24d3860f8-us14";
// var uniqueId= "6f6acea588";
// The root url for the API is https://us14.api.mailchimp.com/3.0/lists/6f6acea588