package com.example.fribaStar;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.*;

@RestController
public class FribaController {

	private List<Player> players = new ArrayList<Player>();

	@Autowired
	private FribaService service;

	@CrossOrigin
	@RequestMapping(value = "/test")	// , consumes = "application/json"...
	public String testRest() {	// @RequestBody String input
		return service.getResult();
	}

	@CrossOrigin
	@RequestMapping(value = "/getPlayers")
	public List<Player> getPlayers() {
		Player pl = new Player();
		pl.setName("Vesa");
		Player pl2 = new Player();
		pl2.setName("Sepi");

		players.add(pl);
		players.add(pl2);
		return players;
	}

	@CrossOrigin
	@RequestMapping(value = "/savePlayer")
	public String savePlayer(@RequestBody Player newPlayer) {
		players.add(newPlayer);
		return "ok";
	}


}
