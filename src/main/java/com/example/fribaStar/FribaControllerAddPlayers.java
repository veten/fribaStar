package com.example.fribaStar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
class FribaControllerAddPlayers {

	@Autowired
	FribaServiceAddPlayers service;
	
	@GetMapping("/addPlayers")
	public String addPlayersForm(Model model)
	{
//		model.addAttribute("player", new Player());
		return "addPlayers";
	}
	
	//@RequestMapping(path = "/addPlayers", produces = "application/json", method = RequestMethod.POST, consumes=MediaType.APPLICATION_JSON_VALUE)
	@RequestMapping(path = "/addPlayers", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<Player> addPlayersSubmit(@RequestBody Player newPlayer) throws Exception
	{	
		return service.addPlayersSubmit(newPlayer);
	}
	
}
