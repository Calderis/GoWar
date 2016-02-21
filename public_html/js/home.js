//Receive the list of player
var ranking = 0;
var allPlayers = 0;
socket.on("listPlayers", function(data, pplayer) {
    allPlayers = data;
    if(player.pseudo == pplayer.pseudo) player = pplayer;
    document.getElementById("players").innerHTML ="";
    document.getElementById("opponents").innerHTML ="";
    
    ranking = data;
    //Friend list
    document.getElementById("friendsconnected").innerHTML = '';
    document.getElementById("friendsdisconnected").innerHTML = '';
    
    var connecteds = 0;
    for (var i = 0; i<data.length; i++) {
        var div = document.createElement("div");
        var titre = "ème";
        var isFriend = false;
        if(i == 0) titre = "er";
        div.className="player";
        for(var j = 0; j<player.friends.length; j++){
            if(player.friends[j] == data[i].pseudo){
                isFriend = true;
                break;
            }
        }
        if(data[i].statut == "connected"){
            div.innerHTML = '<div class="player"><div class="photouser2 user' + data[i].statut + '" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username2" onclick="showProfile(\''+data[i].pseudo+'\')">' + data[i].pseudo + ' <span class="subinfo">' + (i + 1) + titre +'</span></div><div class="playedgames">' + data[i].games_played + ' <span class="subinfo">Parties jouées</span></div><div class="wongames">' + data[i].games_won + '<span class="subinfo">Parties gagnées</span></div><div class="lostgames">' + data[i].games_lose + ' <span class="subinfo">Parties perdues</span></div><div class="actionhover"><div class="plus_startgame">+</div><div class="startgame" onclick="defis(\'' + data[i].pseudo + '\')\">LANCER UNE PARTIE<span class="subinfo">Disponible pour jouer</span></div></div><div class="' + data[i].statut + 'dot"></div></div>';
            if(isFriend){
                document.getElementById("friendsconnected").innerHTML += '<div class="friend"><div class="photouser_friend userconnected" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username_friend" onclick="showProfile(\''+data[i].pseudo+'\')">'+data[i].pseudo+'<span class="subinfo_friend">Disponible pour jouer</span></div><div class="actionhover" onclick="defis(\'' + data[i].pseudo + '\')"><div class="plus_startgame_friend">+</div><div class="startgame_friend">LANCER UNE PARTIE</div></div><div class="connecteddot_friend"></div></div>';
            }
        } else if(data[i].statut == "occuped"){
            div.innerHTML = '<div class="player"><div class="photouser2 user' + data[i].statut + '" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username2" onclick="showProfile(\''+data[i].pseudo+'\')">' + data[i].pseudo + ' <span class="subinfo">' + (i + 1) + titre +'</span></div><div class="playedgames">' + data[i].games_played + ' <span class="subinfo">Parties jouées</span></div><div class="wongames">' + data[i].games_won + '<span class="subinfo">Parties gagnées</span></div><div class="lostgames">' + data[i].games_lose + ' <span class="subinfo">Parties perdues</span></div><div class="actionhover"><div class="eye_watchgame"></div><div class="seegame" onclick="look(\'' + data[i].pseudo + '\')">REGARDER LA PARTIE<span class="subinfo">Dans un jeu</span></div></div><div class="' + data[i].statut + 'dot"></div></div>';
            if(isFriend){
                document.getElementById("friendsconnected").innerHTML += '<div class="friend"><div class="photouser_friend useroccuped" style="background-image:(src/img/' + data[i].img + ')"></div><div class="username_friend" onclick="showProfile(\''+data[i].pseudo+'\')">'+data[i].pseudo+'<span class="subinfo_friend">Occupé - partie en cours</span></div><div class="actionhover" onclick="look(\'' + data[i].pseudo + '\')"><div class="eye_watchgame_friend"></div><div class="startgame_friend">VISIONNER LA PARTIE</div></div><div class="occupeddot_friend"></div></div>';
            }
        } else{
            div.innerHTML = '<div class="player"><div class="photouser2 user' + data[i].statut + '" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username2" onclick="showProfile(\''+data[i].pseudo+'\')">' + data[i].pseudo + ' <span class="subinfo">' + (i + 1) + titre +'</span></div><div class="playedgames">' + data[i].games_played + ' <span class="subinfo">Parties jouées</span></div><div class="wongames">' + data[i].games_won + '<span class="subinfo">Parties gagnées</span></div><div class="lostgames">' + data[i].games_lose + ' <span class="subinfo">Parties perdues</span></div><div class="actionhover"><div class="startgame"><span class="subinfo">Déconnecté</span></div></div><div class="' + data[i].statut + 'dot"></div></div>';
            if(isFriend){
                document.getElementById("friendsdisconnected").innerHTML += '<div class="friend"><div class="photouser_friend userdisconnected" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username_friend_disconnected" onclick="showProfile(\''+data[i].pseudo+'\')">'+data[i].pseudo+'</div><div class="actionhover"><div class="disconnected_friend">DÉCONNECTÉ</div></div><div class="disconnecteddot_friend"></div></div>';
            }
        }
        document.getElementById("players").appendChild(div);
        
        //get personnel data
        if(data[i].statut == "connected" && data[i].pseudo != player.pseudo) {
            connecteds++;
            div = document.createElement("div");
            div.className="player";
            if(isFriend){
                div.innerHTML = '<div class="opponent"><div class="photouser_opponent userconnected" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username_opponent" onclick="showProfile(\''+data[i].pseudo+'\')">' + data[i].pseudo + '<div class="menudots"><div class="divdots"><div class="gamefriend" onclick="defis(\'' + data[i].pseudo + '\')"><div class="startgame_plus">+</div>Lancer une partie</div><div class="addfriend"><div class="addfriend_plus"></div>Voir profile</div></div></div> <span class="subinfo_friend" onclick="defis(\'' + data[i].pseudo + '\')\">Disponible pour jouer</span></div></div>';
            } else {
                div.innerHTML = '<div class="opponent"><div class="photouser_opponent userconnected" style="background-image:url(src/img/' + data[i].img + ')"></div><div class="username_opponent" onclick="showProfile(\''+data[i].pseudo+'\')">' + data[i].pseudo + '<div class="menudots"><div class="divdots"><div class="gamefriend" onclick="defis(\'' + data[i].pseudo + '\')"><div class="startgame_plus">+</div>Lancer une partie</div><div class="addfriend" onclick="addFriend(\'' + data[i].pseudo + '\')"><div class="addfriend_plus"></div>Ajouter un ami</div></div></div> <span class="subinfo_friend" onclick="defis(\'' + data[i].pseudo + '\')\">Disponible pour jouer</span></div></div>';
            }
            document.getElementById("opponents").appendChild(div);
        }
    }
    document.getElementById("numberopponents").innerHTML = connecteds;
});

