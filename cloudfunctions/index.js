'use strict';

var https = require ('https');
const functions = require('firebase-functions');
const DialogFlowApp = require('actions-on-google').DialogFlowApp;
const jsonToTable = require('json-to-table');

console.log('processing...');

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  console.log('Inside Main function.....yessssssss');
  console.log('Request Headers: ' + JSON.stringify(request.headers));
  console.log('Request Body: ' + JSON.stringify(request.body));

  let action = request.body.queryResult.action;

  var chat = "New chat";

  console.log(action);
  response.setHeader('Content-Type','applicaiton/json');

  if (action!= 'input:location' && action!= 'input:stats'){
      console.log('Inside input function');
  	response.send(buildChatResponse("I'm sorry, I don't know this"));
  	return;
  }

const parameters = request.body.queryResult.parameters;

var zip_code = parameters['zip-code'];
var geo_city = parameters['geo-city'].toUpperCase();

if(zip_code!='' && action== 'input:location'){
 getHospitalNamesByZip(zip_code,response);
}

if(geo_city!='' && action== 'input:location'){
getHospitalNamesByCity(geo_city,response);
}

if(zip_code!='' && action== 'input:stats'){
 getHospitalStatisticsByZip(zip_code,response);
}

if(geo_city!='' && action== 'input:stats'){
 getHospitalStatisticsByCity(geo_city,response);
}

});

function getHospitalStatisticsByCity (geo_city,CloudFnResponse) {

    console.log("stats city code: " + geo_city);
	var pathString = "/pls/apex/hsemar/rest/listAndQualityOfMeasureByCity/"+geo_city;

	var request = https.get({
		host: "apex.oracle.com",
		path: pathString
	}, function (response) {
		var json = "";
		response.on('data', function(chunk) {
			console.log("received JSON response: " + chunk);
			json += chunk;
		});
        var chat = "Here is Statistics: "+"\n";
		response.on('end', function(){
			var jsonData = JSON.parse(json);
			console.log(jsonData);
			var items = jsonData.items;
			if(items.length>0){
                items.forEach(function(item) {
                var result = item.hospitalname+":"+item.measurename+":"+item.comparetonational;
                chat = chat +"\n"+result;
                });
            }
            else{
               chat = "No Hospital found";
            }
			console.log ("List received:" + items);

			CloudFnResponse.send(buildChatResponse(chat));
		});
    });
}

/////
function getHospitalStatisticsByZip (zip_code,CloudFnResponse) {

    console.log("stats zip code: 3" + zip_code);
	var pathString = "/pls/apex/hsemar/rest/listAndQualityOfMeasure/"+zip_code;

	var request = https.get({
		host: "apex.oracle.com",
		path: pathString
	}, function (response) {
		var json = "";
		response.on('data', function(chunk) {
			console.log("received JSON response: " + chunk);
			json += chunk;
		});
        var chat = "Here is Statistics: "+"\n";
		response.on('end', function(){
			var jsonData = JSON.parse(json);
			console.log(jsonData);
			var items = jsonData.items;
			if(items.length>0){
                items.forEach(function(item) {
                var result = item.hospitalname+":"+item.measurename+":"+item.comparetonational;
                chat = chat +"\n"+result;
                });
            }
            else{
               chat = "No Hospital found";
            }
			console.log ("List received:" + items);

			CloudFnResponse.send(buildChatResponse(chat));
		});
    });
}
//By City


//By Zip code
function getHospitalNamesByZip (zip_code,CloudFnResponse) {

	console.log("zip code: " + zip_code);
	var pathString = "/pls/apex/hsemar/rest/list/"+zip_code;

	var request = https.get({
		host: "apex.oracle.com",
		path: pathString
	}, function (response) {
		var json = "";
		response.on('data', function(chunk) {
			console.log("received JSON response: " + chunk);
			json += chunk;
		});
        var chat = "Here is Hospital names: \n";
		response.on('end', function(){
			var jsonData = JSON.parse(json);
			console.log(jsonData);
			var items = jsonData.items;
			if(items.length>0){
                items.forEach(function(item) {
                    var itemName = item.fname;
                    console.log("HName \n"+itemName);
                    chat = chat +"\n"+itemName;

                });
            }
            else{
               chat = "No Hospital found";
            }
			console.log ("List received:" + items);
			CloudFnResponse.send(buildChatResponse(chat));
		});
    });
}
//By City
function getHospitalNamesByCity (geo_city,CloudFnResponse) {
	console.log("City Name: " + geo_city);
	var pathString = "/pls/apex/hsemar/rest/listByCity/"+geo_city;

	var request = https.get({
		host: "apex.oracle.com",
		path: pathString
	}, function (response) {
		var json = "";
		response.on('data', function(chunk) {
			console.log("received JSON response: " + chunk);
			json += chunk;
		});
        var chat = "Here is Hospital names: \n";
		response.on('end', function(){
			var jsonData = JSON.parse(json);
			console.log(jsonData);
			var items = jsonData.items;
			var tabled = jsonToTable(items);
			if(items.length>0){
                items.forEach(function(item) {
                    var itemName = item.fname;
                    console.log("HName \n"+itemName);
                    chat = chat +"\n"+itemName;

                });
            }
            else{
               chat = "No Hospital found";
            }
            console.log ("List received:" + chat);
			CloudFnResponse.send(buildChatResponse(chat));
		});
    });
}


function buildChatResponse(chat) {
	return JSON.stringify({"fulfillmentText": chat});
}