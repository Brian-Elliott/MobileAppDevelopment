window.onload = function()
{
    //localStorage.clear();
    var daily = localStorage.getItem("dailyIntake");
    if(daily == null)
        {
            document.getElementById("totalCalories").innerHTML ="0 total calories eaten today.";
            document.getElementById("totalGramsFat").innerHTML ="0 total grams of fat eaten today.";
            document.getElementById("satFat").innerHTML ="0 total saturated grams of fat eaten today.";
            document.getElementById("calFat").innerHTML ="0 total calories from fat eaten today.";
        }
    else
        {
    var daily2 = JSON.parse(daily);
    document.getElementById("totalCalories").innerHTML = daily2[0] + " total calories eaten today.";
    document.getElementById("totalGramsFat").innerHTML = daily2[1] + " total grams of fat eaten today.";
    document.getElementById("satFat").innerHTML = daily2[2] + " total saturated grams of fat eaten today.";
    document.getElementById("calFat").innerHTML = daily2[3] + " total calories from fat eaten today.";
    
    var name = localStorage.getItem("names");
    var names = JSON.parse(name);
    for(i=0; i< names.length; i++)
        {
            document.getElementById("foodEaten").innerHTML += names[i] + "<br />";
            console.log(names[i]);
        }
        }
    var average = localStorage.getItem("Avg/lastNum");
    if(average == null)
        {
            document.getElementById("totalCalories2").innerHTML ="0 average calories eaten daily.";
            document.getElementById("totalGramsFat2").innerHTML ="0 average grams of fat eaten daily.";
            document.getElementById("satFat2").innerHTML ="0 average saturated grams of fat eaten daily.";
            document.getElementById("calFat2").innerHTML ="0 average calories from fat eaten daily.";
            document.getElementById("dayCount").innerHTML = "Day 0 of your new healthy lifestyle!";
        }
    else{
    var avg = JSON.parse(average);
    var avgCal2 = avg[0] / avg[4];
    var avgFat2 = avg[1] / avg[4];
    var avgSatFat2 = avg[2] / avg[4];
    var avgCalFat2 = avg[3] / avg[4];
    
    document.getElementById("totalCalories2").innerHTML = Math.round(avgCal2 * 100)/100 + " average calories eaten daily.";
    document.getElementById("totalGramsFat2").innerHTML = Math.round(avgFat2 * 100)/100 + " average grams of fat eaten daily.";
    document.getElementById("satFat2").innerHTML = Math.round(avgSatFat2 * 100)/100 + " average saturated grams of fat eaten daily.";
    document.getElementById("calFat2").innerHTML = Math.round(avgCalFat2 * 100)/100 + " average calories from fat eaten daily.";
        document.getElementById("dayCount").innerHTML = "Day " + avg[4] +  " of your new healthy lifestyle!";
        }
	/*document.addEventListener("deviceready", init, false);
	 alert("test test");
	init();*/
};
/*function init(){
    document.getElementById('searchBtn').addEventListener('click', findFood(), false);
    alert("test test");
} */

//var selectedFood;
var avgCal;
var avgFat;
var avgSatFat;
var avgCalFat;
var goal;

function findFood(){
        //alert("findFood method")
        var foodSearch = document.getElementById("food-search").value; 
    $.ajax({ 
      
		   type: "GET", 
		   url: "https://api.nutritionix.com/v1_1/search/"+ foodSearch + "?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=acabade6&appKey=d55d95f2d4bbcd9c01bc5713e6067503",
		   dataType: "json",
		   success: function(result)
			{ 	
                console.log("finishing findFood...");
                console.log(result);
				showFoods(result);
                }
		   });
}

function showFoods(result){
    //alert("showFoods method")
    var hits = result.hits;
    var output = "";
    //alert("hits length" + hits.length);
    
    for (i=0; i< hits.length; i++){
        var id = hits[i]._id;
        var attr = hits[i].fields;
		output+= "<span class='row' onclick=selectFood('" + id + "')><span class='headCell name'>"+ attr.item_name + "</span><span class='cell calories'>" + attr.nf_calories + " calories</span><span class='cell fat'>" + attr.nf_total_fat +" grams of fat</span><span class='cell brand'>" + attr.brand_name + "</span><span class='cell serving'>"  + attr.nf_serving_size_qty + " serving</span></span><br/>";
    } 
    document.getElementById("fat-shredder-content").innerHTML = output; 
}

function selectFood(id){
    //alert("adding food...");
     $.ajax({ 
      
		   type: "GET", 
		   url: "https://api.nutritionix.com/v1_1/item?id="+ id +"&appId=acabade6&appKey=d55d95f2d4bbcd9c01bc5713e6067503",
		   dataType: "json",
		   success: function(result)
			{ 	
                console.log("finishing addFood...");
                console.log(result);
				addFood(result, id);
                }
		   });
}

