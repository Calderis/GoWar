/* CONNECTION TO socket.io */
//var socket = io.connect('http://b623b8620a.url-de-test.ws:443');//Online
//var socket = io.connect('http://bits-magnhetic.rhcloud.com:8000');//Online
//var socket = io.connect('http://89.93.58.41:4445');//Online
//var socket = io.connect('http://192.168.1.200:4445');//Online
var socket = io.connect('http://localhost:4445');//Offline


var infos = {
    pseudo : getCookie("Podeus"),
    id : getCookie("Illiad")
}
if(infos.id != undefined){
    socket.emit("checkCookies", infos);
}

socket.on("cookiesChecked", function(isReal){
    var date = new Date();
    if(isReal == false){
        document.cookie = "Illiad=; expires=" + date.setTime(date.getTime()-1) + "; path=/";
        document.location.href="index.html";
    }
});

//Send data that we stock on our browser to check if we were connected this last 30 days
var player = {
    id : 0,
    pseudo : "",
    turn : false, // If it is the turn of the player
    team : 0, // The team of the player
    score : 0, // Score of the player
    room : 0 // id of the room where we are playing
};
function connect () {
    var data = {
        pseudo : getCookie("Podeus"),
        id : getCookie("Illiad"),
        img : getCookie("Ciprute")
    }
    if(document.getElementById("systemConnection") != undefined){
        if(getCookie("GisTerre") == "1") document.getElementById("systemConnection").style.display = "none";
    }
    document.getElementById("user_pseudo").innerHTML = data.pseudo;
    document.getElementById("photouser").style.backgroundImage = "url(src/img/"+data.img+")";
    
    player.pseudo = data.pseudo;
    socket.emit("know", data);
}
connect();