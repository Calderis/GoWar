function showAnim(num, title){
    document.getElementById("animFeatures").className = "animFeatures open";
    setTimeout(function(){
        document.getElementById("titleAnim").className = "titleAnim open";
        document.getElementById("partA").className = "partA open";
        document.getElementById("partB").className = "partB open";
    },1000);
    
    document.getElementById("numAnim").innerHTML = num;
    document.getElementById("titleAnim").innerHTML = title;
    setTimeout(function(){
        document.getElementById("animFeatures").className = "animFeatures close";
        document.getElementById("titleAnim").className = "titleAnim close";
        document.getElementById("partA").className = "partA close";
        document.getElementById("partB").className = "partB close";
    },4000);
}

function checkEventObj ( _event_ ){
	// --- IE explorer
	if ( window.event )
		return window.event;
	// --- Netscape and other explorers
	else
		return _event_;
}

function applyKey (_event_){
    
	
	// --- Retrieve event object from current web explorer
	var winObj = checkEventObj(_event_);
	var intKeyCode = winObj.keyCode;
	var intCtrlKey = winObj.ctrlKey;
	var intAltKey = winObj.altKey;
		
	// 1Â° --- Access with [ALT/CTRL+Key]
if (intAltKey || intCtrlKey) {
        // --- Display Message
        switch(winObj.keyCode){
            case 49:
                showAnim(1, "PrÃ©sentation du Login");
                break;
            case 50:
                showAnim(2, "SystÃ¨me de DÃ©fis");
                break;
            case 51:
                showAnim(3, "Le match making");
                break;
            case 52:
                showAnim(4, "Chat in-game");
                break;
            case 53:
                showAnim(5, "ia Ã©volutive");
                break;
            case 54:
                showAnim(6, "Mode spectateur");
                break;
            case 55:
                showAnim(7, "SystÃ¨me de recherche");
                break;
            case 56:
                showAnim(8, "Liste d'amis");
                break;
            case 57:
                showAnim(9, "Revoir une partie");
                break;
        }
        numAnim++;

        // 3Â° --- Map the keyCode in another keyCode not used
        winObj.returnValue = false;
        return false;
		
	}
	
}