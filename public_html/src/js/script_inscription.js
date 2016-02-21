console.log('Hello There');

var dot1 = document.querySelector(".dot1"),
	dot2 = document.querySelector(".dot2"),
	dot_right1 = document.querySelector(".dot_right1"),
	dot_right2 = document.querySelector(".dot_right2"),
	dot_right3 = document.querySelector(".dot_right3"),
	dot_right4 = document.querySelector(".dot_right4"),
	inscription = document.querySelector(".inscription"),
	connexion = document.querySelector(".connexion"),
	notregistered = document.querySelector(".notregistered")
	alreadyregistered = document.querySelector(".alreadyregistered");

notregistered.addEventListener("click", function(){
	connexion.style.display = "none";
	inscription.style.display = "block";
	dot1.classList.add("dot_inactive");
	dot1.classList.remove("dot_active");
	dot2.classList.add("dot_active");
	dot2.classList.remove("dot_inactive");
});

dot2.addEventListener("click", function(){
	connexion.style.display = "none";
	inscription.style.display = "block";
	dot1.classList.add("dot_inactive");
	dot1.classList.remove("dot_active");
	dot2.classList.add("dot_active");
	dot2.classList.remove("dot_inactive");
});

dot1.addEventListener("click", function(){
	connexion.style.display = "block";
	inscription.style.display = "none";
	dot1.classList.add("dot_active");
	dot1.classList.remove("dot_inactive");
	dot2.classList.add("dot_inactive");
	dot2.classList.remove("dot_active");
});

alreadyregistered.addEventListener("click", function(){
	connexion.style.display = "block";
	inscription.style.display = "none";
	dot1.classList.add("dot_active");
	dot1.classList.remove("dot_inactive");
	dot2.classList.add("dot_inactive");
	dot2.classList.remove("dot_active");
});

dot_right1.addEventListener("click", function(){
	dot_right1.classList.add("dotright_active");
	dot_right1.classList.remove("dotright_inactive");
	dot_right2.classList.add("dotright_inactive");
	dot_right2.classList.remove("dotright_active");
	dot_right3.classList.add("dotright_inactive");
	dot_right3.classList.remove("dotright_active");
	dot_right4.classList.add("dotright_inactive");
	dot_right4.classList.remove("dotright_active");
});

dot_right2.addEventListener("click", function(){
	dot_right2.classList.add("dotright_active");
	dot_right2.classList.remove("dotright_inactive");
	dot_right1.classList.add("dotright_inactive");
	dot_right1.classList.remove("dotright_active");
	dot_right3.classList.add("dotright_inactive");
	dot_right3.classList.remove("dotright_active");
	dot_right4.classList.add("dotright_inactive");
	dot_right4.classList.remove("dotright_active");
});

dot_right3.addEventListener("click", function(){
	dot_right3.classList.add("dotright_active");
	dot_right3.classList.remove("dotright_inactive");
	dot_right1.classList.add("dotright_inactive");
	dot_right1.classList.remove("dotright_active");
	dot_right2.classList.add("dotright_inactive");
	dot_right2.classList.remove("dotright_active");
	dot_right4.classList.add("dotright_inactive");
	dot_right4.classList.remove("dotright_active");
});

dot_right4.addEventListener("click", function(){
	dot_right4.classList.add("dotright_active");
	dot_right4.classList.remove("dotright_inactive");
	dot_right1.classList.add("dotright_inactive");
	dot_right1.classList.remove("dotright_active");
	dot_right2.classList.add("dotright_inactive");
	dot_right2.classList.remove("dotright_active");
	dot_right3.classList.add("dotright_inactive");
	dot_right3.classList.remove("dotright_active");
});