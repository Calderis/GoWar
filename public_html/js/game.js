/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

function Pierre(x, y) {
    'use strict';
    this.team = undefined; // team of the rock
    this.next = 0; // Next rock in the chain
    this.prev = 0; // Previous rock in the chain
    this.first = 0; // First rock in the chain
    this.liberty = 4; // Number of liberty of the rock (North, South, Est, West)
    
    // stock neighbours
    this.north = 0;
    this.west = 0;
    this.south = 0;
    this.est = 0;
    
    this.li = document.createElement("li");
    document.getElementById("plateau").appendChild(this.li);
}

function Game(dim) {
    'use strict';
    
    var i = 0,
        j = 0;
    
    this.chaines = []; // Stock all first rock of all chain
    this.goban = []; // Stock all rock
    this.isBlocked = 0; //Stock the chain that just have been blocked
    this.havePassed = false; // If the player have passed once
    this.lastPassed = "";
    
    // Create Rocks
    for (i = 0; i < dim; i++) {
        this.goban.push([]);
        for  (j = 0; j < dim; j++) {
            this.goban[i][j] = new Pierre(i, j);
            this.goban[i][j].li.setAttribute('onclick', 'play(' + i + ',' + j + ',player)');
        }
    }
    
    // Register Neighbours
    i = 0;
    j = 0;
    for (i = 0; i < dim; i++) {
        for  (j = 0; j < dim; j++) {
            if (i - 1 >= 0) {this.goban[i][j].north = this.goban[i - 1][j]; } else { this.goban[i][j].liberty--; }
            if (j + 1 < dim) {this.goban[i][j].est = this.goban[i][j + 1]; } else { this.goban[i][j].liberty--; }
            if (i + 1 < dim) {this.goban[i][j].south = this.goban[i + 1][j]; } else { this.goban[i][j].liberty--; }
            if (j - 1 >= 0) {this.goban[i][j].west = this.goban[i][j - 1]; } else { this.goban[i][j].liberty--; }
        }
    }
    console.log("Game created : " + dim + "x" + dim);
    beginTimer(60000);
}
var Goban = 0;

//destroy the chain of rocks 
function supp_chain(game) {
    console.log("*** suppchain ***");
    'use strict';
    var current = game.isBlocked.next;
    game.isBlocked.first = 0;
    while (current !== 0) {
        console.log(current);
        current.first = 0;
        current.prev.next = 0;
        current.prev = 0;
        current = current.next;
    }
    game.isBlocked = 0;
    return game;
}

// Check if the sum of liberties of rocks is equal to 0
function check_chain(chain, game) {
    'use strict';
    
    var current = 0,
        first = 0,
        liberty = 0,
        i = 0,
        num = 1;
    
    //We check is there a blocking list
    if (game.isBlocked !== 0) {
        game = supp_chain(game);
    }
    
    // We make sure that the chain is listed into the game
    for (i = 0; i < game.chaines.length; i++) {
        if (game.chaines[i] === chain) {
            first = game.chaines[i];
            break;
        }
    }
    if (first === 0) {
        console.log("First element hasn't been detected !!");
        return false;
    }
    
    //we count how many liberties the chain have
    current = first;
        
    while (current !== 0) {
        liberty += current.liberty;
        current = current.next;
    }
    if (liberty === 1) {
        // Atari
        console.log("Atari !");
    } else if (liberty === 0) {
        game.isBlocked = game.chaines[i];
        game.chaines.splice(i, 1);
        current = first;
        while (current !== 0) {
            num++;
            if (current.team !== player.team) {
                player.score++;
            }
            current.team = undefined;
            current.liberty = 4;
            if (current.north.team !== undefined) {current.north.liberty++; }
            if (current.est.team !== undefined) {current.est.liberty++; }
            if (current.south.team !== undefined) {current.south.liberty++; }
            if (current.west.team !== undefined) {current.west.liberty++; }
            current.li.className = "prise";
            setTimeout(function(li){
                li.innerHTML = "";
            },500*num, current.li);
            current = current.next;
            socket.emit("scorePlus", {team : player.team, score : player.score, room : player.room});
        }
    }
    return game;
}

