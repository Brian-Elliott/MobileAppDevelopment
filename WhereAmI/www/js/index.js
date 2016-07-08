window.onload = function()
{
    document.addEventListener('deviceready', init, false);
    init();
};
function init()
{
    
}
function getLocation()
{
    var options = { 
        maximumAge: 3000,
        timeout: 5000,
        enableHighAccuracy: true
    };
    navigator.geolocation.getCurrentPosition(success, failure, options);
}
function success(position)
{
    var latitude = position.coords.latitude;
    var accuracy = position.coords.accuracy;
    var altitude = position.coords.altitude;
    var longitude = position.coords.longitude;
    
    var timestamp = position.timestamp;
    
    var output= "accuracy: " + accuracy + "<br/>";
    output += "altitude: " + altitude + "<br/>";
    output += "latitude: " + latitude + "<br/>";
    output += "longitude: " + longitude + "<br/>";
    output += "timestamp: " + timestamp + "<br/>";
    
    document.getElementById("result").innerHTML = output;
    
    var mapOptions = {
        center: { lat:latitude, lng: longitude},
        zoom: 18
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    var marker = new google.maps.Marker({position: {lat: latitude, lng: longitude}, map: map});
}
function clearScreen()
{
    document.getElementById('map-canvas').innerHTML="";
    document.getElementById('map-canvas').style.backgroundColor="white";
    document.getElementById('result').innerHTML="";
}
function failure(msg)
{
    alert("failure: " + msg.message);
}