$(function() {	
	//Create the player table
	$.ajax({
		url: "/getPlayers"	
	}).then(function(players) {
		playerLines = "";
		
		for (i = 0; i < players.length ; i++) 
		{
			playerLines = playerLines + getPlayerLine(players, i);
		}
		$("table").append(playerLines);
	});
	
	
});

function getPlayerLine(players, i)
{
	return ' \
	<tr> \
		<td id="name' + i +'">' + players[i].name + '</td> \
		<td id="total' + i +'">' + players[i].total + '</td> \
		<td id="hole' + i +'">' + players[i].hole + '</td> \
		<td><input id="subtract' + i + '" type="button" value="-" /></td> \
		<td><input id="add' + i + '" type="button" value="+" /></td> \
	</tr> \
	';
}