//Look a game
function look(pseudo){
    socket.emit("look",pseudo);
}

//Show list of all players with score and options
var listPlayers = document.getElementById("listPlayers");
function players_list() {
    socket.emit("playersList", 0);
}
players_list();
socket.on("PlayersList", function(data) {
    racine = new noeud("racine","",0);
    data.forEach(function(d) {
        ajouterMot(d);
    });
});

//Ask a player for a game
var adversaire = "";
var room = -1;
function defis(adv) {
    if(adv != player.pseudo){
        adversaire = adv;
        $('.popin').show();
        $('.chooseroom').show();
    }
}
function playIA(){
    $('.popin').show();
    $('.chooseroomB').show();
}
function defisSelect(dim){
    socket.emit("launch_defis", adversaire, dim);
    $('.pop_friend_poked').show();
}
function iaSelect(dim){
    socket.emit("game_ia", dim);
    document.location.href="game.html";
}
function leave_file(dim){
    socket.emit("leave_room", room);
}
//Answer of the challenge
var Defis = {
    p : "",
    id : "",
    dim : 9
}
function addFriend(pseudo){
    for(var i = 0; i<player.friends.length; i++){
        if(pseudo == player.friends[i]){
            return false;
        }
    }
    if(pseudo != player.pseudo){
        socket.emit("addFriend", pseudo);
        socket.emit("playersList", true);
    }
}
socket.on("defis_launch", function(p, id, dim){
    document.getElementById("adversary").innerHTML = p;
    document.getElementById("dim").innerHTML = dim + "x" + dim;
    Defis.id = id;
    Defis.p = p;
    Defis.dim = dim;
    $('.pop_accept_match_9x9').show();
});
function defis_yes(){
    socket.emit("defis_accepted", Defis.p, Defis.id, Defis.dim);
    console.log("no");
}
function defis_no(){
    socket.emit("defis_refused", Defis.p);
    $('.pop_accept_match_9x9').hide();
    $('.pop_accept_match_13x13').hide();
    $('.pop_accept_match_19x19').hide();
}

