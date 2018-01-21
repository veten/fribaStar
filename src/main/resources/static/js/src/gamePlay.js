
class PlayerRow extends React.Component {   
    render() {
        return(
          <tr>
              <td>{this.props.player.name}</td>
              <td>{this.props.player.totalPar}</td>
              <td>{this.props.player.holes[this.props.hole-1].scorePar}</td>
              <td><input type="button" onClick={() => this.props.handleDec()}value="-" /></td>
              <td><input type="button" onClick={() => this.props.handleInc()} value="+" /></td>
          </tr>
        );
    }
}

class GamePlayScores extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {"playerRows" : this.getPlayerRows(this.props.players)};
    }

    //We need to redraw the table rows whenever the player data changes
    componentWillReceiveProps(nextProps)
    {
        this.setState({"playerRows" : this.getPlayerRows(this.props.players)});
    }
    
    getPlayerRows(players) {
        var playerRow = players.map( (player, index) => { 
                            return <PlayerRow key={index.toString()}
                                              index={index+1}
                                              player={player}
                                              hole={this.props.hole}
                                              handleInc={() => this.props.handleScoreChange(index, 1)}
                                              handleDec={() => this.props.handleScoreChange(index, -1)}/> }, this ); 
        return playerRow;
    }
    
    render() {
        return(
                
                <table>
                    <thead>
                        <tr>
                            <th className="name">Pelaaja</th>
                            <th className="total">Yht.</th>
                            <th className="hole">Tulos</th>             
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.playerRows}
                    </tbody>
                </table>                
        );                 
    }
}

class GamePlay extends React.Component {
    
    constructor (props) {
        super(props);
        this.state = {"hole" : 1,
                      "par" : 3,
                      "players" : []};
        
        this.handleEndGame = this.handleEndGame.bind(this);
        this.handleNextHole = this.handleNextHole.bind(this);
        this.handleParDec = this.handleParDec.bind(this);
        this.handleParInc = this.handleParInc.bind(this);
    }
        
    componentWillMount() {
        let players;
        
        fetch("getPlayers")
        .then(
            (response) => {
                return response.json();
            }).then((json) => {
                players = json;
                for(let i=0; i<players.length; i++)
                    players[i].holes[0].par = this.state.par;
                this.setState({
                    "hole" : players[0].holes.length,
                    "players" : players
                });
                this.forceUpdate();
                }                
            )
    }
        
    
    handleEndGame(event) {
//        if(true == confirm("Tallennetaanko myös tämän väylän tulos?"))
        
            fetch("nextHole", {
                method: "POST",
                headers: { 
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8' 
                },
                body: JSON.stringify(this.state.players) 
            }).then(
                    (response) => {
                        ReactDOM.render(<Results />,
                                document.getElementById('content'));
                    },
                    (error) => {
                        //TODO
                    }
            )
//        else
//            ReactDOM.render(<Results />,
//                         document.getElementById('content'));
    }
    
    handleNextHole(event) {
//        alert("seuraava väylä");
        
        let players = this.state.players.slice(0);
        fetch("nextHole", {
            method: "POST",
            headers: { 
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8' 
            },
            body: JSON.stringify(this.state.players) 
        }).then(
                (response) => {
                    this.playersAddHole(players);
                    this.setState({
                       "hole": players[0].holes.length,
                       "par": 3,
                       "players": players
                    });
                    this.forceUpdate();
                },
                (error) => {
                    //TODO
                }
        )
    }
    
    handleParDec(event) {
        if(1 < this.state.par) {
            let newPar = this.state.par-1;
            this.setState({"par": newPar});
            this.playersSetPar(newPar);
        }
    }
    
    handleParInc(event) {
        let newPar = this.state.par+1;
        
        this.setState({"par": newPar});
        this.playersSetPar(newPar);
    }
    
