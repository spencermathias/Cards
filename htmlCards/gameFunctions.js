
//Modal Stuff
// Get the modal
var makeDeckModal = document.getElementById("makeDeckMdl");

// Get the button that opens the modal
var deckMenuButton = document.getElementById("makeDeckBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
deckMenuButton.onclick = function() {
  makeDeckModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  makeDeckModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == makeDeckModal) {
    makeDeckModal.style.display = "none";
  }
}

//Socket Stuff
socket.on('connect', () => {
    //socket.emit('gameCommands',{command:'addPlayer'});
	console.log("Connection successful!")
});

socket.on('showBoard',function(data){
	$('#title').css('color', data.titleColor);
	$('#content').css('display', data.displayTitle);
	$('#gameBoard').css('display', data.displayGame);
});

//event stuff
document.getElementById('gameBoard').addEventListener('click', checkClick);

var tableItems=[]

function makeFirstDeck(){
	firstDeck= new Deck({suit:['h','d','s','c'], number:['A',2,3,4,5,6,7,8,9,10,'J','Q','K']})
	firstDeck.cardSettings={
		width:30,
		funct2changeCard:(props)=>{
			let colors={
				h:"#ff0000",
				s:"#ff0000",
				d:"#000000",
				c:"#000000"
				}
			let newprops={
				textColor:colors[props.suit],
				text:props.suit+'\n'+props.number
				}
			return newprops
		},
		click:()=>{console.log('overloaded')}
	}
	firstPile= new Pile([])
	firstPile.addDeck(firstDeck)
	firstPile.shuffle(5)
	//firstPile.placePile(ctx,{x:575,y:100,scale:10,pileWidth:1100},{showAll:false,hideNumber:true, showTop:true})
	firstPile.placePile(ctx,{x:400,y:100,scale:10,pileWidth:600},{showAll:false,hideNumber:true,showTop:true})
	tableItems.push(firstPile)
	
	let firstHand=firstPile.deal(6)
	firstHand.placePile(ctx,{x:575,y:600,scale:10,pileWidth:1100},{showAll:true,hideNumber:false, showTop:true})
	tableItems.push(firstHand)
}

function topLayer(){
	return tableItems
}

function makeskipboDeck(){
	secondDeck= new Deck({suit:[...Array(12).keys()], number:[1,2,3,4,5,6,7,8,9,10,11,12,'skipbo']})
	secondDeck.setDfltCardProps(30,(props)=>{
		let color='#000000'
		let slant=false
		if(typeof props.number=='number'){
			if(props.number>8){
				color='#ff0000'
			}else if(props.number<5){
				color='#0000ff'
			}else{color='#00ff00'}
		}else{slant=true}
		let newprops={
			textColor:color,
			text:props.number,
			textSlant:slant
			}
		return newprops
	 })
	secondDeck.dfltCardProps.fontSize=10
	secondPile= new Pile([])
	secondPile.addDeck(secondDeck)
	secondPile.placePile(ctx,{x:500,y:300,scale:2,pileWidth:2900},{showAll:true,hideNumber:false})
}