socket.on("start_defis", function(r){
    socket.emit("join_this", r);
});

socket.on("no_defis", function(){
    $('.pop_friend_poked').hide();
    $('.pop_friend_occuped').show();
});

/* MATCHING AND GAME ***************************************************************************/
function search_game (dim) {
    socket.emit("join_room", dim);
    room = dim;
}
socket.on("loadGame", function(){
    document.location.href="game.html";
});



/* SHOW PROFILE ********************************************************************************/
function showMe(){
    showProfile(player.pseudo);
}
function showProfile(pseudo){
    socket.emit("whoIs", pseudo);
    $('.opponents').fadeOut(200)
        $('.connectedopponents').fadeOut(200)
        $('.leftcontent').fadeOut(200)
        $('.accueil').fadeOut(200)
        $('.playIA').fadeOut(200)
        $('.findopponent').fadeOut(200)
        $('.arrowright').fadeOut(200)
        $('.arrowleft').fadeOut(200)
        $('.arrowback').delay( 200 ).fadeIn(200)
        $('.return_profile').delay( 200 ).fadeIn(200)
        $('.profileview').delay( 200 ).fadeIn(200)
        $('.info_profile_view').delay( 200 ).fadeIn(200)
}

socket.on("thisIs", function(him){
    var isFriend = false;
    document.getElementById("profileview").innerHTML = him.pseudo;
    document.getElementById("photouser2").style.backgroundImage = "url(src/img/"+him.img+")";
    for(var j = 0; j<player.friends.length; j++){
        if(player.friends[j] == him.pseudo){
            isFriend = true;
            break;
        }
    }
    if(isFriend == false) document.getElementById("add_as_friend").innerHTML = '<div onclick="addFriend(\''+him.pseudo+'\')"><div class="plus_addfriend">+</div> AJOUTER EN AMI</div>';
    
    document.getElementById("playedgames").innerHTML = him.games_played + ' <span class="subinfo">Parties jouées</span>';
    document.getElementById("wongames").innerHTML = him.games_won + ' <span class="subinfo">Parties gagnées</span>';
    document.getElementById("lostgames").innerHTML = him.games_lose + ' <span class="subinfo">Parties perdues</span>';

    if(him.statut == "connected"){
        document.getElementById("actionProfil").innerHTML = '<div class="plus_startgame">+</div><div class="startgame" onclick="defis(\'' + him.pseudo + '\')\">LANCER UNE PARTIE<span class="subinfo">Disponible pour jouer</span></div>';
    } else if(him.status == "occuped"){
        document.getElementById("actionProfil").innerHTML = '<div class="see_again"></div><div class="eye_seeagain">REGARDER LA PARTIE<span class="subinfo">En jeu</span></div>';
    } else {
        document.getElementById("actionProfil").innerHTML = '<div class="plus_startgame"></div><div class="startgame"><span class="subinfo">Déconnecté</span></div>';
    }

    document.getElementById("numFriends").innerHTML = him.friends.length + " AMIS";
    document.getElementById("lastgames").innerHTML = "";
     
    for(var i = 0; i<him.games.length; i++){
        console.log(i);
        console.log(him);
        console.log(him.games);
        console.log(him.games[i]);
        console.log(him.games[i].playerA);
        var frd = "";
        var ennemy = "";
        var good = "";
        //look who is playerA and who is playerB
        if(him.games[i].playerA.infos.pseudo == him.pseudo){
            good = him.games[i].playerA;
            ennemy = him.games[i].playerB;
        }
        else{
            good = him.games[i].playerB;
            ennemy = him.games[i].playerA;
        }
        //check if it's a friend or not
        for(var j = 0; j<player.friends.length; j++){
            if(ennemy.infos.pseudo == player.friends[j]) frd = " already_friend";
        }
        document.getElementById("lastgames").innerHTML += '<div class="last_game_info"><div class="versus">VS</div><div class="last_opponent'+frd+'">'+ennemy.infos.pseudo+'</div><div class="last_score">SCORE <span id="score"> '+good.score+' - '+ennemy.score+'</span></div><div class="spectate_number"><span id="number_big">'+him.games[i].numSpec+'</span> SPECTATEURS</div><div class="see_again" onclick="historic('+him.games[i].id+')"><div class="eye_seeagain"></div>REVOIR LA PARTIE</div></div>';
    }
    document.getElementById("all_friends").innerHTML = "";
    for(var i = 0; i<him.friends.length; i++){
        var frd = "";
        for(var j = 0; j<player.friends.length; j++){
            if(him.friends[i] == player.friends[j]) frd = " already_friend";
        }
        document.getElementById("all_friends").innerHTML += '<div class="one_friend"><div class="photo_one_friend'+frd+'"></div><div class="name_one_friend'+frd+'">'+him.friends[i]+'</div></div>';
    }
});