    handleScoreChange(i,val) {
        let players = this.state.players.slice(0);
        if(0 < val) {
            players[i].holes[this.state.hole-1].scorePar++;
            players[i].totalPar++;
        } else {
            players[i].holes[this.state.hole-1].scorePar--;
            players[i].totalPar--;
        }
        this.setState({"players" : players});
    }
    
    playersAddHole(players) {
        let i;
        
        for(i in players) {
            //let hole = players[i].holes.slice(0,1)[0];
            let hole = Object.create(players[i].holes.slice(0,1)[0]);
            hole.par = 3;
            hole.score = 0;
            hole.scorePar = 0;
            players[i].holes.push(hole);
        }
    }
    
    playersSetPar(par) {
        let players = this.state.players.slice(0);
        let i;
        
        for(i=0;i<players.length;i++)
            players[i].holes[this.state.hole-1].par = par;
        
        this.setState({"players" : players});
    }
    
    render() {
        return(
                <div>
            		<input type="button" onClick={this.handleEndGame} value="Lopeta Peli"/>
                    <input type="button" onClick={this.handleNextHole} value="Seuraava Väylä" />
                    <p>	Väylä {this.state.hole} - PAR: {this.state.par}
            		    <input className="buttonPar" type="button" onClick={this.handleParDec} value="-"/>
            		    <input className="buttonPar" type="button" onClick={this.handleParInc} value="+"/>
            		</p> 
                    <GamePlayScores players={this.state.players} hole={this.state.hole}
                        handleScoreChange={this.handleScoreChange.bind(this)}/>                	
                </div>
        );
    }
}

