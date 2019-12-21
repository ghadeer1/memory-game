/* 
 * Create a list that holds all of your cards
 */
  const cards = document.querySelectorAll(".card");
  let listcard=[];
  let oCards=[];
  let numMoves=0;
  let numstar =3;
  let second=0;
  let munite=0;
  let timerHandler;

  function initializatonGame(){
  cards.forEach(card => {
  	card.addEventListener("click",cardClicke)
  	let child = card.children[0];
  	listcard.push(child.className);
  });
    document.querySelector("#b-again").addEventListener("click",startGame);
    document.querySelector("#b-close").addEventListener("click", dialogClose);
    document.querySelector(".restart").addEventListener("click", startGame );
  }
  function flipAllCard(){

  	cards.forEach(card=>{
  	card.classList.remove("open");
  	card.classList.remove("match");
  	card.classList.remove("show");

  	 
     
     
  });

  }

    

    initializatonGame();
    startGame();




    function startGame(){

    	dialogClose();

    	second=0;
    	munite=0;

    	numMoves=0;
    	numstar=3;
    	score();
    	changeCarde();
    	flipAllCard();
    	
    	startTime();
    }

   
    function dialogClose(){
    	document.querySelector("#dialog-box").close();
    }
    function startTime (){
    	if(!timerHandler){
    		timerHandler = setInterval(function(){
    		second=second+1;
    		if(second>59){
    			second=0;
    			munite=munite+1;
    		}
    		document.querySelector(".time").innerText = `${munite}:${second}`;
    	},1000);
    	}
    	

    }
    function closeTime(){
    	clearInterval(timerHandler);
    	timerHandler=null;

    }
    


    function changeCarde() {
    	listcard = shuffle(listcard);

    let x=0;
    cards.forEach(card =>{
    	let child = card.children[0];

    	child.className = listcard[x];
    	x++;
    });
    }

    function cardClicke() {
    	if (oCards.length<2){
    		this.classList.toggle("show");
            this.classList.toggle("open");
            oCards.push(this);
            if (oCards.length == 2){
            	setTimeout(sameCard,1000);
            	//sameCard();
            }
    	}

    	
    }

    function sameCard(){
	if (oCards.length == 2){
        	let fCard = oCards[0];
        	let sCard = oCards[1];

        	let fChild = fCard.children[0].className;
        	let sChild = sCard.children[0].className;

        	if(fChild==sChild){
        		fCard.classList.add("match");
        		sCard.classList.add("match");
        		}
        	else {
        		fCard.className = "card";
        		sCard.className= "card";

        	}
        	oCards=[];
        	moveStar();
        	
        }

        const remainingCards = document.querySelectorAll(".card:not(.match)");
        if(remainingCards.length==0){

        	showBox();
        	
        	
        }

        function showBox() {
        	let dialog = document.querySelector("#dialog-box");
        	document.querySelector("#span-moves").innerText = numMoves;
        	document.querySelector("#id-star").innerText= numstar;
        	document.querySelector("#id-time").innerText = `${munite}:${second}`;
        	
        	dialog.showModal();

        	closeTime();
        }
    }
    function moveStar(){
    	numMoves = numMoves+1;
        if(numMoves<10){
          numstar=3;
        }
        else if (numMoves<25){
        	numstar=2;
        }
        else {
        	numstar  = 1;
        }
    	score();
    }
    function score(){
    	const elementMove = document.querySelector(".moves");
    	elementMove.innerText = numMoves;
    const elmStare = document.querySelector(".stars");
    elmStare.innerHTML ="";
    for(let y=0; y<numstar;y++) {
    	let star ="<li> <y class='fa fa-star'></y></li>";
    	elmStare.innerHTML = elmStare.innerHTML + star;
    }
    }   
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