function addFood(result, id)
{
    var fields = [result.item_name, result.nf_calories, result.nf_total_fat, result.nf_saturated_fat, result.nf_calories_from_fat];
    var str = JSON.stringify(fields);
    localStorage.setItem(id, str);
    var str = localStorage.getItem(id);
    var food =JSON.parse(str);
    var output = "";
    output+= "<span class='row' id='" + id + "' onclick=removeFood('"+ id +"')><span class='headCell name'>"+ food[0] + "</span><span class='cell calories' id='test'>" + food[1] + " calories</span><span class='cell fat'>" + food[2] +" grams of fat</span><span class='cell brand'>" + food[3] + " saturated grams</span><span class='cell serving'>"  +food[4] + " calories from fat</span></span><br/>";
    alert(result.item_name + " added");
    document.getElementById("food-content").innerHTML += output;
}

function removeFood(id)
{
    var removed = document.getElementById(id);
    removed.parentNode.removeChild(removed);
    localStorage.removeItem(id);
    
}

var names = new Array();
var cal = 0;
var fat = 0;
var satFat = 0;
var calFat = 0;

function storeFood()
{
    var rows = document.getElementById("food-content").getElementsByClassName("row");
    for(i=0; i< rows.length; i++)
        {
            var id = rows[i].id;
            //console.log(rows[i].id);
            var str = localStorage.getItem(id);
            var item =JSON.parse(str);
            names.push(item[0]);
            cal += parseInt(item[1]);
            fat += parseInt(item[2]);
            satFat += parseInt(item[3]);
            calFat += parseInt(item[4]);
            //console.log(cal);
            //console.log(fat);
            //console.log(names[i]);
            localStorage.removeItem(id);
        }
    document.getElementById("totalCalories").innerHTML = cal + " total calories eaten today.";
    document.getElementById("totalGramsFat").innerHTML = fat + " total grams of fat eaten today.";
    document.getElementById("satFat").innerHTML = satFat + " total saturated grams of fat eaten today.";
    document.getElementById("calFat").innerHTML = calFat + " total calories from fat eaten today.";
    var names2 = JSON.stringify(names);
    localStorage.setItem("names", names2);
    var summ = [cal, fat, satFat, calFat];
    var sum = JSON.stringify(summ);
    localStorage.setItem("dailyIntake", sum);
    if(cal > (goal- 400) && cal < goal)
        alert("You are approaching your daily Goal, stay strong!");
    if(cal > goal)
        alert("you have exceeded your daily goal, watch out!");
    for(i=0; i< names.length; i++)
        {
            document.getElementById("foodEaten").innerHTML += names[i] + "<br />";
        }
    document.getElementById("food-content").innerHTML = "Entry Submitted";
}

function setCounter()
{
    var newCount;
    var countDet = localStorage.getItem("Avg/lastNum");
    if(countDet == null)
        {
        newCount = 1
        avgCal = 0;
        avgFat = 0;
        avgSatFat = 0;
        avgCalFat = 0;
        alert("Congratulations on making it through your first day of your new healthy Lifestyle! Keep it up!");
        }
    else{
    
    var count = JSON.parse(countDet);
    newCount = count[4] + 1;
    console.log("Day: " + newCount);
    avgCal = count[0];
    avgFat = count[1];
    avgSatFat = count[2];
    avgCalFat = count[3];
    }
    return newCount; 
}
function avgFood()
{
    counter = setCounter();
    //console.log(counter);
    //console.log(avgCal);
    //console.log(avgFat);
    //console.log(avgSatFat);
    //console.log(avgCalFat);
    avgCal += cal;
    avgFat += fat;
    avgSatFat += satFat;
    avgCalFat += calFat;
    var nums = [avgCal, avgFat, avgSatFat, avgCalFat, counter];
    var stats = JSON.stringify(nums);
    localStorage.setItem("Avg/lastNum", stats);
    var avgCal2 = avgCal / counter;
    var avgFat2 = avgFat / counter;
    var avgSatFat2 = avgSatFat / counter;
    var avgCalFat2 = avgCalFat / counter;
    //console.log(avgCal2);
    //console.log(avgFat2);
    //console.log(avgSatFat2);
    //console.log(avgCalFat2);
    document.getElementById("totalCalories2").innerHTML = Math.round(avgCal2 * 100)/100 + " average calories eaten daily.";
    document.getElementById("totalGramsFat2").innerHTML = Math.round(avgFat2 * 100)/100 + " average grams of fat eaten daily.";
    document.getElementById("satFat2").innerHTML = Math.round(avgSatFat2 * 100)/100 + " average saturated grams of fat eaten daily.";
    document.getElementById("calFat2").innerHTML = Math.round(avgCalFat2 * 100)/100 + " average calories from fat eaten daily.";
    document.getElementById("dayCount").innerHTML = "Day " + counter +  " of your new healthy lifestyle!";
    
    localStorage.removeItem("dailyIntake");
    localStorage.removeItem("names");
    cal = 0;
    fat = 0;
    satFat = 0;
    calFat = 0;
    names = new Array();
    document.getElementById("foodEaten").innerHTML = "Day " + counter + " entry submitted. Keep up the good work!";
    storeFood();
    
    
} 
function reminder()
{
    alert("I hope you included everything...");
}
function calorieGoal()
{
    goal = document.getElementById("calGoal").value;
    document.getElementById("goal").innerHTML = " GOAL: " + goal;
    
    
}
