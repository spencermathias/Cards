const comms = require("../template files for games/comunicationModule.js")
serverconfigObject=require('./serverconfig.js')
var io = comms.createServer(serverconfigObject,(gameID)=>{return gameStatus==gameMode.LOBBY});
const app = comms.clientfiles();

//var shared = require('./htmlCoverYourAssets/js/shared.js');
//var deckClass = require('./htmlCoverYourAssets/js/deck.js')

app.use("../template files for games/HTMLdefaultStuff")
app.use("../template files for games/gameObjects")
app.use("./htmlCards")

var showBoard=true
var titleColor="#ff0000"

io.sockets.on('connection',(socket)=>{
	var showBoardMessage = {
        titleColor: titleColor,
        displayTitle: (showBoard === true) ? "none" : "flex",
        displayGame: (showBoard === true) ? "flex" : "none"
    };
    socket.emit("showBoard", showBoardMessage);
})