/* REVIEW A GAME THROUGH HISTORIC **************************************************************/
function LogOut(){
    var date = new Date();
    document.cookie = "Illiad=; expires=" + date.setTime(date.getTime()-1) + "; path=/";
    document.location.href="index.html";
}



/* REVIEW A GAME THROUGH HISTORIC **************************************************************/
function historic(id){
    document.location.href="historic.html?id="+id;
}


/* RESEARCH OF PLAYERS *************************************************************************/
var input = document.getElementById("searchbar");



function noeud(letter, pos, lvl){
    this.letter = letter;
    this.pseudo = "";
    this.sup = pos;
    this.a = false;
    this.b = false;
    this.c = false;
    this.d = false;
    this.e = false;
    this.f = false;
    this.g = false;
    this.h = false;
    this.i = false;
    this.j = false;
    this.k = false;
    this.l = false;
    this.m = false;
    this.n = false;
    this.o = false;
    this.p = false;
    this.q = false;
    this.r = false;
    this.s = false;
    this.t = false;
    this.u = false;
    this.v = false;
    this.w = false;
    this.x = false;
    this.y = false;
    this.z = false;
    this.space = false;
    this.line = false;
    this.numO = false;
    this.numI = false;
    this.numII = false;
    this.numIII = false;
    this.numIV = false;
    this.numV = false;
    this.numVI = false;
    this.numVII = false;
    this.numIIX = false;
    this.numIX = false;
}
var racine = new noeud("racine","",0);


function ajouterMot(pseudo){
    var pos = racine;
    for(var i = 0; i<pseudo.length; i++){
        var letter = pseudo.substring(i,i+1);
        if(letter == "-") letter = "line";
        else if(letter == " ") letter = "space";
        else if(letter == "0") letter = "numO";
        else if(letter == "1") letter = "numI";
        else if(letter == "2") letter = "numII";
        else if(letter == "3") letter = "numII";
        else if(letter == "4") letter = "numIV";
        else if(letter == "5") letter = "numV";
        else if(letter == "6") letter = "numVI";
        else if(letter == "7") letter = "numVII";
        else if(letter == "8") letter = "numIIX";
        else if(letter == "9") letter = "numIX";
        else {
            letter = letter.toLowerCase();
        }
        if(pos[letter] != false) pos = pos[letter];
        else{
            pos[letter] = new noeud(letter, pos, i+1);
            pos = pos[letter];
        }
        if(i == pseudo.length-1){
            pos.pseudo = pseudo;
        }
    }
    return true;
}
//Fonctions parcourant l'arbre à la recherche d'un mot, d'une définition
function chercherMot(pseudo) {return research(racine,pseudo,0);}
function research(a,pseudo,level){
    if(a == null || a == false) return false;
    if(level >= pseudo.length) return a.pseudo;
    var letter = pseudo.substring(level,level+1);
    if (a[letter] != null) return research(a[letter], pseudo, level+1);
    return false;
}

