/* LIBRAIRIES */
var express = require('express'), //librairie for make path easier
    app = express(),
    server = require('http').createServer(app),
    io = require('socket.io').listen(server),
    ent = require('ent'), // Disable HTML caracters (equal htmlentities in PHP)
    fs = require('fs');

/* SERVER CONFIG */
app.use(express.static(__dirname + '/public_html'));//all the client part here



function Account(pseudo, pwd, register){
    this.id = myServer.players.length;
    console.log("New account. N°" + this.id + " : " + pseudo);
    this.pseudo = pseudo || "Guest" + this.id;
    this.pwd = pwd || "ILoveGoWar";
    this.register = register | false;
    this.statut = "connected";
    this.img = "user_" + Math.round(Math.random() * (20 - 1) + 1) + ".jpg";
    this.games = [];
    this.games_played = 0;
    this.games_won = 0;
    this.games_lose = 0;
    this.room = -1;
    this.isIA = false;
    this.friends = [];
    myServer.players.push(this);
    myServer.listNames.push(this.pseudo);
}

function Room (dim) {
    myServer.room.last++;
    this.id = myServer.room.last;
    this.date = new Date();
    this.numSpec = 0;
    this.dim = dim;
    this.vsIA = false;
    this.playerA = {
        infos : 0,
        score : -1,
        team : 1,
        turn : true
    };
    this.playerB = {
        infos : 0,
        score : -1,
        team : 2,
        turn : false
    };
    this.historic = [];
    this.time = 0;
    console.log("New room created." + this.dim + "x" + this.dim);
}
    
var myServer = {
    id : 0,
    port : 4445,//hearing port
    players : [],
    listNames : [],
    ranking : [],
    room : {
        last : 0,
        opened  : [],
        playing : [],
        closed  : []
    },
    refreshRank : function(){
        this.ranking = JSON.parse(JSON.stringify(this.players));
        myServer.ranking.sort(tri);
        myServer.ranking.reverse();
        this.ranking.forEach(function(d) {
            delete d.pwd;
            delete d.games;
        });
    }
};
function tri(a,b)
{
    if (a.games_won < b.games_won) return -1;
    else if (a.games_won == b.games_won) return 0;
    else return 1;
}




/* ARTIFICIAL INTELLIGENCE */
var IA = new Account("IA", "TuTrouverasJamais", true);
IA.isIA = true;
IA.img = "ia.jpg";
IA.statut = "occuped";

function playCase(x,y){
    this.nb = 1;
    this.x = x;
    this.y = y;
}
var originx9 = new playCase();
var originx13 = new playCase();
var originx19 = new playCase();

function ajouterCase(x,y,dim, historic){
    if(dim==9){
        originx9 = addCase(originx9,x,y,historic);
    } else if(dim == 13){
        originx13 = addCase(originx13,x,y,historic);
    } else if(dim == 19){
        originx19 = addCase(originx19,x,y,historic);
    }
}
function addCase(origin,x,y,historic){
    var pos = x+"x"+y;
    var current = origin;
    for(var i = 0; i<historic.length-1; i++){
        if(historic[i].type==0){
            pos = historic[i].x+"x"+historic[i].y;
            current = current[pos];
        }
    }
    pos = x+"x"+y;
    if(typeof current[pos] != "undefined"){
        current[pos].nb++;
    }
    else current[pos] = new playCase(x,y);
    current = current[pos];
    return origin;
}

