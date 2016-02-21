function animVictoire(txt){
    
	// container is the DOM element;
	// userText is the textbox
	
    document.getElementById("blackScreen").className = "open";
    document.getElementById("container").innerHTML = txt;
	var container = $("#container");
	
	// Shuffle the contents of container
	container.shuffleLetters();
	
}
$( document ).ready(function() {
  $('.game-player').animate({ opacity: 1, "margin-left": "0px" }, 'slow');
});

$( document ).ready(function() {
  $('.timer').animate({ opacity: 1, "margin-left": "15px" }, 'slow');
});


$( document ).ready(function() {
  $('.game-opponent').animate({ opacity: 1, "margin-left": "0px" }, 'slow');
});

$( document ).ready(function() {
  $('.game-opponentnumber').animate({ opacity: 1, "margin-left": "65px" }, 'slow');
});

$( document ).ready(function() {
  $('.game-header').animate({ opacity: 1, "width": "500px" }, 'slow');
});