//Tree of pseudo of all players
function alphab(a,search) {
    for (var i = 0; i < search.length; i++) {
        letter = search.substring(i,i+1);
        if(letter == "-") letter = "line";
        else if(letter == " ") letter = "space";
        else if(letter == "0") letter = "numO";
        else if(letter == "1") letter = "numI";
        else if(letter == "2") letter = "numII";
        else if(letter == "3") letter = "numII";
        else if(letter == "4") letter = "numIV";
        else if(letter == "5") letter = "numV";
        else if(letter == "6") letter = "numVI";
        else if(letter == "7") letter = "numVII";
        else if(letter == "8") letter = "numIIX";
        else if(letter == "9") letter = "numIX";
        else {
            letter = letter.toLowerCase();
        }
        a = a[letter];
    }
    var listeMot = new Array();
    var s = new Array();
    s.push(a);
    var prev = "";
    var ban = new Array();
    function listBan(noeud){
        for(var j = 0; j<ban.length; j++){
            if(noeud==ban[j]) return false;
        }
        return true;
    }
    while (prev != a) {

        var noeud = s[s.length-1];
        if(noeud != undefined){
            if (noeud.pseudo != ""){
                listeMot.push(noeud.pseudo);
            }
            if (listeMot.length == 7) return listeMot;
            if (noeud.a != false && noeud.a != prev && listBan(noeud.a)) {s.push(noeud.a); prev = noeud.a;}
            else if (noeud.b != false && noeud.b != prev && listBan(noeud.b)) {s.push(noeud.b); prev = noeud.b;}
            else if (noeud.c != false && noeud.c != prev && listBan(noeud.c)) {s.push(noeud.c); prev = noeud.c;}
            else if (noeud.d != false && noeud.d != prev && listBan(noeud.d)) {s.push(noeud.d); prev = noeud.d;}
            else if (noeud.e != false && noeud.e != prev && listBan(noeud.e)) {s.push(noeud.e); prev = noeud.e;}
            else if (noeud.f != false && noeud.f != prev && listBan(noeud.f)) {s.push(noeud.f); prev = noeud.f;}
            else if (noeud.g != false && noeud.g != prev && listBan(noeud.g)) {s.push(noeud.g); prev = noeud.g;}
            else if (noeud.h != false && noeud.h != prev && listBan(noeud.h)) {s.push(noeud.h); prev = noeud.h;}
            else if (noeud.i != false && noeud.i != prev && listBan(noeud.i)) {s.push(noeud.i); prev = noeud.i;}
            else if (noeud.j != false && noeud.j != prev && listBan(noeud.j)) {s.push(noeud.j); prev = noeud.j;}
            else if (noeud.k != false && noeud.k != prev && listBan(noeud.k)) {s.push(noeud.k); prev = noeud.k;}
            else if (noeud.l != false && noeud.l != prev && listBan(noeud.l)) {s.push(noeud.l); prev = noeud.l;}
            else if (noeud.m != false && noeud.m != prev && listBan(noeud.m)) {s.push(noeud.m); prev = noeud.m;}
            else if (noeud.n != false && noeud.n != prev && listBan(noeud.n)) {s.push(noeud.n); prev = noeud.n;}
            else if (noeud.o != false && noeud.o != prev && listBan(noeud.o)) {s.push(noeud.o); prev = noeud.o;}
            else if (noeud.p != false && noeud.p != prev && listBan(noeud.p)) {s.push(noeud.p); prev = noeud.p;}
            else if (noeud.q != false && noeud.q != prev && listBan(noeud.q)) {s.push(noeud.q); prev = noeud.q;}
            else if (noeud.r != false && noeud.r != prev && listBan(noeud.r)) {s.push(noeud.r); prev = noeud.r;}
            else if (noeud.s != false && noeud.s != prev && listBan(noeud.s)) {s.push(noeud.s); prev = noeud.s;}
            else if (noeud.t != false && noeud.t != prev && listBan(noeud.t)) {s.push(noeud.t); prev = noeud.t;}
            else if (noeud.u != false && noeud.u != prev && listBan(noeud.u)) {s.push(noeud.u); prev = noeud.u;}
            else if (noeud.v != false && noeud.v != prev && listBan(noeud.v)) {s.push(noeud.v); prev = noeud.v;}
            else if (noeud.w != false && noeud.w != prev && listBan(noeud.w)) {s.push(noeud.w); prev = noeud.w;}
            else if (noeud.x != false && noeud.x != prev && listBan(noeud.x)) {s.push(noeud.x); prev = noeud.x;}
            else if (noeud.y != false && noeud.y != prev && listBan(noeud.y)) {s.push(noeud.y); prev = noeud.y;}
            else if (noeud.z != false && noeud.z != prev && listBan(noeud.z)) {s.push(noeud.z); prev = noeud.z;}
            else if (noeud.space != false && noeud.space != prev && listBan(noeud.space)) {s.push(noeud.space); prev = noeud.space;}
            else if (noeud.line != false && noeud.line != prev && listBan(noeud.line)) {s.push(noeud.line); prev = noeud.line;}
            else if (noeud.numO != false && noeud.numO != prev && listBan(noeud.numO)) {s.push(noeud.numO); prev = noeud.numO;}
            else if (noeud.numI != false && noeud.numI != prev && listBan(noeud.numI)) {s.push(noeud.numI); prev = noeud.numI;}
            else if (noeud.numII != false && noeud.numII != prev && listBan(noeud.numII)) {s.push(noeud.numII); prev = noeud.numII;}
            else if (noeud.numIII != false && noeud.numIII != prev && listBan(noeud.numIII)) {s.push(noeud.numIII); prev = noeud.numIII;}
            else if (noeud.numIV != false && noeud.numIV != prev && listBan(noeud.numIV)) {s.push(noeud.numIV); prev = noeud.numIV;}
            else if (noeud.numV != false && noeud.numV != prev && listBan(noeud.numV)) {s.push(noeud.numV); prev = noeud.numV;}
            else if (noeud.numVI != false && noeud.numVI != prev && listBan(noeud.numVI)) {s.push(noeud.numVI); prev = noeud.numVI;}
            else if (noeud.numVII != false && noeud.numVII != prev && listBan(noeud.numVII)) {s.push(noeud.numVII); prev = noeud.numVII;}
            else if (noeud.numIIX != false && noeud.numIIX != prev && listBan(noeud.numIIX)) {s.push(noeud.numIIX); prev = noeud.numIIX;}
            else if (noeud.numIX != false && noeud.numIX != prev && listBan(noeud.numIX)) {s.push(noeud.numIX); prev = noeud.numIX;}
            else {
                ban.push(noeud);
                prev = noeud;
                noeud = s.pop();
            }
        } else return listeMot;
    } return listeMot;
}



