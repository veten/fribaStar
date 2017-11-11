//Javascript onclick without ajax
//<p><input id="addPlayerButton" type="button" value="Lisää" onclick="addPlayer()"/> <input type="reset" value="Tyhjennä" /></p>

//$(document).ready(function(){});
var i=1;
var players = [];

$(function() {
	loadPlayers();
	$('input#resetPlayers').on('click', resetPlayers);
    $('#addPlayerButton').click(addPlayer);
    $('#startGame').click(startGame);
    $('input#playerName').on("keypress", onKeypressInput)
});

//This function synchronises view with the data available at backend
//The function also resets the player scores to cater for a new round with same players
function loadPlayers()
{
	var j;
	
	$.ajax({
		url: 'getPlayers'
	}).then(function(players){
		if(0 != players.length)
		{
			//Reset player scores
			$.ajax({
				method: 'POST',
				url: 'resetScores'
			});
			
			//Add player texts on screen
			for(j=0;j<players.length;j++)
				//$('body').append('<p>Pelaaja ' + (j+1) + ': ' + players[j].name);
				addPlayerParagraph(players[j].name);
			
			//Update input label
			$('div#player').html('Pelaaja ' + (j+1) + ':');
			i = j+1;
		}
	});
}




function addPlayer() 
{
	var player = document.querySelector('#playerName').value;
//	player = 'seppo';
//	console.log('Pelaaja: ' + player);
	addPlayerParagraph(player);
//	document.body.appendChild(newP);	
	
	players[i-1] = player;
	savePlayer(player);
	
	playerText = document.querySelector('#player');
	playerText.innerHTML = 'Pelaaja ' + i + ':';
}

function addPlayerParagraph(playerName)
{
	var newP = $(document.createElement('p')).addClass('player');
	newP.html('Pelaaja ' + i + ': ' + playerName);
	$('body').append(newP);
	
	//Clear also the name input field
	$('input#playerName').val("").focus();
	
	i = i + 1;
}

function onKeypressInput(event){
	//Trigger playerAdd on enter press and prevent default enter handling
	if(13 == event.which)
	{
		event.preventDefault();
		addPlayer();
	}
		
	
}

function savePlayer(newName){
    $.ajax({
        method: "POST",
        url: "addPlayers",
        headers: { 
        	'Accept': 'application/json',
	       	'Content-Type': 'application/json;charset=UTF-8' 
    	},
        datatype: 'json',
        data: '{"name":"'+newName+'"}',
        success : function(data, textStatus, jqXHR ){
//            if(status) {
				console.log('data: ');
				console.dir(data);
            	console.log('status: ' + textStatus);
            	console.log('xhr: ');
            	console.dir(jqXHR);
                //here you check the response from your controller and add your business logic
//            }
        },
        error : function(a, b, c)
        {
        	console.log('xhr: ' + a);
        	console.dir(a);
        	console.log('virhe: ' + b);
        	console.log('error: ' + c);
        }
    });
}

function resetPlayers()
{
	if(true == confirm('Really remove all the players?'))
	{
		$.ajax({
			method: "POST",
			url: 'resetPlayers'
		}).then(function(){
			//Remove Pelaaja-texts from the view
			$('p.player').remove();
			//Update input label
			i=1;
			$('div#player').html('Pelaaja ' + i + ':');
		})
		
	}
}

function startGame()
{
	var playerCount = 0;
	//If no players added, show error
	$.ajax({
		url: "getPlayers"
	}).then(function(data) {
		playerCount = data.length;
		
		if(0 == playerCount)
			alert('Lisää ny ees yksi pelaaja ensin hei!!');
		else
			window.location = "gamePlay";
	});			
}
