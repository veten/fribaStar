//This function is run when the document is ready
const fribaClassAdd = "add";
const fribaClassSubtract = "subtract";
var fribaCurrentHole;
var fribaPlayers;

$(function() {
	$('input#nextHole').on("click", onClickNextHole);
	$('input#endGame').on("click", onClickEndGame)
	getPlayerData();		
});

//Fetch player data from backend and create the player table
function getPlayerData()
{	
	$.ajax({
		url: "/getPlayers"
		}).then(function(players){
			preparePage(players);
		}
	);
}

function preparePage(players)
{
	fribaPlayers = players;
	updateCurrentHole();
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
		<td class="total">' + players[i].total + '</td> \
		<td class="hole">' + players[i].holes[fribaCurrentHole-1] + '</td> \
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
		fribaPlayers[index].holes[fribaCurrentHole-1]--;
		fribaPlayers[index].total--;
		break;
	case fribaClassAdd:
		fribaPlayers[index].holes[fribaCurrentHole-1]++;
		fribaPlayers[index].total++;
		break;	
	}
	
	elem.closest('td').siblings('.hole').html(fribaPlayers[index].holes[fribaCurrentHole-1]);
	elem.closest('td').siblings('.total').html(fribaPlayers[index].total);
	
//	console.log(fribaPlayers[index].hole);
//	console.log(fribaPlayers[index].total);
//	console.dir(fribaPlayers);
}

function onClickEndGame()
{
	$.ajax({
		method: "POST",
        url: "/nextHole",
        headers: { 
        	'Accept': 'application/json',
	       	'Content-Type': 'application/json;charset=UTF-8' 
    	},
        datatype: 'json',
        data: JSON.stringify(fribaPlayers),
	}).then(function(players){
		window.location = "/results"
	});
}

function onClickNextHole()
{
	$.ajax({
		method: "POST",
        url: "/nextHole",
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

function resetHoleScores()
{
	$('td.hole').html("0");
}

function updateCurrentHole()
{
	fribaCurrentHole = fribaPlayers[0].holes.length;
	$('th.hole').html("Väylä " + fribaCurrentHole + ".");
}

function updatePageToNextHole(players)
{
	fribaPlayers = players;
	updateCurrentHole();
	resetHoleScores();
}
