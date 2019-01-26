package com.example.fribaStar;

import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@CrossOrigin
@Controller
public class FribaControllerGamePlay {

	@Autowired
	FribaServiceGamePlay service;
	
	@RequestMapping(path = "/{url:nextHole$}", method = RequestMethod.POST)
	public @ResponseBody ResponseEntity<Vector<Player>> nextHole(@RequestBody Vector<Player> players) throws Exception
	{	
		return service.nextHole(players);
	}
}
