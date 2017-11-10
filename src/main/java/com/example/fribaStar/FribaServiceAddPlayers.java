package com.example.fribaStar;

import java.util.Vector;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class FribaServiceAddPlayers {
	
	@Autowired
	FribaDAO playerRepository;
	
	public ResponseEntity<Player> addPlayersSubmit(Player newPlayer)
	{
		System.out.println(newPlayer.getName());
		try
		{
			playerRepository.addPlayer(newPlayer);
			return new ResponseEntity<Player>(newPlayer, HttpStatus.OK);
		}
		catch(Exception e)
		{
			return new ResponseEntity<Player>(newPlayer, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	public ResponseEntity<Vector<Player>> getPlayers()
	{		
		return new ResponseEntity<Vector<Player>>(playerRepository.getPlayers(), HttpStatus.OK);
	}
	
	public ResponseEntity<String> resetScores()
	{
		try {
			playerRepository.resetScores();
			return new ResponseEntity<String>("OK", HttpStatus.OK);
		} catch (Exception e)
		{
			return new ResponseEntity<String>("FAIL", HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
}
