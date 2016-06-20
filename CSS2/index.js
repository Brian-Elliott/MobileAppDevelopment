var myData4 = {
items:[
{id:"1 2 3", fName:"abe", lName:"lincoln", job:"president"},
{id:"2 0 0", fName:"brad ", lName:"barfield", job:"vice president"},
{id:"3 0 1", fName:"cody ", lName:"nash", job:"secretary"},
{id:"4 4 4", fName:"edgar", lName:"raven", job:"treasurer"},
{id:"5 1 0", fName:"franks", lName:"in burger", job:"swan"}
]
};

window.onload = function()
{
    clearTags();
}
function clearTags()
{
    var arr = document.getElementsByTagName("span");
    for(i=0; i<arr.length; i++){
        arr[i].classList.remove("block","hidden","vhidden");
    }
}
function showMyTable()
{
    clearTags();
    var table = document.getElementsByClassName("table");
    var rows = document.getElementsByClassName("row");
    var cells = document.getElementsByClassName("cell");
    
    for( i=0; cells.length; i++)
        cells[i].classList.add("border");
    
}
function showMyList(){
    clearTags();
    var rows = document.getElementsByClassName("row");
    for(r=0; r < rows.length; r++){
        rows[r].classList.add("block", "border");
        
        var cells = rows[r].getElementsByClassName("cell");
        
        for(i=0; i<cells.length; i++)
            cells[i].classList.add("block");
    }
        
}