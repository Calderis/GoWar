/* CONNECTION TO socket.io */
//var socket = io.connect('http://b623b8620a.url-de-test.ws:443');//Online
//var socket = io.connect('http://bits-magnhetic.rhcloud.com:8000');//Online
//var socket = io.connect('http://89.93.58.41:4445');//Online
//var socket = io.connect('http://192.168.1.200:4445');//Online
var socket = io.connect('http://localhost:4445');//Offline

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


/* Check if we're already connected */
function connected() {
    if(getCookie("Illiad") != "") document.location.href="home.html"
}
//connected();

/* CONNEXION - LOGIN - REGISTER - GUEST */
//Update data about personnal account
socket.on("account", function (data) {
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = 'Illiad='+data.id+'; ' + expires;
    document.cookie = 'Podeus='+data.pseudo+'; ' + expires;
    document.cookie = 'GisTerre='+data.register+'; ' + expires;
    document.cookie = 'Ciprute='+data.img+'; ' + expires;
    document.location.href="home.html";
});
//Send data that we stock on our browser to check if we were connected this last 30 days
function connect () {
    var data = {
        pseudo : getCookie("Podeus"),
        id : getCookie("Illiad")
    }
    socket.emit("know", data);
}
connect();

function login(){
    var pseudo = document.getElementById("co_pseudo").value,
        mdp = document.getElementById("co_mdp").value;
    var data = {
        pseudo : pseudo,
        pwd : mdp
    }
    socket.emit("login", data);
}
function playAsGuest(){
    socket.emit("GuestAccount", false);
}
function register() {
    var pseudo = document.getElementById("ins_pseudo").value,
        mdp = document.getElementById("ins_mdp").value,
        mdpB = document.getElementById("ins_mdpB").value;
    if(pseudo.length>10) alert("Votre pseudo doit être plus petit que 10 caractères");
    else {
        if(mdp == mdpB) {
            var data = {
                pseudo : pseudo,
                pwd : mdp
            }
            console.log("emit");
            socket.emit("Register", data);
        } else {
            alert("Mots de passe différents");
        }
    }
}

socket.on("pseudoExist", function(){
    alert("Pseudo Already exist");
});