////This function is run when the document is ready
//const fribaClassAdd = "add";
//const fribaClassSubtract = "subtract";
//var fribaCurrentHole;
//var fribaPlayers;
//var fribaPar;
//
//$(function() {
//	$('input#nextHole').on("click", onClickNextHole);
//	$('input#endGame').on("click", onClickEndGame);
//	$('input#parSubtract').on("click", onClickParSubtract);
//	$('input#parAdd').on("click", onClickParAdd);
//	getPlayerData();		
//});
//
////Fetch player data from backend and create the player table
//function getPlayerData()
//{	
//	$.ajax({
//		url: "getPlayers"
//		}).then(function(players){
//			preparePage(players);
//		}
//	);
//}
//
//function preparePage(players)
//{
//	fribaPlayers = players;
//	updateCurrentHole();
//	updatePar();
//	getPlayerTable(players);
//	setScoreButtonEventListeners(fribaClassAdd, "click");
//	setScoreButtonEventListeners(fribaClassSubtract, "click");
//}
//
//function getPlayerTable(players)
//{
//	playerLines = "";
//	
//	for (i = 0; i < players.length ; i++) 
//	{
//		playerLines = playerLines + getPlayerLine(players, i);
//	}
//	$("table").append(playerLines);
//}
//
////Create a line for the player table
//function getPlayerLine(players, i)
//{
////	<td><input id="subtract' + i + '" type="button" value="-" /></td> \
////	<td><input id="add' + i + '" type="button" value="+" /></td> \
//	
//	return ' \
//	<tr> \
//		<td class="name">' + players[i].name + '</td> \
//		<td id="total' + i + '" class="total">' + players[i].total + '</td> \
//		<td id="totalPar' + i + '" class="totalPar">' + players[i].totalPar + '</td> \
//		<td class="hole">' + players[i].holes[fribaCurrentHole-1].score + '</td> \
//		<td><input id="' + fribaClassSubtract + i + '" class="' + fribaClassSubtract + '" type="button" value="-" /></td> \
//		<td><input id="' + fribaClassAdd + i + '" class="' + fribaClassAdd + '" type="button" value="+" /></td> \
//	</tr> \
//	';
//}
//
////Add scoreButtonHandler to every button of the given class for the given event
//function setScoreButtonEventListeners(buttonClass, eventName)
//{
//	$("."+buttonClass).on(eventName, onClickScoreButton);
//}
//
//function onClickScoreButton(event)
//{
//	var elem = $(this);
//	var index = elem.closest('tr')[0].rowIndex-1;
////	console.log("event: ");
////	console.dir(event);
////	console.log(elem.attr("class"));
////	console.log(elem.attr("value"));
////	console.log(elem.closest('tr')[0].rowIndex); 
//	switch(elem.attr("class"))
//	{
//	case fribaClassSubtract:
//		fribaPlayers[index].holes[fribaCurrentHole-1].score--;
////		fribaPlayers[index].total--;
//		break;
//	case fribaClassAdd:
//		fribaPlayers[index].holes[fribaCurrentHole-1].score++;
////		fribaPlayers[index].total++;
//		break;	
//	}
//	
//	elem.closest('td').siblings('.hole').html(fribaPlayers[index].holes[fribaCurrentHole-1].score);
////	elem.closest('td').siblings('.total').html(fribaPlayers[index].total);
//	
////	console.log(fribaPlayers[index].hole);
////	console.log(fribaPlayers[index].total);
////	console.dir(fribaPlayers);
//}
//
//function onClickEndGame()
//{
//	updatePlayerParScores(fribaPlayers);
//	$.ajax({
//		method: "POST",
//        url: "nextHole",
//        headers: { 
//        	'Accept': 'application/json',
//	       	'Content-Type': 'application/json;charset=UTF-8' 
//    	},
//        datatype: 'json',
//        data: JSON.stringify(fribaPlayers),
//	}).then(function(players){
//		window.location = "results"
//	});
//}
//
//function onClickNextHole()
//{
//	updatePlayerParScores(fribaPlayers);
//	$.ajax({
//		method: "POST",
//        url: "nextHole",
//        headers: { 
//        	'Accept': 'application/json',
//	       	'Content-Type': 'application/json;charset=UTF-8' 
//    	},
//        datatype: 'json',
//        data: JSON.stringify(fribaPlayers),
//	}).then(function(players){
//		updatePageToNextHole(players);
//	});
////	alert('Seuraava reikä');
//	
//}
//
//function onClickParAdd(event)
//{
//	var value = $('div#holePar').html();
//	
//	fribaPar = fribaPar + 1;
//	$('div#holePar').html(fribaPar);
//}
//
//function onClickParSubtract(event)
//{
//	var value = $('div#holePar').html();
//	
//	fribaPar = fribaPar -1;
//	$('div#holePar').html(fribaPar);
//}
//
//function resetHoleScores()
//{
//	$('td.hole').html("0");
//}
//
//function updateCurrentHole()
//{
//	fribaCurrentHole = fribaPlayers[0].holes.length;
//	$('div.holeName').html("Väylä " + fribaCurrentHole + ".");
//}
//
//function updatePageToNextHole(players)
//{
//	fribaPlayers = players;
//	updateCurrentHole();
//	updatePar();
//	updateTotals();
//	resetHoleScores();
//}
//
//function updatePar()
//{
//	fribaPar = 3;
//	$('div#holePar').html("3");
//}
//
//function updatePlayerParScores(players)
//{
//	var i;
//	
//	for(i=0;i<players.length;i++)
//	{
//		players[i].holes[fribaCurrentHole-1].par = fribaPar;
//		players[i].holes[fribaCurrentHole-1].scorePar = 
//			players[i].holes[fribaCurrentHole-1].score - fribaPar;
//		players[i].total = players[i].total + players[i].holes[fribaCurrentHole-1].score;
//		players[i].totalPar = 
//			players[i].totalPar + players[i].holes[fribaCurrentHole-1].scorePar;		
//	}
//}
//
//function updateTotals()
//{
//	var i;
//	for(i=0;i<fribaPlayers.length;i++)
//	{
//		$('td#total'+i).html(fribaPlayers[i].total);
//		$('td#totalPar'+i).html(fribaPlayers[i].totalPar);
//	}
//}