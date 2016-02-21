/* CONNECTION TO socket.io */
//var socket = io.connect('http://b623b8620a.url-de-test.ws:443');//Online
//var socket = io.connect('http://bits-magnhetic.rhcloud.com:8000');//Online
//var socket = io.connect('http://89.93.58.41:4445');//Online
//var socket = io.connect('http://192.168.1.200:4445');//Online
var socket = io.connect('http://localhost:4445');//Offline

var url = window.location.search;

/* COOKIES */
function getCookie(cname) {
    var name = cname + "=",
        ca = document.cookie.split(';');
    for (var i = 0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
    }
    return "";
}

/* CONNEXION - LOGIN - REGISTER - GUEST */
//Update data about personnal account
socket.on("reset",function(){
    document.location.href="index.html";
});
socket.on("account", function (data) {
    player.pseudo = data.pseudo;
    player.id = data.id;
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = 'Illiad='+data.id+'; ' + expires;
    document.cookie = 'Podeus='+data.pseudo+'; ' + expires;
});


/* MATCHING AND GAME */
var id = JSON.parse(url.substring(url.lastIndexOf("=")+1));
socket.on("send_historic", function(historic){
    console.log(historic[0].x);
    for(var j = 0; j<historic.length; j++) {
        if(historic[j].type==0){
            setTimeout(function(index){console.log(index);add_unit(historic[index].x, historic[index].y, historic[index].t, Goban);},500*j, j);
        }
        else if(historic[j].type==1){
            setTimeout(function(index){speak(historic[index].data);},500*j, j);
        }
        else if(historic[j].type==-1){
            setTimeout(function(){
                alert("Fin de la partie");
            },500*j);
        }
            
    }
});
socket.emit("initiate_historic", id);
//Create Game
socket.on("restitute", function(dim){
    Goban = new Game(dim);// Creation of a Goban
    document.getElementById("plateau").className = "x" + dim;
    socket.emit("reviewGame", id);
});

socket.on("plusScore", function(data){
    if(data.team == 1) document.getElementById("scoreA").innerHTML = data.score;
    else document.getElementById("scoreB").innerHTML = data.score;
});

/* END GAMES */

/****** CHAT ******/
function speak(data){
    var chat = document.getElementById("chat");
    var msg = document.createElement("div");
    msg.className = "message";
    msg.innerHTML = '<div class="photo-message"></div><div class="info-message"><div class="name-message">' + data.pseudo + '</div><div class="time-message">' + data.hour + '</div><div class="statut-message">' + data.msg + '</div></div>';
    chat.appendChild(msg);
}
