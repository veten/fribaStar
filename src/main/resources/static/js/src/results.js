class HoleResultsHeaderRow extends React.Component {
    render() {
        return(
                <th className="text-center">
                    Väylä {this.props.index} <br />
                    Par {this.props.hole.par}
                </th>
        );
    }
}

class ResultRow extends React.Component {
    render() {
        return (
          <tr>
              <td>{(this.props.index+1).toString()}.</td>
              <td>{this.props.player.name}</td>
              <td className="text-center">{this.props.player.totalPar}</td>
          </tr>
        );
    }
}

class HoleRow extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {"playerData" : this.getPlayerData(this.props.players, this.props.index)}
    }
    
    getPlayerData(players, holeIndex) {
        let playerData=[];
        let data;
        
        for(let i=0; i<players[this.props.index].holes.length; i++) {
            data = <td className="text-center" key={(i).toString()}>{this.props.players[this.props.index].holes[i].scorePar}</td>
            playerData.push(data);
        }
        
        return playerData;
            
    }
    
    render() {
        return(
                <tr>
                    <td>{this.props.players[this.props.index].name}</td>
                    {this.state.playerData}
                </tr>
        );
    }
}

class HoleResults extends React.Component {
    
    constructor(props) {
        console.log('holeresults constructor');
        super(props);
        this.state = {"holeResults" : this.getHoleResults(this.props.players)};
    }
    
    getHoleResults(players) {
        console.log('getHoleresuls');
        let holeResults = [];
        let holeResultRow;
        for(let i=0; i< players.length ;i++) {
//            console.dir(players[0].holes[i]);
            holeResultRow = <HoleRow key={i} index={i} players={players} />;
            console.log('row: ' + holeResultRow);
            console.dir(holeResultRow);
            holeResults.push(holeResultRow);
        }            
            
        return holeResults;        
    }    
    
    render() {  
        console.log('holeresults render');
        return(this.state.holeResults);
    }
}

class Results extends React.Component {
    
    constructor(props){
        super(props);
        this.state = { "holeResults" : [],
                       "holeResultsHeader" : [],
                       "resultsList" : [],
                       "sortedPlayers" : [],};        
    }
    
    componentWillMount() {
        let players;
        let sortedPlayers;
        
        fetch("getPlayers")
        .then(
            (response) => {
                return response.json();
            }).then((json) => {
                players = json;
                sortedPlayers = this.getSortedPlayers(players);
                this.setState({"resultsList" : this.getResultsList(sortedPlayers),
                               "holeResultsHeader" : this.getHoleResultsHeader(players),
                               "holeResults" : this.getHoleResults(players)});
                this.forceUpdate();
                }                
            )
    }
    
    getSortedPlayers(players) {
        let sortedPlayers = players.slice(0);
        
        return (sortedPlayers.sort(function(a,b){return a.totalPar - b.totalPar}));
    }
    
    getHoleResultsHeader(players) {
        console.log('hole results header');
        let holeResultsHeader = players[0].holes.map((hole,index) => {
                            return <HoleResultsHeaderRow key={index.toString()}
                                                  index={(index+1).toString()}
                                                  hole={hole} />
                         });        
        return(holeResultsHeader);
    }
    
    getHoleResults(players) {
        console.log('hole results');
        console.dir(players);
        return(<HoleResults players={players} />);
    }
    
    getResultsList(players) {
        let resultRows = players.map((player, index) => {
                            return <ResultRow key={index.toString()}
                                              index={index}
                                              player={player}/>
                         });
        return (resultRows);
    }
    
	render() {
		return(
		        <div>
    		        <h1>Tulokset</h1>
    		        <table className="table table-striped">
    		            <thead>
    		                <tr className="info">
    		                    <th>Sijoitus</th>
    		                    <th>Nimi</th>
    		                    <th className="text-center">Tulos</th>
    		                </tr>
    		            </thead>
    		            <tbody>
    		                {this.state.resultsList}
                        </tbody>
    		        </table>
    		        <h1 style={{marginTop : '25px'}}>Väylätulokset </h1>
    		        <table className="table table-striped">
                    <thead>
                        <tr className="info">
                            <th>Nimi</th>
                            {this.state.holeResultsHeader}
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.holeResults}
                    </tbody>
                </table>
                </div>
		);
	}
}





//$(function(){
//	initialisePage()
//	$('input#startGame').on("click",onClickStartGame);
//})
//
//function initialisePage()
//{
//	$.ajax({
//		url:'getPlayers'
//	}).then(function(players){
//		processData(players);
//	});
//}
//
//function processData(players)
//{
////	initialiseResultsTableHeader(players);
//	buildResultsTable(players);
//	initialiseHoleResultsTableHeader(players);
//	buildHoleResultsTable(players);
//}
//
////function initialiseResultsTableHeader(players)
////{
////	
////}
//
//function buildResultsTable(players)
//{
//	var i=0;
//	var resultLines;
//	var sortedPlayers = players.slice(0);
//	
//	sortedPlayers.sort(function(a,b){return a.total - b.total});
//	for(i=0;i<sortedPlayers.length;i++)
//		resultLines = resultLines + getResultLine(i, sortedPlayers[i]);
//	$('table.results').append(resultLines);
//}
//
//function getResultLine(i, player)
//{
//	return '<tr> \
//				<td>' + (i+1) + '.</td> \
//				<td>' + player.name + '</td> \
//				<td>' + player.total + '</td> \
//				<td>' + player.totalPar + '</td> \
//			</tr>'				
//}
//
//function initialiseHoleResultsTableHeader(players)
//{
//	var i=0;
//	var headerCells;
//	
//	for(i=0;i<players.length;i++)
//		headerCells = headerCells + getHeaderCell(players[i]);
//	$('table.holeResults thead tr').append(headerCells);
//}
//
//function getHeaderCell(player)
//{
//	return '<th>' + player.name + '</th><th>(Par)</th>'
//}
//
//function buildHoleResultsTable(players)
//{
//	var i=0;
//	var holeResultLines;
//	
//	//Pelin lopetus lisää nolla väylän kaikille loppuun, joka
//	//karsitaan pois tässä loopissa
//	for(i=0;i<players[0].holes.length-1;i++)
//		holeResultLines = holeResultLines + getHoleResultLine(i, players);
//	
//	$('table.holeResults').append(holeResultLines);
//}
//
//function getHoleResultLine(i, players)
//{
//	var j=0;
//	var holeResultLine;
//	
//	//Aloita rivi ja lisää väylänumero
//	holeResultLine = '<tr><td>' + (i+1) + '.</td>';
//	
//	//Lisää väylän par
//	holeResultLine = holeResultLine + '<td>' + players[0].holes[i].par + '</td>';
//	
//	//lisää riville kunkin pelaajaan tulos ja par-tulos
//	for(j=0;j<players.length;j++)
//	{
//		holeResultLine = holeResultLine + '<td>' + players[j].holes[i].score + '</td>';
//		holeResultLine = holeResultLine + '<td>' + players[j].holes[i].scorePar + '</td>';
//	}
//		
//	//Lopeta rivi
//	holeResultLine = holeResultLine + '</tr>'
//	
//	return holeResultLine;
//}
//
//function onClickStartGame()
//{
//	window.location = window.location.href.substr(0, window.location.href.lastIndexOf('/') + 1);
//}