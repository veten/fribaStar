package com.example.fribaStar;

import java.util.Vector;

import org.springframework.stereotype.Repository;

@Repository
public class FribaDAO {

	Vector<Player> players = new Vector<Player>(0,4);
	
	public void addPlayer(Player newPlayer) throws Exception
	{
		newPlayer.setTotal(0);
		newPlayer.setHole(0);
		players.add(newPlayer);
	}
	
	public Vector<Player> getPlayers()
	{
			return players;
	}
	
	public String getResult() {
		return "Service works!!!";
	}

	
	
}
