package com.example.fribaStar;

import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin
@Controller
class FribaControllerAddPlayers {

	@Autowired
	FribaServiceAddPlayers service;
	
	@GetMapping("/")
	public String addPlayersForm()
	{
//		model.addAttribute("player", new Player());
		return "addPlayers";
	}
	
	//@RequestMapping(path = "/addPlayers", produces = "application/json", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping(path = "/{url:addPlayers$}", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<Player> addPlayersSubmit(@RequestBody Player newPlayer) throws Exception
	{	
		return service.addPlayersSubmit(newPlayer);
	}
	
	//The regexp definition catches only url ending to "gameplay".
	//This allows catching gamePlay.js with another resource handler.
	@GetMapping("/{url:gamePlay$}")
	public String gamePlay()
	{
		return "gamePlay";
	}
	
	@RequestMapping(path = "/getPlayers", method = RequestMethod.GET)
	public @ResponseBody ResponseEntity<Vector<Player>> getPlayers()	
	{
		return service.getPlayers();
	}
	
	@RequestMapping(path = "/resetPlayers", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> resetPlayers()	
	{
		return service.resetPlayers();
	}
	
	@RequestMapping(path = "/resetScores", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<String> resetScores()	
	{
		return service.resetScores();
	}
}
