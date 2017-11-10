$(function(){
	initialisePage()
	$('input#startGame').on("click",onClickStartGame);
})

function initialisePage()
{
	$.ajax({
		url:'getPlayers'
	}).then(function(players){
		processData(players);
	});
}

function processData(players)
{
//	initialiseResultsTableHeader(players);
	buildResultsTable(players);
	initialiseHoleResultsTableHeader(players);
	buildHoleResultsTable(players);
}

//function initialiseResultsTableHeader(players)
//{
//	
//}

function buildResultsTable(players)
{
	var i=0;
	var resultLines;
	var sortedPlayers = players.slice(0);
	
	sortedPlayers.sort(function(a,b){return a.total - b.total});
	for(i=0;i<sortedPlayers.length;i++)
		resultLines = resultLines + getResultLine(i, sortedPlayers[i]);
	$('table.results').append(resultLines);
}

function getResultLine(i, player)
{
	return '<tr> \
				<td>' + (i+1) + '.</td> \
				<td>' + player.name + '</td> \
				<td>' + player.total + '</td> \
			</tr>'				
}

function initialiseHoleResultsTableHeader(players)
{
	var i=0;
	var headerCells;
	
	for(i=0;i<players.length;i++)
		headerCells = headerCells + getHeaderCell(players[i]);
	$('table.holeResults thead tr').append(headerCells);
}

function getHeaderCell(player)
{
	return '<th>' + player.name + '</th>'
}

function buildHoleResultsTable(players)
{
	var i=0;
	var holeResultLines;
	
	//Pelin lopetus lisää nolla väylän kaikille loppuun, joka
	//karsitaan pois tässä loopissa
	for(i=0;i<players[0].holes.length-1;i++)
		holeResultLines = holeResultLines + getHoleResultLine(i, players);
	
	$('table.holeResults').append(holeResultLines);
}

function getHoleResultLine(i, players)
{
	var j=0;
	var holeResultLine;
	
	//Aloita rivi ja lisää väylänumero
	holeResultLine = '<tr><td>' + (i+1) + '.</td>'
	
	//lisää riville kunkin pelaajaan tulos
	for(j=0;j<players.length;j++)
		holeResultLine = holeResultLine + '<td>' + players[j].holes[i] + '</td>'
		
	//Lopeta rivi
	holeResultLine = holeResultLine + '</tr>'
	
	return holeResultLine;
}

function onClickStartGame()
{
	window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1);
}