//End game, give score
function end_game() {
    'use strict';
    console.log('end game');
    
    var i = 0, //compteur
        j = 0, //compteur
        k = 0, //compteur
        a = 0, //nb of playerA neighbour
        b = 0, //nb of playerB neighbour
        s = 0, //score of player
        l = 0, //length of the chain
        g = Goban.goban, // shortcut
        z = [], //list of free zone chain
        current = 0; // pointeur
    
    function supp_it(it) {
        if (it !== 0) {
            for (k = 0; k < z.length; k++) {
                if (it === z[i]) {
                    z.splice(k, 1);
                    break;
                }
            }
        }
    }
    function is_with(i, j, it) {
        if (it.team === 0) {
            if (g[i][j].first !== it.first) {
                supp_it(g[i][j].first);
                current = it.first;
                while (current.next !== 0) {
                    current = current.next;
                }
                if (g[i][j].first === 0) {
                    current.next = g[i][j];
                } else {
                    g[i][j].first = current.next;
                }
                g[i][j].first = it.first;
            }
        }
    }
    for (i = 0; i < g.length; i++) {
        for (j = 0; j < g.length; j++) {
            if (g[i][j].team === undefined) {
                g[i][j].team = 0;
                if (g[i][j].north.team === 0 || g[i][j].est.team === 0 || g[i][j].south.team === 0 || g[i][j].west.team === 0) {
                    is_with(i, j, g[i][j].north);
                    is_with(i, j, g[i][j].est);
                    is_with(i, j, g[i][j].south);
                    is_with(i, j, g[i][j].west);
                } else {
                    g[i][j].first = g[i][j];
                    z.push(g[i][j]);
                }
            }
        }
    }
    //We read chain of empty cases and count how many neighbour did they have and from which team
    for (i = 0; i < z.length; i++) {
        current = z[i];
        l = 0;
        a = 0;
        b = 0;
        while (current !== 0) {
            //North
            if (current.north !== 0) {
                if (current.north.team === 1) {a++; }
                if (current.north.team === 2) {b++; }
            }
            //Est
            if (current.est !== 0) {
                if (current.est.team === 1) {a++; }
                if (current.est.team === 2) {b++; }
            }
            //South
            if (current.south !== 0) {
                if (current.south.team === 1) {a++; }
                if (current.south.team === 2) {b++; }
            }
            //West
            if (current.west !== 0) {
                if (current.west.team === 1) {a++; }
                if (current.west.team === 2) {b++; }
            }
            l++;
            current = current.next;
        }
        if (player.team === 1 && a > b) {
            s += l;
        }
        if (player.team === 2 && a < b) {
            s += l;
        }
    }
    clearTimeout(window.t);
    sendScore({
        team : player.team,
        score : s + player.score
    });
}



