    var myData =
	{
		items: 
		[
			{ name: "Names", place: "Places", thing: "Things"},
			{ name: "James", place: "Paris", thing: "Books"},
			{ name: "Laura", place: "Mexico", thing: "Chairs"},
			{ name: "Sam", place: "Italy", thing: "Paper"}
		]
	};

function populateTable(){
    var output ="";
    output="<ul class='table'>";
    for (var i=0; i< myData.items.length; i++)
    {
        output +="<li> <span class='cellName'>" + myData.items[i].name+"</span>";
        output += "<span class='cellPlace'>" +myData.items[i].place + "</span>";
        output += "<span class='cellThing'>" + myData.items[i].thing+"</span>";
        output += "</li>";
    }
    output +="</ul>"
    document.getElementById("table").innerHTML = output;
}


function populateList(){
    var output = "";
    output= "<ul id='list' class='list'>"
    for (var i=1; i< myData.items.length; i++)
    {
        output += "<li> <span class='listName'>Name: "+ myData.items[i].name+"</span><br />";
		output += "<span class='listPlace'>Place: "+ myData.items[i].place+"</span><br />";
		output += "<span class='listThing'>Thing: "+ myData.items[i].thing+"</span> </li>";
    }
    output += "</ul>"
    document.getElementById("view2").innerHTML = output;
}

function populateClickable(){
    var output = "";
    output= "<ul id='click' class='click'>"
    for (var j=1; j< myData.items.length; j++)
    {
        output+="<li><span class='clickName' onclick='clickable("+j+")'>"+ myData.items[j].name+"</span></li>" 
    }
    output += "</ul>"
    document.getElementById("view3").innerHTML = output;
    /* <ul id="click" class="click">	
		<li>
		<span class="clickName" onclick="clickable(1)"></span>
		</li>
        <li>
		<span class="clickName"  onclick="clickable(2)"></span>
		</li>
		<li><span class="clickName" onclick="clickable(3)"></span>
        </li>
	</ul> 
    var ul = document.getElementById("click");
    var items = ul.getElementsByTagName("li");
    for (var i = 0; i < items.length; ++i) {
        document.getElementsByClassName("clickName")[i].innerHTML = myData.items[i].name;
    }*/
}

function clickable(index){
    document.getElementById("result").innerHTML = myData.items[index].name + " - " + myData.items[index].place + " - " + myData.items[index].thing;
   
}
