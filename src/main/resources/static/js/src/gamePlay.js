//This function is run when the document is ready
const fribaClassAdd = "add";
const fribaClassSubtract = "subtract";
var fribaCurrentHole;
var fribaPlayers;
var fribaPar;

$(function() {
	$('input#nextHole').on("click", onClickNextHole);
	$('input#endGame').on("click", onClickEndGame);
	$('input#parSubtract').on("click", onClickParSubtract);
	$('input#parAdd').on("click", onClickParAdd);
	getPlayerData();		
});

//Fetch player data from backend and create the player table
function getPlayerData()
{	
	$.ajax({
		url: "getPlayers"
		}).then(function(players){
			preparePage(players);
		}
	);
}

function preparePage(players)
{
	fribaPlayers = players;
	updateCurrentHole();
	updatePar();
	getPlayerTable(players);
	setScoreButtonEventListeners(fribaClassAdd, "click");
	setScoreButtonEventListeners(fribaClassSubtract, "click");
}

function getPlayerTable(players)
{
	playerLines = "";
	
	for (i = 0; i < players.length ; i++) 
	{
		playerLines = playerLines + getPlayerLine(players, i);
	}
	$("table").append(playerLines);
}

//Create a line for the player table
function getPlayerLine(players, i)
{
//	<td><input id="subtract' + i + '" type="button" value="-" /></td> \
//	<td><input id="add' + i + '" type="button" value="+" /></td> \
	
	return ' \
	<tr> \
		<td class="name">' + players[i].name + '</td> \
		<td id="total' + i + '" class="total">' + players[i].total + '</td> \
		<td id="totalPar' + i + '" class="totalPar">' + players[i].totalPar + '</td> \
		<td class="hole">' + players[i].holes[fribaCurrentHole-1].score + '</td> \
		<td><input id="' + fribaClassSubtract + i + '" class="' + fribaClassSubtract + '" type="button" value="-" /></td> \
		<td><input id="' + fribaClassAdd + i + '" class="' + fribaClassAdd + '" type="button" value="+" /></td> \
	</tr> \
	';
}

//Add scoreButtonHandler to every button of the given class for the given event
function setScoreButtonEventListeners(buttonClass, eventName)
{
	$("."+buttonClass).on(eventName, onClickScoreButton);
}

function onClickScoreButton(event)
{
	var elem = $(this);
	var index = elem.closest('tr')[0].rowIndex-1;
//	console.log("event: ");
//	console.dir(event);
//	console.log(elem.attr("class"));
//	console.log(elem.attr("value"));
//	console.log(elem.closest('tr')[0].rowIndex); 
	switch(elem.attr("class"))
	{
	case fribaClassSubtract:
		fribaPlayers[index].holes[fribaCurrentHole-1].score--;
//		fribaPlayers[index].total--;
		break;
	case fribaClassAdd:
		fribaPlayers[index].holes[fribaCurrentHole-1].score++;
//		fribaPlayers[index].total++;
		break;	
	}
	
	elem.closest('td').siblings('.hole').html(fribaPlayers[index].holes[fribaCurrentHole-1].score);
//	elem.closest('td').siblings('.total').html(fribaPlayers[index].total);
	
//	console.log(fribaPlayers[index].hole);
//	console.log(fribaPlayers[index].total);
//	console.dir(fribaPlayers);
}

function onClickEndGame()
{
	updatePlayerParScores(fribaPlayers);
	$.ajax({
		method: "POST",
        url: "nextHole",
        headers: { 
        	'Accept': 'application/json',
	       	'Content-Type': 'application/json;charset=UTF-8' 
    	},
        datatype: 'json',
        data: JSON.stringify(fribaPlayers),
	}).then(function(players){
		window.location = "results"
	});
}

function onClickNextHole()
{
	updatePlayerParScores(fribaPlayers);
	$.ajax({
		method: "POST",
        url: "nextHole",
        headers: { 
        	'Accept': 'application/json',
	       	'Content-Type': 'application/json;charset=UTF-8' 
    	},
        datatype: 'json',
        data: JSON.stringify(fribaPlayers),
	}).then(function(players){
		updatePageToNextHole(players);
	});
//	alert('Seuraava reikä');
	
}

function onClickParAdd(event)
{
	var value = $('div#holePar').html();
	
	fribaPar = fribaPar + 1;
	$('div#holePar').html(fribaPar);
}

function onClickParSubtract(event)
{
	var value = $('div#holePar').html();
	
	fribaPar = fribaPar -1;
	$('div#holePar').html(fribaPar);
}

function resetHoleScores()
{
	$('td.hole').html("0");
}

function updateCurrentHole()
{
	fribaCurrentHole = fribaPlayers[0].holes.length;
	$('div.holeName').html("Väylä " + fribaCurrentHole + ".");
}

function updatePageToNextHole(players)
{
	fribaPlayers = players;
	updateCurrentHole();
	updatePar();
	updateTotals();
	resetHoleScores();
}

function updatePar()
{
	fribaPar = 3;
	$('div#holePar').html("3");
}

function updatePlayerParScores(players)
{
	var i;
	
	for(i=0;i<players.length;i++)
	{
		players[i].holes[fribaCurrentHole-1].par = fribaPar;
		players[i].holes[fribaCurrentHole-1].scorePar = 
			players[i].holes[fribaCurrentHole-1].score - fribaPar;
		players[i].total = players[i].total + players[i].holes[fribaCurrentHole-1].score;
		players[i].totalPar = 
			players[i].totalPar + players[i].holes[fribaCurrentHole-1].scorePar;		
	}
}

function updateTotals()
{
	var i;
	for(i=0;i<fribaPlayers.length;i++)
	{
		$('td#total'+i).html(fribaPlayers[i].total);
		$('td#totalPar'+i).html(fribaPlayers[i].totalPar);
	}
}