//Put a rock into the goban
function add_unit(x, y, t, game) {
    'use strict';
    
    game.goban[x][y].team = t;
    game.goban[x][y].li.innerHTML = "<div class='p" + t + " new'> <div class='onde'></div></div>";
    
    //second player hasn't passed, the game continu
    game.havePassed = false;
    
    //if there is a rock just near, there is 1 liberty less for the rock
    //if it's an ally, we add it to the chain
    //if it's an ennemy we check the number of liberty of the ennemy chain
    //If there is no neighbour we create a new chain
    if (game.goban[x][y].north.team !== undefined || game.goban[x][y].est.team !== undefined || game.goban[x][y].south.team !== undefined || game.goban[x][y].west.team !== undefined) {
        var current = 0,
            i = 0;
        //North
        if (game.goban[x][y].north.team !== undefined) {
            game.goban[x][y].liberty--;
            game.goban[x][y].north.liberty--;
            if (game.goban[x][y].north.team === t) { // it's an ally
                game.goban[x][y].prev = game.goban[x][y].north;
                if (game.goban[x][y].first !== game.goban[x][y].north.first) {
                    game.goban[x][y].first = game.goban[x][y].north.first;
                    current = game.goban[x][y].north.first;
                    while (current.next !== 0) {
                        current = current.next;
                    }
                    current.next = game.goban[x][y];
                }
            } else if (game.goban[x][y].north.team !== undefined && game.goban[x][y].north.team !== t) { //it' an ennemy
                game = check_chain(game.goban[x][y].north.first, game);
            }
        }
        //Est
        if (game.goban[x][y].est.team !== undefined) {
            game.goban[x][y].liberty--;
            game.goban[x][y].est.liberty--;
            if (game.goban[x][y].est.team === t) { // it's an ally
                game.goban[x][y].prev = game.goban[x][y].est;
                if (game.goban[x][y].first !== 0) { // is already in a chain
                    if (game.goban[x][y].first !== game.goban[x][y].est.first) {// if we are already in this chain
                        for (i = 0; i < game.chaines.length; i++) {
                            if (game.chaines[i] === game.goban[x][y].est.first) {
                                game.chaines.splice(i, 1);
                                break;
                            }
                        }
                        current = game.goban[x][y].first;
                        while (current.next !== 0) {
                            current = current.next;
                        }
                        current.next = game.goban[x][y].est.first;
                        current.first = game.goban[x][y].first;
                        while (current.next !== 0) {
                            current.next.first = game.goban[x][y].first;
                            current = current.next;
                        }
                    }
                } else { // is not in a chain
                    game.goban[x][y].first = game.goban[x][y].est.first;
                    current = game.goban[x][y].est.first;
                    while (current.next !== 0) {
                        current = current.next;
                    }
                    current.next = game.goban[x][y];
                }
            } else if (game.goban[x][y].est.team !== undefined && game.goban[x][y].est.team !== t) { //it' an ennemy
                game = check_chain(game.goban[x][y].est.first, game);
            }
        }
        //South
        if (game.goban[x][y].south.team !== undefined) {
            game.goban[x][y].liberty--;
            game.goban[x][y].south.liberty--;
            if (game.goban[x][y].south.team === t) { // it's an ally
                game.goban[x][y].prev = game.goban[x][y].south;
                if (game.goban[x][y].first !== 0) { // is already in a chain
                    if (game.goban[x][y].first !== game.goban[x][y].south.first) {/// if we are already in this chain
                        for (i = 0; i < game.chaines.length; i++) {
                            if (game.chaines[i] === game.goban[x][y].south.first) {
                                game.chaines.splice(i, 1);
                                break;
                            }
                        }
                        current = game.goban[x][y].first;
                        while (current.next !== 0) {
                            current = current.next;
                        }
                        current.next = game.goban[x][y].south.first;
                        current.first = game.goban[x][y].first;
                        while (current.next !== 0) {
                            current.next.first = game.goban[x][y].first;
                            current = current.next;
                        }
                    }
                } else { // is not in a chain
                    game.goban[x][y].first = game.goban[x][y].south.first;
                    current = game.goban[x][y].south.first;
                    while (current.next !== 0) {
                        current = current.next;
                    }
                    current.next = game.goban[x][y];
                }
            } else if (game.goban[x][y].south.team !== undefined && game.goban[x][y].south.team !== t) { //it' an ennemy
                game = check_chain(game.goban[x][y].south.first, game);
            }
        }
        //West
        if (game.goban[x][y].west.team !== undefined) {
            game.goban[x][y].liberty--;
            game.goban[x][y].west.liberty--;
            if (game.goban[x][y].west.team === t) { // it's an ally
                game.goban[x][y].prev = game.goban[x][y].west;
                if (game.goban[x][y].first !== 0) { // is already in a chain
                    if (game.goban[x][y].first !== game.goban[x][y].west.first) {// if we are not already in this chain
                        for (i = 0; i < game.chaines.length; i++) {
                            if (game.chaines[i] === game.goban[x][y].west.first) {
                                game.chaines.splice(i, 1);
                                break;
                            }
                        }
                        current = game.goban[x][y].first;
                        while (current.next !== 0) {
                            current = current.next;
                        }
                        current.next = game.goban[x][y].west.first;
                        current.first = game.goban[x][y].first;
                        while (current.next !== 0) {
                            current.next.first = game.goban[x][y].first;
                            current = current.next;
                        }
                    }
                } else { // is not in a chain
                    game.goban[x][y].first = game.goban[x][y].west.first;
                    current = game.goban[x][y].west.first;
                    while (current.next !== 0) {
                        current = current.next;
                    }
                    current.next = game.goban[x][y];
                }
            } else if (game.goban[x][y].west.team !== undefined && game.goban[x][y].west.team !== t) { //it' an ennemy
                game = check_chain(game.goban[x][y].west.first, game);
            }
        }
        // No ally around, creation of a new chain
        if (game.goban[x][y].first === 0) {
            game.goban[x][y].first = game.goban[x][y];
            game.chaines.push(game.goban[x][y]);
            Goban.lastPassed = "";
            startOver();
            return true;
        }
    } else { // no chain found, creation of a new chain
        game.goban[x][y].first = game.goban[x][y];
        game.chaines.push(game.goban[x][y]);
        Goban.lastPassed = "";
        startOver();
        return true;
    }
    Goban.lastPassed = "";
    startOver();
    return true;
}



