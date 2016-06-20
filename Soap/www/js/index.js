window.onload = function()
{
	document.addEventListener("deviceready", init, false);
	
	init();
};

function init()
{
	document.getElementById('btnJoke').addEventListener('click', getJoke, false);
	document.getElementById('btnQuery').addEventListener('click',getNewJoke,false);
	document.getElementById('btnZip').addEventListener('click',getWeather,false);
    document.getElementById('btnTrain').addEventListener('click',getTrain,false);
	
	//document.getElementById('zip').addEventListener('change',getWeather,false);
}

//-------------- Joke -------------------
function getJoke()
{
	$.ajax({ 
		   type:"GET", 
		   url:"http://api.icndb.com/jokes/random/",
		   dataType:"text",
		   success: function(result)
			{ 	console.log(result);
				showJoke(result);}
		   });
}

function showJoke(result)
{
	var json = jQuery.parseJSON(result);
	document.getElementById('resultJoke').innerHTML= json.value.joke;
	
}
//--------------------Chuck Norris Query-----------
function getNewJoke()
{
	var fName = document.getElementById('fName').value;
	var lName = document.getElementById('lName').value;
	$.ajax(
	{ url:"http://api.icndb.com/jokes/random/?firstName="+
	 	  fName +"&lastName="+lName,
	  dataType:"text",
	  success: function (result) { showJokeQuery(result)},
	  type: "GET"
	});
}
function showJokeQuery(result)
{
	var json = jQuery.parseJSON(result);
	document.getElementById('resultQuery').innerHTML = json.value.joke;
}
//------------------- Weather ------------------

function getWeather()
{
	var zip = document.getElementById('zip').value;
	
	$.ajax(
		{  type:"GET",
		 	url:"http://wsf.cdyne.com/WeatherWS/Weather.asmx/GetCityWeatherByZIP?Zip="+zip,
		 
		 	dataType:"xml",
		    success: function(xml){ 
				console.log(xml);
				showWeather(xml);}
		});
}
function showWeather(xml)
{
    alert(JSON.stringify(xml));
	var city = xml.getElementsByTagName('City')[0].firstChild.nodeValue;
	var temperature = xml.getElementsByTagName('Temperature')[0].firstChild.nodeValue;
	var description = xml.getElementsByTagName('Description')[0].firstChild.nodeValue;
	

	
	var output="";
	output += city + "<br />";
	output += "Temperature: " + temperature +"<br />";
	output += "Description: " + description + "<br />";
	document.getElementById("resultWeather").innerHTML = output;
}

function getTrain(){
         alert('gettrain');
    $.ajax({ 
      
		   type: "GET", 
		   url: "http://www3.septa.org/hackathon/Arrivals/90404/10",
		   dataType: "text",
		   success: function(result)
			{ 	
				showTrain(result);}
		   });
}
function showTrain(result){
   
    //var json = jQuery.parseJSON(result);
    var json = JSON.parse(result);
   
    var timestamp = Object.keys(json); //Gets the timestamp
	var arr = json[timestamp]; //key is timestamp/ value is array
	var northbound = arr[0].Northbound;
	var southbound = arr[1].Southbound;
    
	var output ="Northbound<br />";
	for (i=0; i< northbound.length; i++){
		output+= "<span class='row'><span class='headCell'>"+ northbound[i].train_id +": " +northbound[i].destination+ "</span><span class='cell'>" +northbound[i].depart_time +"</span><span class='cell'>" +northbound[i].service_type+"</span><span class='cell'>"  +northbound[i].status+ "</span></span><br/>";
    }
    
    output +="<hr> Southbound<br>";
    for (i=0; i< southbound.length; i++){
		output+= "<span class='row'><span class='headCell'>"+ southbound[i].train_id +": " +southbound[i].destination+ "</span><span class='cell'>" +southbound[i].depart_time +"</span><span class='cell'>" +southbound[i].service_type+"</span><span class='cell'>"  +southbound[i].status+ "</span></span><br/>";
    }
    document.getElementById("resultTrain").innerHTML = output;
}