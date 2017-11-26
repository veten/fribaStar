class NavButtons extends React.Component {
    render() {
		return (
			<div>
			<button className="button" onClick={() => alert('reset')}>
	            Poista Pelaajat
	        </button>
	        <button className="button" onClick={() => alert('start')}>
	            Aloita Peli
	        </button>
			</div>
		);
	}
}

class AddPlayerForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {"value" : ''};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({"value" : event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        if('' != this.state.value) {
            this.props.handleSubmit(this.state.value);            
            this.setState({"value" : ''});
        }
    }
    
    render() { 
        const styleInline = {
                display : "inline"
        };
        
        return (
        <form onSubmit={this.handleSubmit}>
            <label>
                Pelaaja <div id="playerNumber" style={styleInline} >
                    {this.props.i}                
                </div>. : 
                <input type="text" value={this.state.value} onChange={this.handleChange} />
            </label>
            <div>
                <input type="submit" value="Uusi Pelaaja" />  
                <input type="reset" value="Tyhjennä Nimi" /> 
            </div>
            </form>
        );    
    }
}

class Player extends React.Component {
    render() {
        return(
                <p>Pelaaja {this.props.index}.: {this.props.value}</p>                
        );
    }
}

class PlayerPane extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {"players" : []};
    }
    
    getPlayerList(players) {
        return players.map((player, index) =>
                <Player key={index.toString()} 
                        index={index+1} 
                        value={player} />
        );
    }
    
    handleSubmit(name) {
        let players = this.state.players.slice();
        players.push(name);
        this.setState({"players" : players});
    }
    
    render() {
        const playerList = this.getPlayerList(this.state.players);        
        return (
          <div>
              <AddPlayerForm handleSubmit={this.handleSubmit.bind(this)}
                  i={this.state.players.length+1}/>
              {playerList}
          </div>          
        );
        
    }
}

class AddPlayers extends React.Component {
	render() {
		return (
		<div>
			<NavButtons />
			<PlayerPane />
		</div>
		);		
	}	
}


ReactDOM.render(
	<AddPlayers />,
    document.getElementById('content')
);


////Javascript onclick without ajax
////<p><input id="addPlayerButton" type="button" value="Lisää" onclick="addPlayer()"/> <input type="reset" value="Tyhjennä" /></p>
//
////$(document).ready(function(){});
//var i=1;
//var players = [];
//
//$(function() {
//	loadPlayers();
//	$('input#resetPlayers').on('click', resetPlayers);
//    $('#addPlayerButton').click(addPlayer);
//    $('#startGame').click(startGame);
//    $('input#playerName').on("keypress", onKeypressInput)
//});
//
////This function synchronises view with the data available at backend
////The function also resets the player scores to cater for a new round with same players
//function loadPlayers()
//{
//	var j;
//	
//	$.ajax({
//		url: 'getPlayers'
//	}).then(function(players){
//		if(0 != players.length)
//		{
//			//Reset player scores
//			$.ajax({
//				method: 'POST',
//				url: 'resetScores'
//			});
//			
//			//Add player texts on screen
//			for(j=0;j<players.length;j++)
//				//$('body').append('<p>Pelaaja ' + (j+1) + ': ' + players[j].name);
//				addPlayerParagraph(players[j].name);
//			
//			//Update input label
//			$('div#player').html('Pelaaja ' + (j+1) + ':');
//			i = j+1;
//		}
//	});
//}
//
//
//
//
//function addPlayer() 
//{
//	var player = document.querySelector('#playerName').value;
////	player = 'seppo';
////	console.log('Pelaaja: ' + player);
//	addPlayerParagraph(player);
////	document.body.appendChild(newP);	
//	
//	players[i-1] = player;
//	savePlayer(player);
//	
//	playerText = document.querySelector('#player');
//	playerText.innerHTML = 'Pelaaja ' + i + ':';
//}
//
//function addPlayerParagraph(playerName)
//{
//	var newP = $(document.createElement('p')).addClass('player');
//	newP.html('Pelaaja ' + i + ': ' + playerName);
//	$('body').append(newP);
//	
//	//Clear also the name input field
//	$('input#playerName').val("").focus();
//	
//	i = i + 1;
//}
//
//function onKeypressInput(event){
//	//Trigger playerAdd on enter press and prevent default enter handling
//	if(13 == event.which)
//	{
//		event.preventDefault();
//		addPlayer();
//	}
//		
//	
//}
//
//function savePlayer(newName){
//    $.ajax({
//        method: "POST",
//        url: "addPlayers",
//        headers: { 
//        	'Accept': 'application/json',
//	       	'Content-Type': 'application/json;charset=UTF-8' 
//    	},
//        datatype: 'json',
//        data: '{"name":"'+newName+'"}',
//        success : function(data, textStatus, jqXHR ){
////            if(status) {
//				console.log('data: ');
//				console.dir(data);
//            	console.log('status: ' + textStatus);
//            	console.log('xhr: ');
//            	console.dir(jqXHR);
//                //here you check the response from your controller and add your business logic
////            }
//        },
//        error : function(a, b, c)
//        {
//        	console.log('xhr: ' + a);
//        	console.dir(a);
//        	console.log('virhe: ' + b);
//        	console.log('error: ' + c);
//        }
//    });
//}
//
//function resetPlayers()
//{
//	if(true == confirm('Really remove all the players?'))
//	{
//		$.ajax({
//			method: "POST",
//			url: 'resetPlayers'
//		}).then(function(){
//			//Remove Pelaaja-texts from the view
//			$('p.player').remove();
//			//Update input label
//			i=1;
//			$('div#player').html('Pelaaja ' + i + ':');
//		})
//		
//	}
//}
//
//function startGame()
//{
//	var playerCount = 0;
//	//If no players added, show error
//	$.ajax({
//		url: "getPlayers"
//	}).then(function(data) {
//		playerCount = data.length;
//		
//		if(0 == playerCount)
//			alert('Lisää ny ees yksi pelaaja ensin hei!!');
//		else
//			window.location = "gamePlay";
//	});			
//}