/****** COUNTDOWN ****************************************************************************/
// Define our selectors
var $clock 		= $("#clock");
var $timer 		= $("#timer");
var $pause 		= $("#pause");


function startOver(){
    clearTimeout(window.t);

    beginTimer(60000); // 60 seconds
}

// Get the ball rolling...
function beginTimer(timer)
{
	// Get our start time
	var dteStart = new Date();
	dteStart = dteStart.getTime();
	
	// Call countdown clock function
	countDownClock(dteStart,timer);
	
	// Reset elements to their defaults
	$clock.show();
	$timer.show();
}

// Build our countdown clock
function countDownClock(dteStart,timer)
{
	// Time started, minus time now, subtracked from 60 seconds
	var d = new Date();
	window.intOffset = timer - (d.getTime() - dteStart);
	
	// Whole number to use as countdown time
	$timer.html(Math.ceil(window.intOffset / 1000));
	
	// Angle to use, defined by 1 millisecond
	window.intAngle = 0.1048335*0.001*window.intOffset;
					
	// Set up our canvas
	var canvas = document.getElementById("clock");
	
	if (canvas.getContext) // Does the browser support canvas?
	{
		var ctx = canvas.getContext("2d");
		
		// Clear canvas before re-drawing
		ctx.clearRect(0,0,60,60);
		
        // Centre circle
		ctx.beginPath();
		ctx.arc(30,30,28,0,6.283,false);
		ctx.fillStyle = "#090909";
		ctx.fill();
		ctx.closePath();
        
		// Grey background ring
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.arc(30,30,28,0,6.283,false);
		ctx.arc(30,30,21,6.283,((Math.PI*2)),true);
		ctx.fillStyle = "#2d2d2b";
		ctx.fill();
		ctx.closePath();
		
		// Clock face ring
		ctx.beginPath();
		ctx.globalAlpha = 1;
		ctx.arc(30,30,28.1,-1.57,(-1.57 + window.intAngle),false);
		ctx.arc(30,30,21,(-1.57 + window.intAngle),((Math.PI*2) -1.57),true);
		ctx.fillStyle = '#fec60f';
		ctx.fill();
		ctx.closePath();
		
	} else {
		// Put fallback for browsers that don't support canvas here...
	}
					
	if(window.intOffset <= 0){ // If time is up
		if(player.turn || player.team < 3) turn_passed();
    }
	else // Resersive ahoy!
		window.t = setTimeout("countDownClock(" + dteStart + "," + timer + ")",50);
}