/* WHEN SOMEONE IS CONNECTING TO THE SERVER */
io.sockets.on('connection', function (socket) {
    var player = 0,
        room = 0,
        game = 0,
        vsIA = false;
    
    /* CHECK IS ACCOUNT EXIST */
    socket.on("checkCookies", function(infos){
        for (var i = 0; i < myServer.players.length; i++){
            if (infos.pseudo == myServer.players[i].pseudo && infos.id == myServer.players[i].id) {
                socket.emit("cookiesChecked", true);
               return true
            }
        }
        socket.emit("cookiesChecked", false);
        return false;
    });
    
    
    /* CONNEXION - LOGIN - REGISTER */
    //User connected
    socket.on("know", function(data){
        for (var i = 0; i < myServer.players.length; i++){
            if (data.pseudo == myServer.players[i].pseudo && data.id == myServer.players[i].id) {
                player = myServer.players[i];
                socket.join(player.pseudo);
                player.statut = "connected";
                socket.emit("account", player);
                if(player.room !== -1) {
                    var found = false;
                    for(var i = 0; i < myServer.room.playing.length; i++){
                        if (myServer.room.playing[i].id === player.room) {
                            found = true;
                            player.statut = "occuped";
                            //join room
                            game = myServer.room.playing[i];
                            socket.join(player.room);
                            io.to(player.room).emit("inGamePlayers", {playerA : game.playerA.infos.pseudo, playerB : game.playerB.infos.pseudo, imgA : game.playerA.infos.img, imgB : game.playerB.infos.img});
                            
                            if(game.playerA.infos.pseudo === player.pseudo) {
                                socket.emit("startGame", {team : 1, dim : game.dim, turn : game.playerA.turn, room : player.room});
                            } else if (game.playerB.infos.pseudo === player.pseudo) {
                                socket.emit("startGame", {team : 2, dim : game.dim, turn : game.playerB.turn, room : player.room});
                            } else{
                                game.numSpec++;
                                socket.emit("startGame", {team : 10, dim : game.dim, turn : false, room : data.room});
                            }
                            for(var j = 0; j<game.historic.length; j++) {
                                if(game.historic[j].type==0) socket.emit("play_history", game.historic[j].x, game.historic[j].y, game.historic[j].t);
                                else if(game.historic[j].type==1) socket.emit("writeMsg", game.historic[j].data);
                                else if(game.historic[j].type==-1) socket.emit("gameIsEnd", true);
                            }
                            break;
                        }
                    }
                    if(found === false) {
                        player.room = -1;
                    }
                }
                myServer.refreshRank();
                socket.broadcast.emit("listPlayers", myServer.ranking, player);
                return true;
            }
        }
        socket.broadcast.emit("PlayersList", myServer.listNames);
    });
    //Review a game
    socket.on("initiate_historic", function(id){
        for(var i = 0; i<myServer.room.closed.length; i++){
            if(myServer.room.closed[i].id == id) socket.emit("restitute", myServer.room.closed[i].dim);
        }
    });
    socket.on("reviewGame",function(id){
        for(var i = 0; i<myServer.room.closed.length; i++){
            if(myServer.room.closed[i].id == id){
                socket.emit("send_historic", myServer.room.closed[i].historic);
                break;
            }
        }
    });
    //User try to login
    socket.on("login", function(data) {
        for (var i = 0; i < myServer.players.length; i++){
            var pwd = data.pwd.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0)
            if (data.pseudo == myServer.players[i].pseudo && pwd == myServer.players[i].pwd) {
                player = myServer.players[i];
                socket.join(player.pseudo);
                player.statut = "connected";
                socket.emit("account", {
                    id : player.id,
                    pseudo : player.pseudo,
                    img : player.img,
                    register : player.register
                });
                break;
            }
        }
    });
    
    //User want to see the match
    socket.on("look",function(pseudo){
        var data = {
            pseudo : pseudo,
            room : -1
        }
        player.team = 10;
        console.log(player.pseudo + " is watching " + pseudo);
        for (var i = 0; i < myServer.players.length; i++){
            if (data.pseudo == myServer.players[i].pseudo) {
                data.room = myServer.players[i].room;
                player.room = data.room;
            }
        }
        if(data.room != -1){
            for(var i = 0; i < myServer.room.playing.length; i++){
                if (myServer.room.playing[i].id === data.room){
                    socket.join(data.room);
                    game = myServer.room.playing[i];
                    socket.emit("loadGame", true);
                    for(var j = 0; j<game.historic.length; j++){
                        if(game.historic[j].type==0) socket.emit("play_history", game.historic[j].x, game.historic[j].y, game.historic[j].t);
                        else if(game.historic[j].type==1) socket.emit("writeMsg", game.historic[j].data);
                    }
                }
            }
        }
    });
    
    //User connect with a guest account
    socket.on("GuestAccount", function(){
        //Give to player a new account as guest
        player = new Account();
        socket.join(player.pseudo);
        socket.emit("account", {
            id : player.id,
            pseudo : player.pseudo,
            img : player.img,
            register : player.register
        });
    });
    
    //User register
    socket.on("Register", function(data) {
        for (var i = 0; i < myServer.players.length; i++){
            if (data.pseudo == myServer.players[i].pseudo) {
                socket.emit("pseudoExist", false);
                return false;
            }
        }
        player = new Account(
            data.pseudo,
            data.pwd.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0),
            true
        );
        socket.join(player.pseudo);
        socket.emit("account", {
            id : player.id,
            pseudo : player.pseudo,
            img : player.img,
            register : player.register
        });
    });
    socket.on("whoIs", function(pseudo){
        for(var i = 0; i<myServer.players.length; i++){
            if(myServer.players[i].pseudo == pseudo){
                var him = JSON.parse(JSON.stringify(myServer.players[i]));
                delete him.pwd;
                socket.emit("thisIs", him);
                break;
            }
        }
    });
    
    /* BEGIN OR END THE GAME */
    //Join a game
    socket.on("join_room", function(dim){
        var found = false;
        for(var i = 0; i < myServer.room.opened.length; i++){
            if (myServer.room.opened[i].dim === dim) {
                //join room
                game = myServer.room.opened[i];
                socket.join(game.id);
                player.room = game.id;
                game.playerB.infos = player;
                
                io.to(game.playerA.infos.pseudo).emit("loadGame", true);
                io.to(game.playerB.infos.pseudo).emit("loadGame", true);
                
                //Place the game into playing game
                myServer.room.playing.push(game);
                myServer.room.opened.splice(i,1);
                found = true;
                break;
            }
        }
        if (found === false) {
            //create game
            game = new Room(dim);
            game.playerA.infos = player;
            myServer.room.opened.push(game);
            //join room
            player.room = myServer.room.opened[myServer.room.opened.length-1].id;
            socket.join(player.room);
        }
    });
    //Leave waiting file
    socket.on("leave_room", function(dim){
        console.log("Room " + dim + "x" + dim + "cancelled");
        socket.leave(player.room);
        player.room = -1;
        myServer.room.opened.pop();
    });
    //Score increasing
    socket.on("scorePlus", function(data){
        io.to(data.room).emit("plusScore", data);
    });
    
    //Add friend
    socket.on("addFriend", function (pseudo){
        var found = false;
        for(var i = 0; i<player.friends.length; i++){
            if(pseudo == player.friends[i]) found = true;
            break;
        }
        if(found != true) player.friends.push(pseudo);
    });
    
    // New message
    socket.on("newMsg", function(data){
        var msg = {
            type : 1,
            data : data
        };
        game.historic.push(msg);
        io.to(data.room).emit("writeMsg", data);
        
        if(game.vsIA){
            if(data.msg=="/TURNPASSED"){
                var msg = {
                    type : 1,
                    data : {
                        pseudo : IA.pseudo,
                        msg : "/TURNPASSED",
                        hour : 0,
                        img : IA.img
                    }
                };
                game.historic.push(msg);
                socket.emit("writeMsg", msg.data);
            }
        }
    });
    
    //Join IA
    socket.on("game_ia", function(dim){
        player.statut = "occuped";
        
        //create game
        game = new Room(dim);
        
        //join room
        player.room = game.id;
        game.vsIA = true;
        socket.join(player.room);
        game.playerA.infos = player;
        game.playerB.infos = IA;

        socket.emit("start_defis", player.room);
        //launch game for both player
        socket.emit("loadGame", true);
        
        console.log("defis accepted : " + player.pseudo + " VS IA");
        
        myServer.room.playing.push(game);//Place the game into playing game
        
        myServer.refreshRank();
        socket.broadcast.emit("listPlayers", myServer.ranking, player);
    });
    
    
    //Play
    socket.on("new_play", function(x, y, t) {
        if(game.vsIA){
            play_a_rock(x, y, t);
            setTimeout(function(){letIaPlay(game.historic, game.dim)},1500);
        } else play_a_rock(x, y, t);
    });
    function play_a_rock(x, y, t){
        var play = {
            type : 0,
            x : x,
            y : y,
            t : t
        };
        game.historic.push(play);
        ajouterCase(x,y,game.dim, game.historic);
        if(t === 1) {
            game.playerA.turn = false;
            game.playerB.turn = true;
        } else {
            game.playerA.turn = true;
            game.playerB.turn = false;
        }
        io.to(player.room).emit("play_new", x, y, t);
    }
    
    //IA
    function letIaPlay(historic, dim){
        console.log("Debut IA");
        var origin;
        if(dim==9){
            origin = originx9;
        } else if(dim == 13){
            origin = originx13;
        } else if(dim == 19){
            origin = originx19;
        }
        //Create plateau
        var plateau = [];
        for(var k = 0; k<dim; k++){
            plateau[k] = [];
            for(var l = 0; l<dim; l++){
                plateau[k][l] = 0;
            }
        }
        var current = origin;
        //on parcours l'arbre des historiques à travers l'historique de la partie
        for(var i = 0; i<historic.length; i++){
            if(historic[i].type == 0){
                var pos = historic[i].x+"x"+historic[i].y;
                if(typeof current[pos] != "undefined") plateau[historic[i].x][historic[i].y] = 1;
                else {
                    var pos_x = Math.floor(Math.random()*(dim-1));
                    var pos_y = Math.floor(Math.random()*(dim-1));

                    while(plateau[pos_x][pos_y] != 0){
                        pos_x = Math.floor(Math.random()*(dim-1));
                        pos_y = Math.floor(Math.random()*(dim-1));
                    }

                    play_a_rock(pos_x, pos_y, 2);
                    return true;
                }
                current = current[pos];
            }
        }
        var max = {
            nb : 0,
            x : -1
        };
        var pos;
        for(var m = 0; m<dim; m++){
            for(var n = 0; n<dim; n++){
                pos = m+"x"+n;
                if(typeof current[pos] != "undefined"){
                    if(current[pos].nb>max.nb) max = current[pos];
                }
            }
        }
        if(max.x != -1) play_a_rock(max.x, max.y, 2);
        else{
            var pos_x = Math.floor(Math.random()*(dim-1));
            var pos_y = Math.floor(Math.random()*(dim-1));

            var d = 0;
            while(plateau[pos_x][pos_y] != 0){
                d++;
                pos_x = Math.floor(Math.random()*(dim-1));
                pos_y = Math.floor(Math.random()*(dim-1));
                if(d>200){
                    console.log("IA passed");
                    var data = {
                        type : 1,
                        msg : {
                            pseudo : IA.pseudo,
                            msg : "/TURNPASSED",
                            hour : 0,
                            img : IA.img
                        }
                    };
                    game.historic.push(data);
                    socket.emit("writeMsg", data.msg);
                    return false;
                }
            }

            play_a_rock(pos_x, pos_y, 2);
        }
        console.log("Fin IA");
    }
    
    //End game
    socket.on("endGame", function(data) {
        if(data.team === 1){
            console.log(game.playerA.infos.pseudo+" send his score");
            game.playerA.score = data.score;
        }
        else if (data.team === 2){
            console.log(game.playerB.infos.pseudo+" send his score");
            game.playerB.score = data.score;
        }
        else return false;
        if(game.playerA.score != -1 && game.playerB.score != -1 || game.vsIA || game.playerA.infos.statut == "disconnected" || game.playerB.infos.statut == "disconnected") {
            game.playerA.infos.games_played++;
            game.playerB.infos.games_played++;
            
            if(game.playerA.score < game.playerB.score) {
                game.playerB.infos.games_won++;
                game.playerA.infos.games_lose++;
            }
            else if (game.playerA.score > game.playerB.score) {
                game.playerA.infos.games_won++;
                game.playerB.infos.games_lose++;
            }
            
            for(var i = 0; i < myServer.room.playing.length; i++){
                if (myServer.room.playing[i].id === player.room) {
                    var end = {
                        type : -1,
                        data : 0
                    };
                    console.log("Game ended | "+game.playerA.infos.pseudo+" : "+game.playerA.score+" - "+game.playerA.infos.pseudo+" : "+game.playerA.score);
                    game.historic.push(end);
                    
                    //close game
                    player.room = -1;
                    //Send scores
                    io.to(myServer.room.playing[i].id).emit("endScores", game.playerA.score, game.playerB.score, JSON.parse(JSON.stringify(game)));
                    socket.leave(myServer.room.playing[i].id);
                    
                    //Place the game into closed game
                    myServer.room.closed.push(myServer.room.playing[i]);
                    myServer.room.playing.splice(i,1);
                    break;
                }
            }
        }
        vsIA = false;
    });
    //clean exit
    socket.on("exitGame", function(game){
        player.statut = "connected";
        player.games.push(JSON.parse(JSON.stringify(game)));
        vsIA = false;
    });
    //Forfeit
    socket.on("leaveGame", function(){
        if(player.room != -1){
            for(var i = 0; i < myServer.room.playing.length; i++){
                if (myServer.room.playing[i].id === player.room) {
                    if(myServer.room.playing[i].playerA.infos.pseudo == player.pseudo){
                        myServer.room.playing[i].playerB.score = 100;
                        myServer.room.playing[i].playerA.score = 0;
                        game.playerB.infos.games_won++;
                        game.playerA.infos.games_lose++;
                        
                    } else {
                        myServer.room.playing[i].playerA.score = 100;
                        myServer.room.playing[i].playerB.score = 0;
                        game.playerA.infos.games_won++;
                        game.playerB.infos.games_lose++;
                    }
                    var end = {
                        type : -1,
                        data : 0
                    };
                    game.historic.push(end);
                    //close game
                    player.room = -1;
                    //Send scores
                    io.to(myServer.room.playing[i].id).emit("endScores", game.playerA.score, game.playerB.score, JSON.parse(JSON.stringify(game)));
                    socket.leave(myServer.room.playing[i].id);
                    
                    //Place the game into closed game
                    myServer.room.closed.push(myServer.room.playing[i]);
                    myServer.room.playing.splice(i,1);
                    break;
                }
            }
        }
    });
    
    
    /* WEBSITE FEATURES */
    socket.emit("PlayersList", myServer.listNames);
    socket.on("playersList", function(data){
        myServer.refreshRank();
        socket.emit("listPlayers", myServer.ranking, player);
    });
    socket.on("launch_defis", function(data, dim){
        if(player.pseudo != data) io.to(data).emit("defis_launch", player.pseudo, player.id, dim);
    });
    socket.on("defis_accepted", function(data, id, dim){
        player.statut = "occuped";
        
        //create game
        game = new Room(dim);
        var ennemy = myServer.players[id];
        //join room
        player.room = game.id;
        socket.join(player.room);
        game.playerA.infos = ennemy;
        game.playerB.infos = player;

        io.to(ennemy.pseudo).emit("start_defis", player.room);
        //launch game for both player
        io.to(game.playerA.infos.pseudo).emit("loadGame", true);
        io.to(game.playerB.infos.pseudo).emit("loadGame", true);
        
        console.log("defis accepted : " + ennemy.pseudo + " VS " + player.pseudo);
        
        myServer.room.playing.push(game);//Place the game into playing game
        
        myServer.refreshRank();
        socket.broadcast.emit("listPlayers", myServer.ranking, player);
    });
    socket.on("defis_robot", function(data, dim){
        var id = 0;
        player.statut = "occuped";
        vsIA = true;
        
        //create game
        game = new Room(dim);
        var ennemy = robot;
        //join room
        player.room = game.id;
        socket.join(player.room);
        game.playerA.infos = ennemy;
        game.playerB.infos = player;

        //launch game for player
        io.to(game.playerB.infos.pseudo).emit("loadGame", true);
        
        console.log("defis accepted : IA VS " + player.pseudo);
        
        myServer.room.playing.push(game);//Place the game into playing game
        
        myServer.refreshRank();
        socket.broadcast.emit("listPlayers", myServer.ranking, player);
    });
    socket.on("join_this", function(data){
        for(var i = 0; i<myServer.room.playing.length; i++) {
            if(data === myServer.room.playing[i].id) {
                player.statut = "occuped";
                player.room = data;
                game = myServer.room.playing[i];
                socket.join(player.room);
                break;
            }
        }
    });
    socket.on("defis_refused", function(data){
        io.to(data).emit("no_defis", 0);
    });
    
    
    //ON DISCONNECT
    socket.on('disconnect', function() {
        socket.leave("General");
        player.statut = "disconnected";
        myServer.refreshRank();
        socket.broadcast.emit("listPlayers", myServer.ranking, player);
    });
    
});

server.listen(myServer.port);
//console.log("Serveur ON (http://b623b8620a.url-de-test.ws:443)");
//console.log("Serveur ON (http://node.magnhetic.rhcloud.com:4445)");
console.log("Serveur ON (localhost:" + myServer.port + ")");

process.on('SIGINT', function() {
    console.log("All data have been ereased");
    process.exit(0);
});