/* ALGORITHME D'AFFICHAGE */
var alphabetical = document.getElementById("search");

//Call alphab to obtain 7 players classed in alphabetical order
function lookFor(a,w,level){
    alphabetical.innerHTML = "";
    var letter = w.substring(level,level+1);
    if (a[letter] != null) return lookFor(a[letter], w, level+1);
    
    var alphaB = alphab(racine, w);
    var list = [];
    for (var i = 0; i<allPlayers.length; i++) {
        for (var k = 0; k<alphaB.length; k++) {
            if(allPlayers[i].pseudo == alphaB[k]){
                list.push(allPlayers[i]);
                break;
            }
        }
    }
    console.log(allPlayers);
    console.log(alphaB);
    console.log(list);
    if(alphaB != false){
        for(var i = 0; i<list.length;i++){
            if(list[i].pseudo != player.pseudo){
                //Ordre alphabétique
                var div = document.createElement("div");
                div.className = "opponent";
                div.href = "#";
                if(list[i].statut == "connected"){
                    div.innerHTML = '<div class="photouser_opponent user' + list[i].statut + '"></div><div class="username_opponent">'+ list[i].pseudo +'<div class="menudots"><div class="divdots"><div class="gamefriend"  onclick=\'defis(\'' + list[i].pseudo + '\')\')><div class="startgame_plus">+</div>Lancer une partie</div><div class="addfriend" onclick="addFriend(\'' + list[i].pseudo + '\')"><div class="addfriend_plus"></div>Ajouter un ami</div></div></div> <span class="subinfo_friend">Disponible pour jouer</span></div>';
                } else if(list[i].statut == "connected"){
                    div.innerHTML = '<div class="photouser_opponent user' + list[i].statut + '"></div><div class="username_opponent">'+ list[i].pseudo +'<div class="menudots"><div class="divdots"><div class="gamefriend"  onclick=\'look(\'' + list[i].pseudo + '\')\')><div class="startgame_plus">+</div>Regarder</div><div class="addfriend" onclick="addFriend(\'' + list[i].pseudo + '\')"><div class="addfriend_plus"></div>Ajouter un ami</div></div></div> <span class="subinfo_friend">En jeu</span></div>';
                } else {
                    div.innerHTML = '<div class="photouser_opponent user' + list[i].statut + '"></div><div class="username_opponent">'+ list[i].pseudo +'<div class="menudots"><div class="divdots"><div class="addfriend" onclick="addFriend(\'' + list[i].pseudo + '\')"><div class="addfriend_plus"></div>Ajouter un ami</div></div></div> <span class="subinfo_friend">Déconnecté</span></div>';
                }
                
                alphabetical.appendChild(div);
            }
        }
    }
}

document.documentElement.requestFullscreen();