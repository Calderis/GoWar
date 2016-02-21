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

/* CONNEXION - LOGIN - REGISTER - GUEST */
//Update data about personnal account
socket.on("reset",function(){
    document.location.href="index.html";
});
socket.on("account", function (data) {
    player.pseudo = data.pseudo;
    player.id = data.id;
    player.img = data.img;
    var d = new Date();
    d.setTime(d.getTime() + (30*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = 'Illiad='+data.id+'; ' + expires;
    document.cookie = 'Podeus='+data.pseudo+'; ' + expires;
});


/* MATCHING AND GAME */
//Check if the player can play or not
function play(x, y, player) {
    'use strict';
    var t = player.team,
        p = Goban.goban[x][y],
        current = 0;
    if (player.turn) {
        //first we check that the position is not surrounded by ennemy
        //check also if the case is free
        if (p.team !== undefined || ((p.north.team !== t && p.north.team !== undefined) && (p.est.team !== t && p.est.team !== undefined) && (p.south.team !== t && p.south.team !== undefined) && (p.west.team !== t && p.west.team !== undefined))) {
            return false;
        }
        //Second we check that the position does not belong to the blocked chain
        current = Goban.isBlocked;
        while (current !== 0) {
            if (current === p) {
                return false;
            }
            current = current.next;
        }
        if (add_unit(x, y, player.team, Goban)) {
            socket.emit("new_play", x, y, player.team);
            player.turn = false;
        }
    }
}
socket.on("inGamePlayers", function(data){
    if(data.playerA == player.pseudo){
        document.getElementById("adversary").innerHTML = data.playerB;
        document.getElementById("photo-chatopponent").style.backgroundImage = "url(src/img/"+data.imgB+")";
    }
    else{
        document.getElementById("adversary").innerHTML = data.playerA;
        document.getElementById("photo-chatopponent").style.backgroundImage = "url(src/img/"+data.imgA+")";
    }
    document.getElementById("playerA").innerHTML = data.playerA;
    document.getElementById("playericonA").style.backgroundImage = "url(src/img/"+data.imgA+")";
    document.getElementById("playerB").innerHTML = data.playerB;
    document.getElementById("playericonB").style.backgroundImage = "url(src/img/"+data.imgB+")";
});
//Create Game
socket.on ("startGame", function(data) {
    Goban = new Game(data.dim);// Creation of a Goban
    document.getElementById("plateau").className = "x" + data.dim;
    player.team = data.team;
    player.turn = data.turn;
    player.room = data.room;
});

//Receive a movement from ennemy's player
socket.on("play_new", function(x, y, t) {
    if(player.team !== t || player.team == 10) {
        if(player.team != 10){
            player.turn = true;
        }
        add_unit(x, y, t, Goban);
    }
});
//restore game through history
socket.on("play_history", function(x, y, t) {
    add_unit(x, y, t, Goban);
});
socket.on("plusScore", function(data){
    if(data.team == 1) document.getElementById("scoreA").innerHTML = data.score;
    else document.getElementById("scoreB").innerHTML = data.score;
});

/* END GAMES */
//A player passed - if both of player passed, it's end
function turn_passed() {
    if(player.team<3){
        if(Goban.lastPassed != player.pseudo){
            var ladate=new Date()
            var h=ladate.getHours();
            if (h<10) {h = "0" + h}
            var m=ladate.getMinutes();
            if (m<10) {m = "0" + m}
            var s=ladate.getSeconds();
            if (s<10) {s = "0" + s}
            var data = {
                pseudo : player.pseudo,
                msg : "/TURNPASSED",
                room : player.room,
                hour : h + ':' + m,
                img : player.img
            };
            socket.emit("newMsg", data);
        }
    } else {
        var chat = document.getElementById("chat");
        var msg = document.createElement("div");
        msg.className = "message";
        msg.innerHTML = '<div class="info-message"><div class="statut-message">Vous ne pouvez pas passer votre tour.</div></div>';
        chat.appendChild(msg);
    }
}
function forfeit(){
    if(player.team<3) socket.emit("leaveGame", true);
    else document.location.href="home.html";
}
function sendScore(data){
    socket.emit("endGame", data);
}
socket.on("gameIsEnd", function(){
    alert("Fin de la partie");
});
socket.on ("endScores", function(scoreA, scoreB, game) {
    console.log(game);
    if(player.team == 1 && scoreA < scoreB) animVictoire("Défaite");
    else if(player.team == 1 && scoreA > scoreB) animVictoire("Victoire");
    else if(player.team == 2 && scoreA < scoreB) animVictoire("Victoire");
    else if(player.team == 2 && scoreA > scoreB) animVictoire("Défaite");
    else if(scoreA === scoreB) alert("Egalité");
    socket.emit("exitGame", game);
    setTimeout(function(){document.location.href="home.html";},3000);
});

/****** CHAT ******/

function bla(){
    var ladate=new Date()
    var h=ladate.getHours();
    if (h<10) {h = "0" + h}
    var m=ladate.getMinutes();
    if (m<10) {m = "0" + m}
    var s=ladate.getSeconds();
    if (s<10) {s = "0" + s}
    
    var data = {
        pseudo : player.pseudo,
        msg : document.getElementById("entry").value,
        room : player.room,
        hour : h + ':' + m,
        img : player.img
    };
    document.getElementById("entry").value = "";
    if(player.team==10){
        var chat = document.getElementById("chat");
        var msg = document.createElement("div");
        msg.className = "message";
        msg.innerHTML = '<div class="info-message"><div class="statut-message">En tant que spectateur, vous n\'êtes pas autorisé à parler dans ce canal.</div></div>';
        chat.appendChild(msg);
    } else {
        socket.emit("newMsg", data);
    }
    
}
socket.on("writeMsg", function(data){
    var chat = document.getElementById("chat");
    var msg = document.createElement("div");
    msg.className = "message";
    if(data.msg=="/TURNPASSED"){
        msg.innerHTML = '<div class="info-message"><div class="statut-message">' + data.pseudo + ' a passé son tour</div></div>';
        Goban.lastPassed = data.pseudo;
        if (Goban.havePassed) {
            end_game();
        } else {
            Goban.havePassed = true;
        }
        if(player.turn) player.turn = false;
        else player.turn = true;
        startOver();
    }
    else msg.innerHTML = '<div class="photo-message" style="background-image:url(src/img/' + data.img + ')"></div><div class="info-message"><div class="name-message">' + data.pseudo + '</div><div class="time-message">' + data.hour + '</div><div class="statut-message">' + data.msg + '</div></div>';
    chat.appendChild(msg);
});



//Ready to launch
socket.emit("know", false);