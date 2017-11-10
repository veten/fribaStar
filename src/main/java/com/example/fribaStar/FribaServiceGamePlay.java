package com.example.fribaStar;

import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.ResponseBody;

@Service
public class FribaServiceGamePlay {
	
	@Autowired
	FribaDAO playerRepository;
	
	protected @ResponseBody ResponseEntity<Vector<Player>> nextHole(Vector<Player> players)
	{
		try
		{
			playerRepository.setHoles(players);
			playerRepository.addHoles();
			playerRepository.setTotal(players);
			
			return new ResponseEntity<Vector<Player>>(playerRepository.getPlayers(), HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<Vector<Player>>(players, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
}
